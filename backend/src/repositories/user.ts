//@ts-nocheck
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';
import { db } from '../db/setup';

class UserRepository {

  static async getUserByUsername(username: string) {
    const response = await db.select().from(usersTable).where(eq(usersTable.username, username));
    if(!response.length){
      return null
    }
    return response[0]
  }
  static async getUserByEmail(email: string) {
    const response = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if(!response.length){
      return null
    }
    return response[0]
  }
  

  static async createUser({username, email, hashedPassword}) {
    return db
      .insert(usersTable)
      .values({ username: username, email: email, password: hashedPassword })
      .returning({insertedId: usersTable.id})
  }

  static async getAllUsers() {
    return db.select().from(usersTable);
  }

}

export default UserRepository;
