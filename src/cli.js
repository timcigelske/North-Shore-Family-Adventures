#!/usr/bin/env node

import { QuestionDatabase } from './database.js';
import { BlogPostGenerator } from './blogGenerator.js';
import readline from 'readline';

const db = new QuestionDatabase();
const generator = new BlogPostGenerator();

function displayHelp() {
  console.log(`
Milwaukee Food Blog Generator
============================

Commands:
  add              Add a new food question
  list             List all questions
  generate <id>    Generate blog post for a specific question
  generate-all     Generate blog posts for all pending questions
  delete <id>      Delete a question
  help             Show this help message

Examples:
  npm run add-question
  npm run list-questions
  npm run generate-post
  npm run generate-all
`);
}

function displayQuestions(questions) {
  if (questions.length === 0) {
    console.log('\nNo questions found.\n');
    return;
  }

  console.log('\n=== Food Questions ===\n');
  questions.forEach(q => {
    console.log(`ID: ${q.id}`);
    console.log(`Question: ${q.question}`);
    console.log(`Category: ${q.category || 'N/A'}`);
    console.log(`Location: ${q.location || 'N/A'}`);
    console.log(`Tags: ${q.tags.length > 0 ? q.tags.join(', ') : 'N/A'}`);
    console.log(`Status: ${q.status}`);
    console.log(`Blog Generated: ${q.blogPostGenerated ? 'Yes' : 'No'}`);
    console.log(`Date Added: ${q.dateAdded}`);
    console.log('---');
  });
  console.log('');
}

async function promptInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function addQuestion() {
  console.log('\n=== Add New Food Question ===\n');

  const question = await promptInput('Enter the question: ');
  if (!question) {
    console.log('Question cannot be empty.');
    return;
  }

  const category = await promptInput('Category (e.g., Mexican, Italian, Bakery): ');
  const location = await promptInput('Location (e.g., Milwaukee, Waukesha): ');
  const tagsInput = await promptInput('Tags (comma-separated, e.g., gluten-free, vegan): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

  const newQuestion = db.addQuestion(question, category, location, tags);

  console.log('\n✓ Question added successfully!');
  console.log(`ID: ${newQuestion.id}`);
  console.log(`Question: ${newQuestion.question}\n`);
}

async function generatePost(questionId) {
  const question = questionId
    ? db.getQuestionById(parseInt(questionId))
    : null;

  if (questionId && !question) {
    console.log(`\nQuestion with ID ${questionId} not found.\n`);
    return;
  }

  let targetQuestion;

  if (!questionId) {
    const pending = db.getPendingQuestions();
    if (pending.length === 0) {
      console.log('\nNo pending questions to generate.\n');
      return;
    }

    console.log('\n=== Pending Questions ===\n');
    pending.forEach((q, index) => {
      console.log(`${index + 1}. [ID: ${q.id}] ${q.question}`);
    });

    const choice = await promptInput('\nEnter question number to generate (or ID): ');
    const choiceNum = parseInt(choice);

    if (choiceNum > 0 && choiceNum <= pending.length) {
      targetQuestion = pending[choiceNum - 1];
    } else {
      targetQuestion = db.getQuestionById(choiceNum);
    }

    if (!targetQuestion) {
      console.log('\nInvalid selection.\n');
      return;
    }
  } else {
    targetQuestion = question;
  }

  console.log(`\nGenerating blog post for: "${targetQuestion.question}"`);

  const result = generator.generateBlogPost(targetQuestion);

  if (result.success) {
    db.markAsGenerated(targetQuestion.id);
    console.log(`✓ Blog post generated successfully!`);
    console.log(`File: ${result.filename}`);
    console.log(`Path: ${result.filepath}\n`);
  } else {
    console.log(`✗ Error generating blog post: ${result.error}\n`);
  }
}

async function generateAll() {
  const pending = db.getPendingQuestions();

  if (pending.length === 0) {
    console.log('\nNo pending questions to generate.\n');
    return;
  }

  console.log(`\nGenerating blog posts for ${pending.length} questions...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const question of pending) {
    console.log(`Processing: "${question.question}"`);
    const result = generator.generateBlogPost(question);

    if (result.success) {
      db.markAsGenerated(question.id);
      console.log(`  ✓ ${result.filename}`);
      successCount++;
    } else {
      console.log(`  ✗ Error: ${result.error}`);
      failCount++;
    }
  }

  console.log(`\nCompleted: ${successCount} successful, ${failCount} failed\n`);
}

async function deleteQuestion(questionId) {
  if (!questionId) {
    console.log('\nPlease provide a question ID to delete.\n');
    return;
  }

  const question = db.getQuestionById(parseInt(questionId));
  if (!question) {
    console.log(`\nQuestion with ID ${questionId} not found.\n`);
    return;
  }

  console.log(`\nAre you sure you want to delete this question?`);
  console.log(`"${question.question}"`);

  const confirm = await promptInput('Type "yes" to confirm: ');

  if (confirm.toLowerCase() === 'yes') {
    db.deleteQuestion(parseInt(questionId));
    console.log('\n✓ Question deleted.\n');
  } else {
    console.log('\nDeletion cancelled.\n');
  }
}

// Main CLI handler
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'add':
    await addQuestion();
    break;
  case 'list':
    displayQuestions(db.getAllQuestions());
    break;
  case 'generate':
    await generatePost(arg);
    break;
  case 'generate-all':
    await generateAll();
    break;
  case 'delete':
    await deleteQuestion(arg);
    break;
  case 'help':
  default:
    displayHelp();
    break;
}
