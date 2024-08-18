import { serial, text, pgTable, integer, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  joinDate: timestamp('join_date').notNull().defaultNow(),
  username: text("username").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull()
});

export const refreshSessions = pgTable("refreshSessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  refreshToken: text("refresh_token").notNull(),
  fingerPrint: text("finger_print").notNull()
})

export const wordsTable = pgTable("words", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  words: text("words").array().notNull(),
})

export const resultsTable = pgTable("results", {
  id: serial("id").primaryKey(),
  time: integer("time").notNull(),
  wpm: integer("wpm").notNull(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
})

