/**
 * This file loads environment variables from the .env file.
 */

import { config } from "dotenv"

config()

const CLIENT_ID = process.env.CLIENT_ID ?? ""
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? ""
const REDIRECT_URI = process.env.REDIRECT_URI ?? ""
const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? ""
const VIDEO_ID = process.env.VIDEO_ID ?? ""

if (!CLIENT_ID) {
	throw new Error("CLIENT_ID is missing.")
}

if (!CLIENT_SECRET) {
	throw new Error("CLIENT_SECRET is missing.")
}

if (!REDIRECT_URI) {
	throw new Error("REDIRECT_URI is missing.")
}

if (!REFRESH_TOKEN) {
	console.warn("REFRESH_TOKEN is missing.")
}

if (!VIDEO_ID) {
	throw new Error("VIDEO_ID is missing.")
}

export { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, VIDEO_ID }
