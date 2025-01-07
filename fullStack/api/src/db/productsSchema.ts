import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';


export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  category: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  quantity: integer().notNull(),
});

export const createProductSchema = createInsertSchema(productsTable).omit({ id: true });

export const updateProductSchema = createInsertSchema(productsTable).omit({ id: true }).partial();