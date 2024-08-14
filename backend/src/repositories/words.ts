import { eq } from "drizzle-orm";
import { wordsTable } from "../db/schema";
import { db } from "../db/setup";

class WordsRepository {
  static async getWordsByName(name: string) {
    const response = await db.select().from(wordsTable).where(eq(wordsTable.name, name));
    if(!response.length){
      return null
    }
    return response[0]
  }
  static async getAviableWords() {
    const response = await db.select({name: wordsTable.name}).from(wordsTable);
    if(!response.length){
      return null
    }
    return response
  }
}
export default WordsRepository