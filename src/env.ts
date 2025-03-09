/**
 * This file loads environment variables from the .env file.
 * It also validates the presence of all required variables.
 */

import { config } from "dotenv"
config()

const { CLIENT_ID = "", CLIENT_SECRET = "", REDIRECT_URI = "", REFRESH_TOKEN = "", VIDEO_ID = "" } = process.env

export const VARS = {
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI,
	REFRESH_TOKEN,
	VIDEO_ID,
} as const

validateEnvVars()

function validateEnvVars() {
	for (const [key, value] of Object.entries(VARS)) {
		if (!value) throw new Error(`${key} is missing.`)
	}
}
