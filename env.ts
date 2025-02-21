import { config } from "dotenv"

config()

const CLIENT_ID = process.env.CLIENT_ID ?? ""
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? ""
const REDIRECT_URI = process.env.REDIRECT_URI ?? ""
const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? ""
const VIDEO_ID = process.env.VIDEO_ID ?? ""

const is_valid = CLIENT_ID && CLIENT_SECRET && REDIRECT_URI && REFRESH_TOKEN && VIDEO_ID

if (!is_valid) {
	console.error("Missing environment variables.")
	process.exit(1)
}

export { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, VIDEO_ID }
