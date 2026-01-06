import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, '../data/questions.json');

export class QuestionDatabase {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const content = readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error loading database:', error.message);
      return { questions: [], nextId: 1 };
    }
  }

  save() {
    try {
      writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Error saving database:', error.message);
      return false;
    }
  }

  addQuestion(questionText, category = '', location = '', tags = []) {
    const question = {
      id: this.data.nextId,
      question: questionText,
      category,
      location,
      tags,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'pending',
      blogPostGenerated: false
    };

    this.data.questions.push(question);
    this.data.nextId++;
    this.save();
    return question;
  }

  getAllQuestions() {
    return this.data.questions;
  }

  getQuestionById(id) {
    return this.data.questions.find(q => q.id === id);
  }

  getPendingQuestions() {
    return this.data.questions.filter(q => !q.blogPostGenerated);
  }

  markAsGenerated(id) {
    const question = this.getQuestionById(id);
    if (question) {
      question.blogPostGenerated = true;
      question.status = 'completed';
      this.save();
      return true;
    }
    return false;
  }

  deleteQuestion(id) {
    const index = this.data.questions.findIndex(q => q.id === id);
    if (index !== -1) {
      this.data.questions.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }
}
