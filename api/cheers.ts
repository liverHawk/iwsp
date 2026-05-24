import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/libsql";
import { eq, sql } from "drizzle-orm";
import { cheers } from "../src/db/schema";

// Turso データベース接続を初期化
// 環境変数はサーバーサイド（Vercel）でのみ読まれます
const db = drizzle({ connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
}});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const prefectureId = req.query.prefectureId as string || req.body?.prefectureId;

    if (!prefectureId) {
        return res.status(400).json({ error: "prefectureId is required" });
    }

    try {
        // 1. GETリクエスト：現在の応援数を取得して返す
        if (req.method === "GET") {
            const result = await db.select().from(cheers).where(eq(cheers.id, prefectureId)).limit(1);
            const count = result.length > 0 ? result[0].count : 0;
            return res.status(200).json({ count });
        }

        // 2. POSTリクエスト：応援数を加算更新する
        if (req.method === "POST") {
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
