# Milwaukee Food Blog Generator

A comprehensive tool for tracking common food-related questions about the Milwaukee area and automatically generating detailed, SEO-optimized blog posts to answer them.

## Overview

This tool helps you:
- Track frequently asked questions about Milwaukee area restaurants and food
- Organize questions by category, location, and tags
- Generate comprehensive, well-structured blog posts automatically
- Maintain a database of answered questions

Perfect for food bloggers, local content creators, and anyone building a Milwaukee food resource!

## Features

- **Question Management**: Add, list, and organize food questions
- **Smart Categorization**: Organize by category (Mexican, Italian, Bakery, etc.) and location
- **Tag Support**: Add custom tags like "gluten-free", "vegan", "family-friendly"
- **Auto-Generated Blog Posts**: Creates comprehensive, SEO-optimized markdown blog posts
- **Batch Processing**: Generate posts for all pending questions at once
- **Status Tracking**: Track which questions have blog posts generated

## Installation

1. Clone this repository
2. No external dependencies required! Uses Node.js built-in modules only.

```bash
git clone <your-repo-url>
cd North-Shore-Family-Adventures
```

## Usage

### Adding Questions

Manually add questions you've discovered from community research, surveys, or conversations:

```bash
npm run add-question
```

You'll be prompted to enter:
- The question
- Category (e.g., Mexican, Italian, Bakery)
- Location (e.g., Milwaukee, Waukesha, Brookfield)
- Tags (comma-separated, e.g., gluten-free, vegan, outdoor-seating)

**Example:**
```
Question: Where's the best Mexican food in Milwaukee?
Category: Mexican
Location: Milwaukee
Tags: authentic, family-friendly
```

### Viewing All Questions

```bash
npm run list-questions
```

This displays all questions with their IDs, categories, locations, and generation status.

### Generating Blog Posts

Generate a blog post for a single question:

```bash
npm run generate-post
```

You'll see a list of pending questions and can select which one to generate.

Or generate blog posts for ALL pending questions at once:

```bash
npm run generate-all
```

### Generated Blog Post Structure

Each blog post includes:
- SEO-optimized frontmatter (title, description, keywords)
- Introduction explaining the question
- Quick answer section
- Top recommendations
- What to look for
- Local favorites
- Dietary accommodations
- Best times to visit
- Price range information
- Location and parking details
- Tips from locals
- Comprehensive conclusion

Blog posts are saved as markdown files in the `blog-posts/` directory with the format:
```
YYYY-MM-DD-question-slug.md
```

## Project Structure

```
North-Shore-Family-Adventures/
├── src/
│   ├── cli.js              # Command-line interface
│   ├── database.js         # Question database management
│   └── blogGenerator.js    # Blog post generation engine
├── data/
│   └── questions.json      # Question database
├── blog-posts/             # Generated blog posts (markdown)
├── package.json
└── README.md
```

## Data Structure

Questions are stored in `data/questions.json` with this structure:

```json
{
  "id": 1,
  "question": "Where's the best Mexican food in Milwaukee?",
  "category": "Mexican",
  "location": "Milwaukee",
  "tags": ["authentic", "family-friendly"],
  "dateAdded": "2026-01-06",
  "status": "pending",
  "blogPostGenerated": false
}
```

## Workflow Example

1. **Research Phase**: Observe food discussions in community forums, local groups, or conduct surveys
2. **Add Questions**: Use `npm run add-question` to add each common question you discover
3. **Review**: Use `npm run list-questions` to see all tracked questions
4. **Generate Content**: Use `npm run generate-all` to create blog posts for all pending questions
5. **Edit & Publish**: Review the generated markdown files in `blog-posts/`, edit as needed, and publish to your blog

## Legitimate Research Methods

Since this tool requires manual input, here are ethical ways to discover common food questions:

### Direct Methods
- **Conduct surveys** in your local community
- **Ask friends and family** what food questions they have
- **Create a submission form** on your website
- **Host focus groups** with food enthusiasts

### Public Research
- **Analyze public forums** like Reddit's r/milwaukee
- **Use Google's autocomplete** to see common searches
- **Review Yelp Q&A sections** on restaurant pages
- **Check "People Also Ask"** in Google search results

### Social Listening (Ethical)
- **Manual observation** of public posts (not automated scraping)
- **Participate authentically** in food discussions
- **Note common questions** you see repeatedly
- **Engage with your community** and track what they ask

## Customization

### Modifying Blog Post Templates

Edit `src/blogGenerator.js` to customize:
- Blog post structure
- Section content
- Writing style
- SEO metadata

### Adding Fields

Modify `src/database.js` to add new fields to questions, such as:
- Difficulty level
- Season/timing
- Budget range
- Target audience

## Tips for Best Results

1. **Be Specific**: Add detailed categories and locations
2. **Use Tags**: Tags help organize and improve SEO
3. **Review Generated Content**: Always edit generated posts to add specific recommendations
4. **Update Regularly**: Keep questions current with food trends
5. **Add Local Knowledge**: Enhance generated posts with actual restaurant names and experiences

## Future Enhancements

Potential additions:
- Web interface for easier question management
- Integration with Google Maps API for location data
- Automatic publishing to WordPress or other CMS platforms
- Analytics tracking for popular questions
- User voting system for question priority

## Contributing

Feel free to fork this project and customize it for your needs! Some ideas:
- Adapt for other cities or regions
- Modify for different content types (travel, activities, etc.)
- Add more sophisticated blog post templates
- Integrate with external APIs (legally!)

## License

MIT License - feel free to use and modify for your projects!

## Support

For issues or questions, please open an issue on GitHub.

---

**Remember**: This tool is designed for legitimate content creation using ethically sourced questions. Always respect privacy, terms of service, and community guidelines when researching food questions.
