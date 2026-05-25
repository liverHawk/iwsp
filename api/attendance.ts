import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/libsql";
import { eq, sql, gte } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createHash, randomUUID } from "crypto";

// attendees テーブルのスキーマ定義
const attendees = sqliteTable("attendees", {
    id: text("id").primaryKey(),
    userHash: text("user_hash").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
});

// Turso データベース接続の初期化
const db = drizzle({ connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
}});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS対応のためのヘッダー設定
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        // 1. GETリクエスト：参加表明データの取得（またはuserHashの登録確認）
        if (req.method === "GET") {
            const userHash = req.query.userHash as string;
            
            // userHashが指定されている場合は、そのハッシュが登録済みか確認
            if (userHash) {
                const result = await db
                    .select()
                    .from(attendees)
                    .where(eq(attendees.userHash, userHash))
                    .limit(1);

                return res.status(200).json({ registered: result.length > 0 });
            }

            // userHashがない場合は、集計データ（全体数 ＆ 直近20分間の登録数）を返す
            const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);

            const [totalResult, recentResult] = await Promise.all([
                db.select({ count: sql<number>`count(*)` }).from(attendees),
                db.select({ count: sql<number>`count(*)` }).from(attendees).where(gte(attendees.createdAt, twentyMinutesAgo))
            ]);

            const total = totalResult[0]?.count ?? 0;
            const recent = recentResult[0]?.count ?? 0;

            return res.status(200).json({ success: true, total, recent });
        }

        // 2. POSTリクエスト：名前と生年月日を受け取って出席登録する
        if (req.method === "POST") {
            const { name, birthday } = req.body || {};

            if (!name || typeof name !== "string" || name.trim().length === 0) {
                return res.status(400).json({ error: "名前を入力してください。" });
            }
            if (!birthday || typeof birthday !== "string" || birthday.trim().length === 0) {
                return res.status(400).json({ error: "生年月日を入力してください。" });
            }

            // スペースを削除し、大文字小文字などを正規化してハッシュの揺らぎを防ぐ
            const cleanName = name.replace(/[\s\u3000]+/g, "").toLowerCase();
            const cleanBirthday = birthday.trim();

            // ソルトを取得（環境変数から。なければデフォルト値を使用）
            const salt = process.env.HASH_SALT || "default_iwsp_salt_2026_prod";

            // SHA-256ハッシュの生成
            const userHash = createHash("sha256")
                .update(`${cleanName}-${cleanBirthday}-${salt}`)
                .digest("hex");

            // 既に登録されているか重複チェック
            const existing = await db
                .select()
                .from(attendees)
                .where(eq(attendees.userHash, userHash))
                .limit(1);

            if (existing.length > 0) {
                // すでに登録されている場合は、成功扱いでステータスを返す（二重登録防止）
                return res.status(200).json({
                    success: true,
                    userHash,
                    alreadyRegistered: true,
                    message: "既に登録されています。"
                });
            }

            // 新規登録
            const id = randomUUID();
            await db.insert(attendees).values({
                id,
                userHash,
                createdAt: new Date()
            });

            return res.status(201).json({
                success: true,
                userHash,
                alreadyRegistered: false,
                message: "参加表明が完了しました！"
            });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Attendance API error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
