/*
some authentication barriers use for security on our site
*/


import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

// function that ensure all admin route pages are secure
export async function middleware(req: NextRequest) {
    if (await isAuthenticated(req) === false) {
        return new NextResponse("Sorry - You are an Unauthorised Admin User", { status: 401,
            headers: { "WWW-Authenticate": "Basic"}})
    }
}

// function to check of user is aunthenticated
async function isAuthenticated(req: NextRequest) {
    const authHeader = req.headers.get("authorisation") || 
    req.headers.get("Authorisation") || req.headers.get("authorization") ||
    req.headers.get("Authorization")

    if (authHeader == null) return false

    const [username, password] = Buffer.from(authHeader.split(" ")[1], 
    "base64").toString().split(":")

    
    return username === process.env.ADMIN_USERNAME && (await isValidPassword(password,
        process.env.HASHED_ADMIN_PASSWORD as string
    ))
}

// variable that holds the configuration settings that secure the admin
export const config = {
    matcher: "/admin/:path*"
}