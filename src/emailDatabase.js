import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EmailDatabase {
    constructor() {
        this.dataDir = path.join(__dirname, '..', 'data');
        this.emailsFile = path.join(this.dataDir, 'email_subscribers.json');
        this.requestsFile = path.join(this.dataDir, 'email_requests.json');
        this.ensureDataDirectory();
        this.loadData();
    }

    ensureDataDirectory() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }

        // Initialize files if they don't exist
        if (!fs.existsSync(this.emailsFile)) {
            this.saveData(this.emailsFile, []);
        }
        if (!fs.existsSync(this.requestsFile)) {
            this.saveData(this.requestsFile, []);
        }
    }

    loadData() {
        try {
            this.subscribers = JSON.parse(fs.readFileSync(this.emailsFile, 'utf8'));
            this.requests = JSON.parse(fs.readFileSync(this.requestsFile, 'utf8'));
        } catch (error) {
            console.error('Error loading email data:', error);
            this.subscribers = [];
            this.requests = [];
        }
    }

    saveData(file, data) {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }

    /**
     * Add a new subscriber to the email list
     * @param {string} email - Email address
     * @param {string} source - Where they subscribed from (e.g., article URL)
     * @returns {Object} Subscriber object
     */
    addSubscriber(email, source = '') {
        const existingSubscriber = this.subscribers.find(sub => sub.email === email);

        if (existingSubscriber) {
            // Update existing subscriber
            existingSubscriber.lastSeen = new Date().toISOString();
            if (source && !existingSubscriber.sources.includes(source)) {
                existingSubscriber.sources.push(source);
            }
            this.saveData(this.emailsFile, this.subscribers);
            return existingSubscriber;
        }

        // Create new subscriber
        const subscriber = {
            id: this.subscribers.length > 0
                ? Math.max(...this.subscribers.map(s => s.id)) + 1
                : 1,
            email,
            sources: source ? [source] : [],
            subscribedAt: new Date().toISOString(),
            lastSeen: new Date().toISOString(),
            status: 'active'
        };

        this.subscribers.push(subscriber);
        this.saveData(this.emailsFile, this.subscribers);
        return subscriber;
    }

    /**
     * Log an email request (for analytics)
     * @param {string} email - Email address
     * @param {string} articleUrl - URL of the article requested
     * @param {string} articleTitle - Title of the article
     * @returns {Object} Request object
     */
    logEmailRequest(email, articleUrl, articleTitle = '') {
        const request = {
            id: this.requests.length > 0
                ? Math.max(...this.requests.map(r => r.id)) + 1
                : 1,
            email,
            articleUrl,
            articleTitle,
            requestedAt: new Date().toISOString(),
            sent: false
        };

        this.requests.push(request);
        this.saveData(this.requestsFile, this.requests);
        return request;
    }

    /**
     * Mark an email request as sent
     * @param {number} requestId - Request ID
     */
    markRequestAsSent(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
            request.sent = true;
            request.sentAt = new Date().toISOString();
            this.saveData(this.requestsFile, this.requests);
        }
    }

    /**
     * Get all subscribers
     * @returns {Array} List of subscribers
     */
    getAllSubscribers() {
        return this.subscribers;
    }

    /**
     * Get all email requests
     * @returns {Array} List of email requests
     */
    getAllRequests() {
        return this.requests;
    }

    /**
     * Get subscriber by email
     * @param {string} email - Email address
     * @returns {Object|null} Subscriber object or null
     */
    getSubscriberByEmail(email) {
        return this.subscribers.find(sub => sub.email === email) || null;
    }

    /**
     * Export subscribers to CSV format
     * @returns {string} CSV string
     */
    exportSubscribersToCSV() {
        const headers = ['Email', 'Subscribed At', 'Last Seen', 'Sources', 'Status'];
        const rows = this.subscribers.map(sub => [
            sub.email,
            sub.subscribedAt,
            sub.lastSeen,
            sub.sources.join('; '),
            sub.status
        ]);

        return [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
    }

    /**
     * Get statistics
     * @returns {Object} Stats object
     */
    getStats() {
        return {
            totalSubscribers: this.subscribers.length,
            activeSubscribers: this.subscribers.filter(s => s.status === 'active').length,
            totalRequests: this.requests.length,
            sentRequests: this.requests.filter(r => r.sent).length,
            pendingRequests: this.requests.filter(r => !r.sent).length
        };
    }
}
