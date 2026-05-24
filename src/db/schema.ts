import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const cheers = sqliteTable("cheers", {
    id: text("id").primaryKey(),
    prefecture: text("prefecture").notNull(),
    count: integer("count").default(0).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
});