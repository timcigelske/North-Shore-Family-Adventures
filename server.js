import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { QuestionDatabase } from './src/database.js';
import { BlogPostGenerator } from './src/blogGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const db = new QuestionDatabase();
const generator = new BlogPostGenerator();

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

function sendResponse(res, statusCode, data, contentType = 'application/json') {
    res.writeHead(statusCode, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
    });

    if (contentType === 'application/json') {
        res.end(JSON.stringify(data));
    } else {
        res.end(data);
    }
}

function serveStaticFile(res, filePath) {
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                sendResponse(res, 404, { error: 'File not found' });
            } else {
                sendResponse(res, 500, { error: 'Server error' });
            }
        } else {
            sendResponse(res, 200, content, contentType);
        }
    });
}

async function handleRequest(req, res) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;
    const method = req.method;

    console.log(`${method} ${pathname}`);

    // CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Serve index.html for root
    if (pathname === '/' || pathname === '/index.html') {
        serveStaticFile(res, path.join(__dirname, 'public', 'index.html'));
        return;
    }

    // API Routes
    if (pathname.startsWith('/api/')) {
        try {
            // GET all questions
            if (pathname === '/api/questions' && method === 'GET') {
                const questions = db.getAllQuestions();
                sendResponse(res, 200, questions);
                return;
            }

            // POST new question
            if (pathname === '/api/questions' && method === 'POST') {
                const body = await parseBody(req);
                const { question, category, location, tags } = body;

                if (!question) {
                    sendResponse(res, 400, { error: 'Question is required' });
                    return;
                }

                const newQuestion = db.addQuestion(
                    question,
                    category || '',
                    location || '',
                    tags || []
                );

                sendResponse(res, 201, newQuestion);
                return;
            }

            // DELETE question
            const deleteMatch = pathname.match(/^\/api\/questions\/(\d+)$/);
            if (deleteMatch && method === 'DELETE') {
                const id = parseInt(deleteMatch[1]);
                const success = db.deleteQuestion(id);

                if (success) {
                    sendResponse(res, 200, { success: true });
                } else {
                    sendResponse(res, 404, { error: 'Question not found' });
                }
                return;
            }

            // POST generate single blog post
            const generateMatch = pathname.match(/^\/api\/generate\/(\d+)$/);
            if (generateMatch && method === 'POST') {
                const id = parseInt(generateMatch[1]);
                const question = db.getQuestionById(id);

                if (!question) {
                    sendResponse(res, 404, { error: 'Question not found' });
                    return;
                }

                const result = generator.generateBlogPost(question);

                if (result.success) {
                    db.markAsGenerated(id);
                    sendResponse(res, 200, result);
                } else {
                    sendResponse(res, 500, { error: result.error });
                }
                return;
            }

            // POST generate all blog posts
            if (pathname === '/api/generate-all' && method === 'POST') {
                const pending = db.getPendingQuestions();
                let count = 0;
                const errors = [];

                for (const question of pending) {
                    const result = generator.generateBlogPost(question);
                    if (result.success) {
                        db.markAsGenerated(question.id);
                        count++;
                    } else {
                        errors.push({ id: question.id, error: result.error });
                    }
                }

                sendResponse(res, 200, {
                    success: true,
                    count,
                    errors: errors.length > 0 ? errors : undefined
                });
                return;
            }

            // API route not found
            sendResponse(res, 404, { error: 'API endpoint not found' });

        } catch (error) {
            console.error('API Error:', error);
            sendResponse(res, 500, { error: 'Internal server error' });
        }
        return;
    }

    // Serve static files from public directory
    const filePath = path.join(__dirname, 'public', pathname);
    serveStaticFile(res, filePath);
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log('\n=================================');
    console.log('🎉 Milwaukee Food Blog Generator');
    console.log('=================================\n');
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log('\n📝 Open your browser and go to:');
    console.log(`   http://localhost:${PORT}\n`);
    console.log('Press Ctrl+C to stop the server\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...\n');
    server.close(() => {
        console.log('✅ Server stopped\n');
        process.exit(0);
    });
});
