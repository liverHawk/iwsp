import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const cheers = sqliteTable("cheers", {
    id: text("id").primaryKey(),
    prefecture: text("prefecture").notNull(),
    count: integer("count").default(0).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
});

export const attendees = sqliteTable("attendees", {
    id: text("id").primaryKey(),
    userHash: text("user_hash").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
})

export type InsertPrefecture = typeof cheers.$inferInsert;
export type SelectPrefecture = typeof cheers.$inferSelect;

export type InsertAttendee = typeof attendees.$inferInsert;
export type SelectAttendee = typeof attendees.$inferSelect;
