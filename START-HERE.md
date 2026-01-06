# 🚀 Quick Start Guide - No Coding Required!

Welcome! This guide will help you start using the Milwaukee Food Blog Generator in just 2 simple steps.

## ✅ What You Need

- A computer (Mac, Windows, or Linux)
- Node.js installed (if not installed, see below)

---

## 📦 Installing Node.js (One-Time Setup)

If you don't have Node.js installed:

### Windows or Mac:
1. Go to https://nodejs.org/
2. Download the "LTS" version (recommended for most users)
3. Run the installer
4. Follow the installation prompts (use default settings)

### Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Or use your package manager
```

To check if Node.js is installed, open a terminal/command prompt and type:
```bash
node --version
```

You should see a version number like `v18.0.0` or higher.

---

## 🎯 Starting the Application

### Step 1: Open Terminal/Command Prompt

**On Mac:**
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

**On Windows:**
- Press `Windows + R`
- Type "cmd"
- Press Enter

**On Linux:**
- Press `Ctrl + Alt + T`

### Step 2: Navigate to the Project Folder

Type this command (replace the path with your actual project location):

```bash
cd /path/to/North-Shore-Family-Adventures
```

For example:
- Mac/Linux: `cd ~/Downloads/North-Shore-Family-Adventures`
- Windows: `cd C:\Users\YourName\Downloads\North-Shore-Family-Adventures`

### Step 3: Start the Application

Type this command:

```bash
npm start
```

You should see:
```
=================================
🎉 Milwaukee Food Blog Generator
=================================

✅ Server running at http://localhost:3000

📝 Open your browser and go to:
   http://localhost:3000
```

### Step 4: Open Your Browser

1. Open your favorite web browser (Chrome, Firefox, Safari, Edge)
2. Type this in the address bar:
   ```
   http://localhost:3000
   ```
3. Press Enter

**That's it!** You should now see the Milwaukee Food Blog Generator interface!

---

## 🎨 Using the Web Interface

### Adding a Question

1. Fill out the form:
   - **Question**: The food question you want to answer (required)
   - **Category**: Type of cuisine (e.g., Mexican, Italian)
   - **Location**: City or area (e.g., Milwaukee, Waukesha)
   - **Tags**: Keywords separated by commas (e.g., gluten-free, vegan)

2. Click "Add Question" button

3. Your question will appear in the table below!

### Generating a Blog Post

**For one question:**
- Find the question in the table
- Click the "Generate Post" button next to it
- Wait a few seconds
- The blog post will be created in the `blog-posts` folder!

**For all pending questions:**
- Click the "Generate All Pending Blog Posts" button at the top
- Wait for all posts to be generated
- Check the `blog-posts` folder for all your new content!

### Viewing Your Blog Posts

1. Open your file explorer (Finder on Mac, File Explorer on Windows)
2. Navigate to the project folder
3. Open the `blog-posts` folder
4. Your blog posts are saved as `.md` (Markdown) files
5. Open them with any text editor to view and edit!

### Deleting a Question

- Find the question in the table
- Click the "Delete" button
- Confirm when asked

---

## 🛑 Stopping the Application

When you're done:

1. Go back to your terminal/command prompt window
2. Press `Ctrl + C` (works on Mac, Windows, and Linux)
3. The application will stop

---

## 📁 Where Are My Files?

All your data is stored locally on your computer:

- **Questions Database**: `data/questions.json`
- **Generated Blog Posts**: `blog-posts/` folder
- **Web Interface**: `public/index.html`

---

## 💡 Tips for Success

1. **Keep it running**: Don't close the terminal window while using the web interface
2. **Refresh the page**: If something doesn't update, try refreshing your browser
3. **Check the folder**: Generated blog posts appear immediately in the `blog-posts` folder
4. **Edit freely**: Feel free to edit the generated blog posts to add specific restaurant recommendations!

---

## ❓ Troubleshooting

### "Port 3000 already in use"

Someone else is using port 3000. Try:
- Closing other applications
- Or edit `server.js` and change `const PORT = 3000;` to `const PORT = 3001;`

### "Cannot find module"

Make sure you're in the correct folder. Run:
```bash
ls -la
```
(Mac/Linux)

or

```bash
dir
```
(Windows)

You should see `server.js`, `package.json`, etc.

### Browser shows "Cannot connect"

Make sure the server is running. You should see the "Server running" message in your terminal.

---

## 🎉 You're All Set!

Enjoy creating amazing food blog content for Milwaukee!

**Need help?** Check the full README.md for more detailed information.
