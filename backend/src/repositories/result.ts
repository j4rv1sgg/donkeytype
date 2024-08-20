// @ts-nocheck
import { resultsTable, usersTable } from '../db/schema';
import { eq, max, desc } from 'drizzle-orm';
import { db } from '../db/setup';

class ResultRepository {
  static async registerResult(data) {
    return db
      .insert(resultsTable)
      .values({
        wpm: data.wpm,
        time: data.time,
        words: data.words,
        correct: data.correct,
        inCorrect: data.inCorrect,
        accuracy: data.accuracy,
        punctuation: data.punctuation,
        capitals: data.capitals,
        numbers: data.numbers,
        userId: data.userId,
        date: data.date
      });
  }
  static async getResultsById(userId) {
    return db
      .select()
      .from(resultsTable)
      .where(eq(resultsTable.userId, userId));
  }
  static async getBestResults({ time }) {
    return db
      .select({
        username: usersTable.username,
        wpm: max(resultsTable.wpm),
      })
      .from(resultsTable)
      .where(eq(resultsTable.time, time))
      .innerJoin(usersTable, eq(resultsTable.userId, usersTable.id))
      .groupBy(usersTable.username)
      .orderBy(desc(max(resultsTable.wpm)));
  }
  static async getDashboard(userId) {
    return db
      .select({
        username: usersTable.username,
        joinDate: usersTable.joinDate,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));
  }
}

export default ResultRepository;
