import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        getAdapter: PrismaAdapter(prisma)
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
});

export { handler as GET, handler as POST }