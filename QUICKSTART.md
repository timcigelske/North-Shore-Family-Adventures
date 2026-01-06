# Email Widget Quick Start

Get your email request form up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Email (Gmail Example)

1. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

2. Get a Gmail App Password:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled
   - Go to "App passwords"
   - Create a new app password for "Mail"
   - Copy the 16-character password

3. Edit `.env` with your credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
EMAIL_FROM_NAME=North Shore Family Adventures
EMAIL_FROM=your-email@gmail.com
```

## Step 3: Start the Server

```bash
npm start
```

Server runs at `http://localhost:3000`

## Step 4: Test the Widget

Open in your browser:
```
http://localhost:3000/widget-demo.html
```

Try submitting the form with your email address!

## Step 5: Embed on Your Website

Add this code to your article pages:

```html
<!-- Where you want the form to appear -->
<div id="nsfa-email-widget"></div>

<!-- Configure and load the widget -->
<script>
    window.NSFA_API_URL = 'http://localhost:3000/api/send-article-email';
    window.NSFA_ARTICLE_URL = window.location.href;
    window.NSFA_ARTICLE_TITLE = document.title;
</script>
<script src="http://localhost:3000/email-widget.js"></script>
```

For production, replace `localhost:3000` with your actual domain!

## Viewing Your Email List

### Get all subscribers:
```bash
curl http://localhost:3000/api/subscribers
```

### Export to CSV:
```bash
curl http://localhost:3000/api/subscribers/export -o subscribers.csv
```

### View statistics:
```bash
curl http://localhost:3000/api/email-stats
```

## Troubleshooting

### Email not sending?

Test your configuration:
```bash
curl -X POST http://localhost:3000/api/test-email
```

### Widget not appearing?

1. Check browser console for errors (F12)
2. Make sure the container div has the correct ID
3. Verify the script is loading (check Network tab)

### Still having issues?

See the full documentation: [EMAIL_WIDGET_SETUP.md](EMAIL_WIDGET_SETUP.md)

## What's Next?

1. **Customize the design** - Edit colors in `window.NSFA_PRIMARY_COLOR`
2. **Deploy to production** - Use Railway, Heroku, or DigitalOcean
3. **Connect to email marketing** - Export CSV and import to Mailchimp, ConvertKit, etc.
4. **Add analytics** - The widget already tracks Google Analytics events if gtag is available

## Features You Get

✅ Automatic email sending with article links
✅ Email list building (stored in `data/email_subscribers.json`)
✅ Request history and analytics
✅ CSV export for your email marketing platform
✅ Beautiful, responsive widget
✅ Easy customization
✅ No database required (uses JSON files)

---

**Need help?** Check the full setup guide in [EMAIL_WIDGET_SETUP.md](EMAIL_WIDGET_SETUP.md)
