import http from "http";
import url from "url";
import * as dotenv from "dotenv";

// .env.localから環境変数をロード（動的インポートの前に行う必要があります）
dotenv.config({ path: ".env.local" });

// ハンドラーを動的にインポート
const cheersHandler = (await import("../api/cheers")).default;
const attendanceHandler = (await import("../api/attendance")).default;

const server = http.createServer((req, res) => {
    // CORSヘッダーを付与
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url || "", true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    let bodyRaw = "";
    req.on("data", (chunk) => {
        bodyRaw += chunk;
    });

    req.on("end", async () => {
        let body = {};
        if (bodyRaw) {
            try {
                body = JSON.parse(bodyRaw);
            } catch (e) {
                console.error("JSONのパースに失敗しました:", e);
            }
        }

        // VercelRequestをエミュレート
        const vercelReq: any = req;
        vercelReq.query = query;
        vercelReq.body = body;

        // VercelResponseをエミュレート
        const vercelRes: any = res;
        vercelRes.status = (statusCode: number) => {
            res.statusCode = statusCode;
            return vercelRes;
        };
        vercelRes.json = (data: any) => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return vercelRes;
        };

        // リクエストのパスに応じて呼び出すハンドラーを切り替える
        try {
            if (pathname === "/api/cheers") {
                await cheersHandler(vercelReq, vercelRes);
            } else if (pathname === "/api/attendance") {
                await attendanceHandler(vercelReq, vercelRes);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: `Not Found: ${pathname}` }));
            }
        } catch (error) {
            console.error("ハンドラー実行エラー:", error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`\n🚀 API Local Dev Server running on: http://localhost:${PORT}`);
});
