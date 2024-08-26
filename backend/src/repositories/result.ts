// @ts-nocheck
import { resultsTable, usersTable } from '../db/schema';
import { eq, max, desc, count, avg, sum, and } from 'drizzle-orm';
import { db } from '../db/setup';

class ResultRepository {
  static async registerResult(data) {
    return db.insert(resultsTable).values(data);
  }
  static async getBestResultByTime({ userId, time }) {
    const res = await db
      .select({
        wpm: max(resultsTable.wpm),
      })
      .from(resultsTable)
      .where(and(eq(resultsTable.userId, userId), eq(resultsTable.time, time)));
    return res[0];
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
  static async getResults({ userId }) {
    return db
      .select()
      .from(resultsTable)
      .where(eq(resultsTable.userId, userId))
      .orderBy(desc(resultsTable.date));
  }
  static async getDashboard(userId) {
    const last10 = await db
      .select({
        wpm: resultsTable.wpm,
        accuracy: resultsTable.accuracy,
      })
      .from(resultsTable)
      .where(eq(resultsTable.userId, userId))
      .orderBy(desc(resultsTable.date))
      .limit(10);

    const result = await db
      .select({
        completedTests: count(),
        avgWpm: avg(resultsTable.wpm),
        avgAccuracy: avg(resultsTable.accuracy),
        maxWpm: max(resultsTable.wpm),
        maxAccuracy: max(resultsTable.accuracy),
        totalChars: sum(resultsTable.correct),
      })
      .from(resultsTable)
      .where(eq(resultsTable.userId, userId))

    result[0]?.avgWpmLast10 =
      last10.reduce((sum, result) => sum + result.wpm, 0) / last10.length;
    result[0]?.avgAccLast10 =
      last10.reduce((sum, result) => sum + result.accuracy, 0) / last10.length;

    return result;
  }
}

export default ResultRepository;
