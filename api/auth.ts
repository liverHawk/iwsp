import type { VercelRequest, VercelResponse } from "@vercel/node";
import { toNodeHandler } from "better-auth/node";
import { getAuthInstance } from "./_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const auth = getAuthInstance();
        return toNodeHandler(auth)(req, res);
    } catch (error: any) {
        console.error("Better Auth Initialization Error:", error);
        return res.status(500).json({ 
            error: "Authentication service is temporarily unavailable due to configuration issues.",
            message: error.message 
        });
    }
}
