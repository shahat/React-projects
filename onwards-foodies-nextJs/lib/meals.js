import sql from 'better-sqlite3';
const db = sql('meals.db', { verbose: console.log });
export function getMeals() {
  const stmt = db.prepare('SELECT * FROM meals');

}