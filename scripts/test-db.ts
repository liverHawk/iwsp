import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" })

const url = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;
// TURSO_AUTH_TOKEN="****************"
// TURSO_DATABASE_URL="******************"

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

async function main() {
    try {
        console.log("Turso への接続を試みています...")

        const result = await client.execute("SELECT 1 + 1 as result;");
        console.log("接続成功！結果:", result.rows[0]);

        const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
        console.log("現在のテーブル一覧:", tables.rows.map(row => row.name))
    } catch (error) {
        console.error("接続エラーが発生しました:", error);
    }
}

main();