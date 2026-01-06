import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Simple .env file loader
 * Loads environment variables from .env file if it exists
 */
export function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');

    if (!fs.existsSync(envPath)) {
        // .env file doesn't exist, that's okay
        return;
    }

    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');

        lines.forEach(line => {
            // Skip empty lines and comments
            line = line.trim();
            if (!line || line.startsWith('#')) {
                return;
            }

            // Parse KEY=VALUE
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();

                // Remove quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }

                // Only set if not already defined
                if (process.env[key] === undefined) {
                    process.env[key] = value;
                }
            }
        });

        console.log('✅ Environment variables loaded from .env');
    } catch (error) {
        console.error('⚠️  Error loading .env file:', error.message);
    }
}
