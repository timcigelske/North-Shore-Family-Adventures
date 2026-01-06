# Email Request Form Setup Guide

This guide will help you set up the embeddable email request form that allows visitors to receive article links via email while building your email list.

## Table of Contents

1. [Features](#features)
2. [Quick Start](#quick-start)
3. [Email Configuration](#email-configuration)
4. [Embedding the Widget](#embedding-the-widget)
5. [API Endpoints](#api-endpoints)
6. [Managing Your Email List](#managing-your-email-list)
7. [Troubleshooting](#troubleshooting)

## Features

- ✅ Embeddable form for any article page
- ✅ Automatic email sending with article link
- ✅ Email list building and management
- ✅ Beautiful, responsive design
- ✅ Easy customization
- ✅ Analytics tracking (request logs)
- ✅ CSV export for email subscribers

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install `nodemailer` which is required for sending emails.

### 2. Configure Email Settings

Choose one of the following methods:

#### Option A: Using Environment Variables (Recommended)

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your email credentials:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM_NAME=North Shore Family Adventures
EMAIL_FROM=your-email@gmail.com
```

#### Option B: Using Configuration File

1. Copy the example config file:
```bash
cp config/email.config.example.json config/email.config.json
```

2. Edit `config/email.config.json` with your settings.

### 3. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### 4. Test the Widget

Open the demo page in your browser:
```
http://localhost:3000/widget-demo.html
```

## Email Configuration

### Using Gmail

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Scroll to "App passwords"
   - Generate a new app password for "Mail"
3. Use the app password in your `.env` file:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=North Shore Family Adventures
```

### Using Other Email Providers

#### SendGrid

```env
EMAIL_SERVICE=SendGrid
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=your-verified-sender@yourdomain.com
EMAIL_FROM_NAME=North Shore Family Adventures
```

#### Mailgun

```env
EMAIL_SERVICE=Mailgun
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-smtp-username
EMAIL_PASS=your-mailgun-smtp-password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=North Shore Family Adventures
```

#### Outlook/Office 365

```env
EMAIL_SERVICE=Outlook365
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_FROM=your-email@outlook.com
EMAIL_FROM_NAME=North Shore Family Adventures
```

### Testing Email Configuration

Use the test endpoint to verify your email settings:

```bash
curl -X POST http://localhost:3000/api/test-email
```

## Embedding the Widget

### Basic Embedding

Add these two elements to your HTML where you want the form to appear:

```html
<!-- 1. Add the widget container -->
<div id="nsfa-email-widget"></div>

<!-- 2. Add the widget script -->
<script>
    // Configure the widget
    window.NSFA_API_URL = 'https://yourdomain.com/api/send-article-email';
    window.NSFA_ARTICLE_URL = window.location.href;
    window.NSFA_ARTICLE_TITLE = document.title;
</script>
<script src="https://yourdomain.com/email-widget.js"></script>
```

### Configuration Options

You can customize the widget with these JavaScript variables:

```javascript
// API endpoint (required)
window.NSFA_API_URL = 'https://yourdomain.com/api/send-article-email';

// Article URL (defaults to current page)
window.NSFA_ARTICLE_URL = 'https://www.northshorefamilyadventures.com/your-article';

// Article title (defaults to page title)
window.NSFA_ARTICLE_TITLE = 'Your Article Title';

// Container ID (defaults to 'nsfa-email-widget')
window.NSFA_CONTAINER_ID = 'nsfa-email-widget';

// Theme colors
window.NSFA_PRIMARY_COLOR = '#667eea';
window.NSFA_SECONDARY_COLOR = '#764ba2';
```

### WordPress Integration

For WordPress, add this to your theme's template file (e.g., `single.php`):

```php
<div id="nsfa-email-widget"></div>

<script>
    window.NSFA_API_URL = 'https://yourdomain.com/api/send-article-email';
    window.NSFA_ARTICLE_URL = '<?php echo get_permalink(); ?>';
    window.NSFA_ARTICLE_TITLE = '<?php echo get_the_title(); ?>';
</script>
<script src="https://yourdomain.com/email-widget.js"></script>
```

### Static Site Integration

For static sites like those on GitHub Pages or Netlify, you'll need to:

1. Host the Node.js server separately (e.g., on Heroku, DigitalOcean, or Railway)
2. Update the `NSFA_API_URL` to point to your hosted server
3. Enable CORS in the server (already configured)

## API Endpoints

### POST /api/send-article-email

Send an article link via email and add subscriber to list.

**Request:**
```json
{
  "email": "user@example.com",
  "articleUrl": "https://yourdomain.com/article",
  "articleTitle": "Article Title"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "<email-id>"
}
```

### GET /api/subscribers

Get all email subscribers.

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "sources": ["https://yourdomain.com/article1"],
    "subscribedAt": "2026-01-06T12:00:00.000Z",
    "lastSeen": "2026-01-06T12:00:00.000Z",
    "status": "active"
  }
]
```

### GET /api/email-stats

Get email statistics.

**Response:**
```json
{
  "totalSubscribers": 150,
  "activeSubscribers": 148,
  "totalRequests": 200,
  "sentRequests": 195,
  "pendingRequests": 5
}
```

### GET /api/subscribers/export

Export subscribers as CSV file.

Downloads a CSV file with all subscriber data.

### POST /api/test-email

Test email configuration.

**Response:**
```json
{
  "success": true,
  "message": "Email service is ready"
}
```

## Managing Your Email List

### Viewing Subscribers

Access subscriber data via the API:

```bash
curl http://localhost:3000/api/subscribers
```

### Exporting to CSV

Download your email list:

```bash
curl http://localhost:3000/api/subscribers/export -o subscribers.csv
```

### Data Storage

Email data is stored in JSON files:
- `data/email_subscribers.json` - All subscribers
- `data/email_requests.json` - Request history/analytics

### Importing to Email Marketing Platforms

Use the CSV export to import subscribers into:
- **Mailchimp**: Go to Audience → Import contacts → Upload CSV
- **ConvertKit**: Go to Subscribers → Import → Choose CSV file
- **Constant Contact**: Go to Contacts → Add Contacts → Upload file

## Deployment

### Deploying to Production

1. **Update Widget Configuration**: Change `NSFA_API_URL` to your production domain
2. **Use Environment Variables**: Don't commit `.env` or `email.config.json`
3. **Enable HTTPS**: Use SSL certificates for security
4. **Set up CORS**: Already configured for cross-origin requests

### Hosting Options

#### Railway (Recommended - Easy)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Heroku
```bash
# Create app
heroku create your-app-name

# Set environment variables
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# Deploy
git push heroku main
```

#### DigitalOcean App Platform
1. Connect your GitHub repository
2. Add environment variables in the dashboard
3. Deploy automatically on push

## Troubleshooting

### Email Not Sending

1. **Check email credentials**: Test with `/api/test-email`
2. **Check Gmail settings**: Make sure App Passwords are enabled
3. **Check logs**: Look at server console for error messages
4. **Verify SMTP settings**: Ensure correct host, port, and authentication

### Widget Not Appearing

1. **Check container ID**: Make sure `<div id="nsfa-email-widget"></div>` exists
2. **Check script loading**: Open browser console for JavaScript errors
3. **Check CORS**: Ensure API allows requests from your domain

### CORS Errors

The server is already configured with:
```javascript
'Access-Control-Allow-Origin': '*'
```

For production, you may want to restrict this to your specific domain.

### Data Not Saving

1. **Check file permissions**: Ensure `data/` directory is writable
2. **Check disk space**: Ensure server has available storage
3. **Check logs**: Look for file system errors in console

## Security Considerations

1. **Never commit `.env` or `email.config.json`** - Add them to `.gitignore`
2. **Use App Passwords** - Don't use your main email password
3. **Enable HTTPS in production** - Protect user email addresses
4. **Rate limiting** - Consider adding rate limiting to prevent abuse
5. **Email validation** - Already implemented in the API
6. **Sanitize inputs** - Already implemented to prevent XSS

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review server logs for error messages
- Test individual components (email service, API endpoints)

## License

MIT
