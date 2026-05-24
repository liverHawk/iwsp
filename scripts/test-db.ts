import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" })

const url = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

if (!url || !token) {
    console.error(
        "error: エラー: TURSO_DATABASE_URL または TURSO_AUTH_TOKEN が環境変数に設定されていません。"
    )
    process.exit(1);
}

const client = createClient({
    url: url,
    authToken: token
});

const db = drizzle({ client });

async function main() {
    try {
        console.log("Turso への接続を試みています (Drizzle)...")

        // SQLite/libsql用Drizzleでは.all()や.run()を使用します
        const result = await db.all<{ result: number }>(sql`SELECT 1 + 1 as result;`);
        console.log("Drizzle 接続成功！結果:", result[0]);

        const tables = await db.all<{ name: string }>(sql`SELECT name FROM sqlite_master WHERE type='table';`);
        console.log("現在のテーブル一覧 (Drizzle):", tables.map(row => row.name))
    } catch (error) {
        console.error("Drizzle での接続エラーが発生しました:", error);
    }
}

main();