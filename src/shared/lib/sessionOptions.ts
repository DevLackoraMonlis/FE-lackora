import { AuthService } from "@/http/end-points/AuthService";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const sessionOptions: NextAuthOptions = {
	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `jwt` is automatically set to `true` if no database is specified.
		strategy: "jwt",

		// Set the session expiration time to 2 weeks (14 days)
		maxAge: 14 * 24 * 60 * 60, // 14 days in seconds
	},
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				username: { label: "username", type: "text" },
				password: { label: "password", type: "password" },
				baseUrl: { label: "baseUrl", type: "text" },
				refreshToken: { label: "refreshToken", type: "text" },
			},
			async authorize(credentials) {
				if (credentials?.refreshToken) {
					try {
						const response = await AuthService.getRefreshToken(
							credentials?.refreshToken,
						);
						return {
							id: "",
							email: "",
							name: credentials?.username,
							data: response.data,
						};
					} catch (e: unknown) {
						console.error(e);
						const error = e as { response: { status: number } };
						throw new Error(error.response.status.toString());
					}
				} else {
					try {
						const response = await AuthService.getAccessToken({
							username: credentials?.username || "",
							password: credentials?.password || "",
							baseUrl: credentials?.baseUrl || "",
						});

						return {
							id: "",
							email: "",
							name: "",
							data: response.data,
						};
					} catch (e: unknown) {
						console.error(e);
						const error = e as { response: { status: number } };
						throw new Error(error.response.status.toString());
					}
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === "update") {
				// Note, that `session` can be any arbitrary object, remember to validate it!
				return { ...token, ...session.user };
			}
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	},
	secret: process.env.NEXT_AUTH,
	pages: {
		signOut: "/logout",
		signIn: "/login",
	},
};
