import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/libsql";
import { eq, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const cheers = sqliteTable("cheers", {
    id: text("id").primaryKey(),
    prefecture: text("prefecture").notNull(),
    count: integer("count").default(0).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// Turso データベース接続を初期化
// 環境変数はサーバーサイド（Vercel）でのみ読まれます
const db = drizzle({ connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
}});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const prefectureId = req.query.prefectureId as string || req.body?.prefectureId;

    try {
        // 1. GETリクエスト：現在の応援数を取得して返す
        if (req.method === "GET") {
            if (prefectureId) {
                const result = await db.select().from(cheers).where(eq(cheers.id, prefectureId)).limit(1);
                const count = result.length > 0 ? result[0].count : 0;
                return res.status(200).json({ count });
            } else {
                const allCheers = await db.select().from(cheers);
                const total = allCheers.reduce((sum, item) => sum + item.count, 0);
                const prefectures = allCheers.reduce((acc, item) => {
                    acc[item.id] = item.count;
                    return acc;
                }, {} as Record<string, number>);
                return res.status(200).json({ total, prefectures });
            }
        }

        // 2. POSTリクエスト：応援数を加算更新する
        if (req.method === "POST") {
            if (!prefectureId) {
                return res.status(400).json({ error: "prefectureId is required" });
            }
            const count = Number(req.body.count || 1);
            
            await db
                .update(cheers)
                .set({
                    count: sql`${cheers.count} + ${count}`,
                    updatedAt: new Date(),
                })
                .where(eq(cheers.id, prefectureId));

            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
