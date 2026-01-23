# Emily Dickinson Poem Generator - Instructor Guide

## 🎓 Overview

You now have a **student-ready version** of the Emily Dickinson Poem Generator that you can configure with your API key. Once configured, students can use it immediately with **zero setup** - just open and go!

## ⚡ FIRST: Add Your API Key (Required)

Before sharing with students, you need to add your Claude API key to the file:

### Step 1: Open the File
1. Open `dickinson-poem-generator-student.html` in a text editor (Notepad, TextEdit, VS Code, etc.)
2. **DO NOT** open in a web browser yet - use a text editor

### Step 2: Find the API Key Line
- Look for line ~450 (near the top of the `<script>` section)
- You'll see: `const API_KEY = 'YOUR-API-KEY-HERE';`

### Step 3: Replace the Placeholder
- Replace `YOUR-API-KEY-HERE` with your actual API key
- Keep the quotes around it
- Should look like: `const API_KEY = 'sk-ant-api03-...your-actual-key...';`

### Step 4: Save the File
- Save and close the file
- Now it's ready to share with students!

**Where to Get Your API Key:**
- Go to [console.anthropic.com](https://console.anthropic.com/)
- Sign up or sign in
- Click "Get API Keys" → "Create Key"
- Copy the key (starts with `sk-ant-api03-...`)
- Paste it into the HTML file as described above

⚠️ **SECURITY NOTE:** Never commit API keys to Git repositories or share them publicly. Keep the configured HTML file private and only share with your enrolled students.

## 📁 Files Created

### For Students (Easy Mode):
**`dickinson-poem-generator-student.html`**
- Your API key is embedded
- No setup required
- Students just open and use
- Perfect for D2L embedding or sharing

### For Advanced Users (Optional):
**`dickinson-poem-generator.html`**
- Requires students to get their own API key
- Good if you want students to manage their own usage
- More complex setup

## 🚀 How to Share with Students

### Option 1: Direct File Share (Easiest)
1. Download `dickinson-poem-generator-student.html` from your repository
2. Upload to D2L as a file
3. Students download and open in their browser
4. That's it!

### Option 2: Host on Web Server
1. Upload `dickinson-poem-generator-student.html` to your web hosting
2. Share the URL with students
3. They can access it directly online
4. Can also embed as iframe in D2L

### Option 3: D2L Content HTML
1. In D2L, create a new Content item
2. Click "HTML" mode
3. Copy/paste the entire HTML file content
4. Students access it directly within D2L

## 🔒 Security Considerations

### Security Best Practices

**Your embedded key means:**
- ✅ Students don't need to create accounts
- ✅ You control all API usage
- ✅ Much simpler for students
- ⚠️ Anyone with the file can use your API key
- ⚠️ All API costs come from your account

**To protect yourself:**
1. **Monitor usage** at console.anthropic.com
2. **Set spending limits** in your Anthropic account settings
3. **Only share with enrolled students** (don't post publicly)
4. **Regenerate the key** after the semester if needed
5. **Keep the original (non-student) version** as backup

## 💰 Cost Management

### Expected Costs
- Each poem generation: ~$0.02-0.05
- 30 students × 10 poems each = 300 poems
- Total cost: ~$6-15 for entire assignment
- Your free tier ($5) + small overage if needed

### How to Monitor Costs
1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Click "Usage" in the menu
3. See real-time usage and costs
4. Set up spending alerts

### How to Set Spending Limits
1. In Anthropic Console, go to Settings
2. Set monthly spending limit
3. Set up email alerts
4. You'll be notified before exceeding limits

### If You Run Out of Credits
You have a few options:
1. Add $10-20 to your account (should last the whole semester)
2. Have students use the other version with their own API keys
3. Regenerate a new free tier account (new email)

## 📖 Student Instructions

Share this with your students:

---

### For Students: How to Use the Poem Generator

1. **Download the file** from D2L: `dickinson-poem-generator-student.html`
2. **Double-click** the file to open it in your web browser
3. **Write your reflection** in the text box (be specific!)
4. **Click "Generate Personalized Poem"**
5. **Wait 5-10 seconds** for your custom Dickinson-style poem
6. **Save or download** the poem for your assignment

#### For the D2L Assignment:
1. Copy a classmate's reflection from D2L
2. Paste it into the generator
3. Generate a personalized poem responding to their situation
4. Copy the poem into your D2L response
5. Write your analysis of the poem (see assignment for details)

#### Tips:
- The more specific your reflection, the better the poem
- You can generate multiple versions - pick the best one
- Save poems you like using the "Save" button
- Download all your poems at the end for your records

---

## 🎨 Customization Options

### Change the Appearance
Edit the CSS in the `<style>` section to match your course branding:
- Colors (search for hex codes like `#2c1810`)
- Fonts (change `'Georgia', 'Garamond'` to your preferred fonts)
- Layout (adjust padding, margins, widths)

### Change the AI Behavior
Edit the prompt in the `generatePoemWithAI` function (around line 400) to:
- Adjust poem length
- Change stylistic emphasis
- Add specific themes or requirements
- Modify the tone or complexity

### Add Your Own Instructions
Edit the instructions section (around line 300) to:
- Add specific assignment requirements
- Include rubric information
- Link to course readings
- Add your contact info for questions

## 🐛 Troubleshooting

### Students Report "API request failed"
**Possible causes:**
1. **Out of credits** - Check console.anthropic.com
2. **Internet connection** - Students need to be online
3. **Key deactivated** - You may have regenerated the key

**Solutions:**
- Add more credits to your account
- Verify the API key in the HTML file is current
- Have students check their internet connection

### Students Can't Open the File
**Possible causes:**
1. Browser security settings
2. Downloaded as .txt instead of .html
3. Pop-up blocker interfering

**Solutions:**
- Right-click file → "Open with" → Choose browser
- Rename file to ensure it ends with `.html`
- Try a different browser (Chrome, Firefox, Edge, Safari)

### Poems Seem Generic or Not Personalized
**Possible causes:**
1. Student reflections too vague
2. Student not providing enough detail

**Solutions:**
- Encourage more specific reflections
- Show examples of good vs. vague reflections
- Have them include concrete details about their situation

### Poems Taking Too Long to Generate
**Normal behavior:**
- 5-10 seconds is typical
- First generation may take longer
- Depends on internet speed and AI load

**If taking 30+ seconds:**
- May be API server slowdown (temporary)
- Check Anthropic status: status.anthropic.com
- Have students refresh and try again

## 📊 Tracking Student Usage

The tool stores poems locally in each student's browser, so you won't automatically see their work. To collect their poems:

**Option 1: Have Students Submit Downloads**
- Students click "Download All Poems"
- Submit the text file to D2L
- You can review all their generated poems

**Option 2: Copy/Paste into D2L**
- Students copy poems directly into their D2L responses
- You see the poems in context with their analysis

**Option 3: Screenshots**
- Students take screenshots of generated poems
- Include in their assignment submissions

## 🎯 Assignment Integration Tips

### Pre-Assignment
1. Demo the tool in class
2. Show examples of good reflections vs. vague ones
3. Explain what makes a good analysis
4. Discuss Dickinson's style beforehand

### During Assignment
1. Monitor your API usage for unexpected spikes
2. Check in with students about their experience
3. Collect interesting poems to share (with permission)

### Post-Assignment
1. Have students share favorite generated poems
2. Discuss patterns in the AI's responses
3. Analyze how well it captured Dickinson's style
4. Reflect on using AI as a creative tool

## 📚 Academic Integrity

### What This Tool Is For:
✅ Generating creative responses to reflections
✅ Sparking deeper analysis and discussion
✅ Exploring Dickinson's poetic style
✅ Engaging with course themes creatively

### What Students Still Must Do:
✅ Write their own analysis and interpretation
✅ Connect to course readings
✅ Develop their own arguments
✅ Think critically about the advice offered

### Remind Students:
- The poem is a starting point, not the final answer
- They must analyze and interpret the poem themselves
- They need to cite course readings and connect to themes
- Their critical thinking is what matters most

## 🔄 After the Semester

### Clean Up:
1. Deactivate the API key at console.anthropic.com
2. Remove the file from public D2L access
3. Save any interesting student work (with permission)
4. Document lessons learned for next semester

### For Next Semester:
1. Create a new API key
2. Update the HTML file with new key
3. Consider adjustments based on this semester's experience
4. Update assignment instructions if needed

## 💡 Advanced Ideas

### Extension Activities:
1. **Compare to Real Dickinson** - Have students compare AI poems to actual Dickinson poems
2. **Style Analysis** - Identify which Dickinson techniques the AI uses most effectively
3. **Prompt Engineering** - Experiment with different reflection styles to see how AI responds
4. **Cross-Poet Comparison** - Modify the prompt to generate responses in other poets' styles

### Research Opportunities:
1. Study patterns in AI-generated advice
2. Analyze how well AI captures Dickinson's voice
3. Explore gender/cultural assumptions in the AI's responses
4. Document the role of AI tools in literary analysis

## 📞 Support

### For Technical Issues:
- Anthropic API documentation: [docs.anthropic.com](https://docs.anthropic.com/)
- API status: [status.anthropic.com](https://status.anthropic.com/)
- Console: [console.anthropic.com](https://console.anthropic.com/)

### For Pedagogical Questions:
- Consider sharing with your department's teaching & learning center
- Connect with other instructors using AI tools
- Document and share your experiences

## 📝 Quick Reference

**Student File:** `dickinson-poem-generator-student.html`
**Your API Console:** [console.anthropic.com](https://console.anthropic.com/)
**API Key Location in File:** Line 451
**Expected Cost:** ~$6-15 for 30 students
**Poem Generation Time:** 5-10 seconds
**Free Tier Credits:** $5 (100-200 poems)

---

**Questions or Issues?** Check the troubleshooting section above or contact Anthropic support through the console.

**Good luck with your assignment!** This tool should make the "Flip the Script" assignment more engaging and help students connect with Dickinson's timeless wisdom about authenticity and courage.
