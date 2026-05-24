import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { attendees } from "../src/db/schema";
import { getAuthInstance } from "./_auth";
import crypto from "crypto";

// Turso データベース接続を初期化
const db = drizzle({ connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
}});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // POSTリクエストのみ受け付ける
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Better Auth セッションを検証
        const auth = getAuthInstance();
        const session = await auth.api.getSession({
            headers: req.headers
        });

        if (!session || !session.user || !session.user.email) {
            return res.status(401).json({ error: "Unauthorized. Valid session required." });
        }

        const email = session.user.email;
        // メールアドレスをSHA-256でハッシュ化
        const userHash = crypto.createHash("sha256").update(email).digest("hex");
        
        // 重複チェック
        const existing = await db
            .select()
            .from(attendees)
            .where(eq(attendees.userHash, userHash))
            .limit(1);

        if (existing.length === 0) {
            // 新規来場登録
            await db.insert(attendees).values({
                id: crypto.randomUUID(),
                userHash,
                createdAt: new Date()
            });
            return res.status(200).json({ success: true, registered: true });
        }

        // すでに登録されている場合
        return res.status(200).json({ success: true, registered: false, message: "Already registered" });

    } catch (error: any) {
        console.error("Attend API error:", error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
