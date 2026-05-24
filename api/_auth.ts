import { betterAuth } from "better-auth";

export function getAuthInstance() {
    const secret = process.env.BETTER_AUTH_SECRET;
    const url = process.env.BETTER_AUTH_URL;
    const googleId = process.env.GOOGLE_CLIENT_ID;
    const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!secret || !url || !googleId || !googleSecret) {
        throw new Error(`Missing environment variables for Better Auth. [BETTER_AUTH_SECRET: ${secret ? "present" : "missing"}], [BETTER_AUTH_URL: ${url ? "present" : "missing"}], [GOOGLE_CLIENT_ID: ${googleId ? "present" : "missing"}], [GOOGLE_CLIENT_SECRET: ${googleSecret ? "present" : "missing"}]`);
    }

    return betterAuth({
        socialProviders: {
            google: {
                clientId: googleId,
                clientSecret: googleSecret,
            }
        },
        session: {
            strategy: "jwt",
        }
    });
}
