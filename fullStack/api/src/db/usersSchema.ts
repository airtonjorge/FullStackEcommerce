
import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull(),
});
//@ts-ignore
export const createUserSchema = createInsertSchema(usersTable).omit({ id: true, role: true });
export const loginSchema = createInsertSchema(usersTable).pick({ email: true, password: true });