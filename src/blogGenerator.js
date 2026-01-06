import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class BlogPostGenerator {
  constructor() {
    this.outputDir = join(__dirname, '../blog-posts');
  }

  generateSlug(question) {
    return question
      .toLowerCase()
      .replace(/[?!']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  generateBlogPost(question) {
    const { id, question: questionText, category, location, tags } = question;
    const slug = this.generateSlug(questionText);
    const date = new Date().toISOString().split('T')[0];

    const content = this.createContent(questionText, category, location, tags);
    const filename = `${date}-${slug}.md`;
    const filepath = join(this.outputDir, filename);

    try {
      writeFileSync(filepath, content, 'utf-8');
      return { success: true, filename, filepath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  createContent(questionText, category, location, tags) {
    const date = new Date().toISOString().split('T')[0];
    const title = questionText.replace(/\?$/, '');

    return `---
title: "${title}"
date: ${date}
category: ${category || 'Food & Dining'}
location: ${location || 'Milwaukee Area'}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
seo:
  description: "Discover the answer to '${questionText}' with our comprehensive guide to ${location || 'Milwaukee area'} dining."
  keywords: "${category}, ${location}, Milwaukee food, Wisconsin restaurants${tags.length > 0 ? ', ' + tags.join(', ') : ''}"
---

# ${title}

${this.generateIntroduction(questionText, location, category)}

## Quick Answer

${this.generateQuickAnswer(questionText, category, location)}

## Top Recommendations

${this.generateRecommendations(category, location)}

## What to Look For

${this.generateWhatToLookFor(category)}

## Local Favorites

${this.generateLocalFavorites(location, category)}

## Dietary Accommodations

${this.generateDietaryInfo(tags, category)}

## Best Times to Visit

${this.generateBestTimes()}

## Price Ranges

${this.generatePriceInfo(category)}

## Getting There & Parking

${this.generateLocationInfo(location)}

## Tips from Locals

${this.generateLocalTips(category, location)}

## Conclusion

${this.generateConclusion(questionText, location)}

---

*This guide was created to help Milwaukee area food enthusiasts discover the best dining experiences. Have a recommendation? Share it with your local food community!*

*Last updated: ${date}*
`;
  }

  generateIntroduction(question, location, category) {
    return `If you're wondering "${question}" you're not alone! ${location || 'The Milwaukee area'} has a thriving food scene with countless options for ${category || 'great dining'}. This comprehensive guide will help you discover the best spots, hidden gems, and local favorites that answer this common question.

Whether you're a long-time resident or just visiting, finding the perfect place to eat is essential to experiencing ${location || 'Milwaukee'}'s vibrant culinary culture.`;
  }

  generateQuickAnswer(question, category, location) {
    return `The best ${category || 'dining'} options in ${location || 'the Milwaukee area'} offer a combination of quality, atmosphere, and value. While personal preferences vary, the top-rated establishments consistently deliver exceptional experiences that keep locals and visitors coming back.

**Key factors to consider:**
- Food quality and authenticity
- Atmosphere and ambiance
- Service and hospitality
- Value for money
- Location and accessibility`;
  }

  generateRecommendations(category, location) {
    return `When searching for the best ${category || 'dining'} in ${location || 'the Milwaukee area'}, consider these highly-recommended spots:

### Established Favorites
These well-known restaurants have built their reputations over years of consistent quality and service.

### Hidden Gems
Don't overlook smaller, family-owned establishments that may not have massive marketing budgets but deliver outstanding food and experiences.

### New & Trending
Keep an eye on newly opened restaurants that are generating buzz in the local food community.

**Research Tips:**
- Check recent online reviews (within the last 3-6 months)
- Ask locals for their personal favorites
- Visit during different times to experience varied menus
- Follow local food bloggers and Instagram accounts`;
  }

  generateWhatToLookFor(category) {
    return `When evaluating ${category || 'restaurants'}, here are the key indicators of quality:

**Food Quality:**
- Fresh, high-quality ingredients
- Proper preparation techniques
- Consistent taste across visits
- Attention to presentation

**Service:**
- Knowledgeable staff
- Attentive but not intrusive service
- Quick response to requests
- Friendly atmosphere

**Atmosphere:**
- Clean and well-maintained facilities
- Appropriate ambiance for the dining style
- Comfortable seating
- Good noise levels for conversation`;
  }

  generateLocalFavorites(location, category) {
    return `The ${location || 'Milwaukee'} community has strong opinions about their favorite ${category || 'restaurants'}! Here's what makes a place become a local favorite:

**Community Connection:**
- Long-standing presence in the neighborhood
- Family-owned and operated businesses
- Active participation in local events
- Support for local suppliers and ingredients

**Consistency:**
- Reliable quality over time
- Stable menu with seasonal specials
- Familiar faces among staff
- Predictable positive experiences

To find current local favorites, try:
- Visiting during peak hours to see which places are busiest
- Asking your neighbors and coworkers
- Checking local Facebook groups and community forums
- Following ${location || 'Milwaukee'} food influencers on social media`;
  }

  generateDietaryInfo(tags, category) {
    const hasDietaryTags = tags.some(tag =>
      tag.includes('gluten-free') ||
      tag.includes('vegan') ||
      tag.includes('vegetarian') ||
      tag.includes('dietary')
    );

    if (hasDietaryTags) {
      return `Special dietary needs are increasingly well-accommodated in the ${category || 'Milwaukee dining'} scene:

**Common Accommodations:**
- Gluten-free options and dedicated preparation areas
- Vegan and vegetarian selections
- Allergen-friendly menus
- Customizable dishes

**Tips for Dining with Restrictions:**
- Call ahead to discuss your needs
- Ask about ingredient sourcing and preparation methods
- Inquire about cross-contamination prevention
- Check online menus in advance`;
    }

    return `Many ${category || 'restaurants'} in the Milwaukee area accommodate various dietary needs:

**Available Options:**
- Vegetarian and vegan choices
- Gluten-free alternatives
- Allergen information available
- Customizable menu items

Always communicate your dietary requirements clearly with your server to ensure a safe and enjoyable dining experience.`;
  }

  generateBestTimes() {
    return `Timing your visit can significantly impact your dining experience:

**Weekdays:**
- Lunch (11am-2pm): Usually quicker service, lunch specials
- Early Dinner (4-6pm): Less crowded, may have early bird specials
- Late Dinner (after 8pm): Quieter atmosphere, full menu available

**Weekends:**
- Brunch (9am-2pm): Popular but expect waits
- Dinner (6-8pm): Peak times, make reservations
- Late Night (after 9pm): More relaxed, bar scene

**Seasonal Considerations:**
- Summer: Outdoor seating fills quickly
- Winter: Indoor dining is cozier
- Holidays: Always call ahead or book reservations`;
  }

  generatePriceInfo(category) {
    return `Understanding pricing helps set expectations and plan your budget:

**Budget-Friendly ($):**
- Casual dining
- Quick service
- $10-15 per person

**Mid-Range ($$):**
- Sit-down restaurants
- Full-service dining
- $15-30 per person

**Upscale ($$$):**
- Fine dining experiences
- Premium ingredients
- $30-50+ per person

**Money-Saving Tips:**
- Look for happy hour specials
- Try lunch menus for better value
- Check for daily specials
- Follow restaurants on social media for promotions`;
  }

  generateLocationInfo(location) {
    return `Planning your visit to ${location || 'Milwaukee area'} restaurants:

**Parking:**
- Street parking availability varies by neighborhood
- Many restaurants offer parking lots
- Consider public parking garages for downtown locations
- Check for parking validation

**Public Transportation:**
- Bus routes serve most major dining districts
- Check MCTS (Milwaukee County Transit System) schedules
- Ride-sharing services widely available

**Accessibility:**
- Most restaurants comply with ADA requirements
- Call ahead to confirm specific accessibility needs
- Ask about entrance accessibility and restroom facilities`;
  }

  generateLocalTips(category, location) {
    return `Insider tips from ${location || 'Milwaukee'} locals:

1. **Make Reservations:** Popular spots fill up quickly, especially weekends
2. **Try Specials:** Daily specials often feature seasonal, fresh ingredients
3. **Ask Questions:** Staff usually love to share recommendations
4. **Be Open-Minded:** Some of the best experiences come from trying something new
5. **Support Local:** Family-owned restaurants often provide the most authentic experiences
6. **Check Social Media:** Restaurants often post daily specials and updates
7. **Arrive Hungry:** Portions in ${location || 'Milwaukee'} are often generous
8. **Bring Cash:** Some smaller establishments may be cash-only

**Community Etiquette:**
- Tip appropriately (18-20% for good service)
- Be patient during busy times
- Respect other diners
- Leave honest, constructive reviews`;
  }

  generateConclusion(question, location) {
    return `Finding the answer to "${question}" comes down to personal preferences, but ${location || 'the Milwaukee area'} offers diverse options to satisfy any craving. The best approach is to try multiple establishments, ask locals for their favorites, and explore both well-known spots and hidden gems.

Remember that the "best" restaurant is subjective—what matters most is finding places that match your taste preferences, dietary needs, and dining style. Don't be afraid to venture beyond the most popular options and discover your own favorites.

The ${location || 'Milwaukee'} food scene is constantly evolving with new openings and seasonal changes, so keep exploring and stay connected with the local food community to discover the latest and greatest dining experiences.`;
  }
}
