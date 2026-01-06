import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EmailService {
    constructor() {
        this.loadConfig();
        this.transporter = null;
        this.initializeTransporter();
    }

    loadConfig() {
        const configPath = path.join(__dirname, '..', 'config', 'email.config.json');

        if (fs.existsSync(configPath)) {
            this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } else {
            // Default configuration (will use environment variables or defaults)
            this.config = {
                service: process.env.EMAIL_SERVICE || 'gmail',
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.EMAIL_PORT || '587'),
                secure: process.env.EMAIL_SECURE === 'true',
                auth: {
                    user: process.env.EMAIL_USER || '',
                    pass: process.env.EMAIL_PASS || ''
                },
                from: {
                    name: process.env.EMAIL_FROM_NAME || 'North Shore Family Adventures',
                    email: process.env.EMAIL_FROM || ''
                }
            };
        }
    }

    initializeTransporter() {
        // Check if email is configured
        if (!this.config.auth.user || !this.config.auth.pass) {
            console.warn('⚠️  Email service not configured. Set EMAIL_USER and EMAIL_PASS environment variables.');
            return;
        }

        try {
            this.transporter = nodemailer.createTransport({
                service: this.config.service,
                host: this.config.host,
                port: this.config.port,
                secure: this.config.secure,
                auth: {
                    user: this.config.auth.user,
                    pass: this.config.auth.pass
                }
            });

            console.log('✅ Email service initialized');
        } catch (error) {
            console.error('❌ Error initializing email service:', error);
        }
    }

    /**
     * Send article link to a user
     * @param {string} email - Recipient email
     * @param {string} articleUrl - URL of the article
     * @param {string} articleTitle - Title of the article
     * @returns {Promise<Object>} Send result
     */
    async sendArticleEmail(email, articleUrl, articleTitle) {
        if (!this.transporter) {
            return {
                success: false,
                error: 'Email service not configured'
            };
        }

        const emailHtml = this.generateArticleEmailHtml(articleUrl, articleTitle);
        const emailText = this.generateArticleEmailText(articleUrl, articleTitle);

        const mailOptions = {
            from: `"${this.config.from.name}" <${this.config.from.email}>`,
            to: email,
            subject: `Your Article: ${articleTitle}`,
            text: emailText,
            html: emailHtml
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return {
                success: true,
                messageId: info.messageId
            };
        } catch (error) {
            console.error('Error sending email:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Generate HTML email template
     * @param {string} articleUrl - URL of the article
     * @param {string} articleTitle - Title of the article
     * @returns {string} HTML email
     */
    generateArticleEmailHtml(articleUrl, articleTitle) {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Here's Your Article!</h1>
    </div>

    <div class="content">
        <h2>${articleTitle}</h2>
        <p>Thanks for your interest! Here's the article you requested:</p>

        <center>
            <a href="${articleUrl}" class="button">Read the Article</a>
        </center>

        <p>Or copy and paste this link into your browser:</p>
        <p style="background: white; padding: 10px; border-radius: 5px; word-break: break-all;">
            ${articleUrl}
        </p>
    </div>

    <div class="footer">
        <p>You're receiving this email because you requested this article from North Shore Family Adventures.</p>
        <p>We've added you to our email list to keep you updated with more great content about family adventures, events, and activities in the Milwaukee area!</p>
        <p style="margin-top: 20px;">
            <strong>North Shore Family Adventures</strong><br>
            Your guide to family fun in Milwaukee
        </p>
    </div>
</body>
</html>
        `.trim();
    }

    /**
     * Generate plain text email
     * @param {string} articleUrl - URL of the article
     * @param {string} articleTitle - Title of the article
     * @returns {string} Plain text email
     */
    generateArticleEmailText(articleUrl, articleTitle) {
        return `
Here's Your Article!

${articleTitle}

Thanks for your interest! Here's the article you requested:

${articleUrl}

You're receiving this email because you requested this article from North Shore Family Adventures.

We've added you to our email list to keep you updated with more great content about family adventures, events, and activities in the Milwaukee area!

---
North Shore Family Adventures
Your guide to family fun in Milwaukee
        `.trim();
    }

    /**
     * Test email configuration
     * @returns {Promise<Object>} Test result
     */
    async testConnection() {
        if (!this.transporter) {
            return {
                success: false,
                error: 'Email service not configured'
            };
        }

        try {
            await this.transporter.verify();
            return {
                success: true,
                message: 'Email service is ready'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}
