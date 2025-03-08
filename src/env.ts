/**
 * This file loads environment variables from the .env file.
 * It also validates the presence of all required variables.
 */

import { config } from "dotenv"

config()

export const CLIENT_ID = process.env.CLIENT_ID ?? ""
export const CLIENT_SECRET = process.env.CLIENT_SECRET ?? ""
export const REDIRECT_URI = process.env.REDIRECT_URI ?? ""
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN ?? ""
export const VIDEO_ID = process.env.VIDEO_ID ?? ""

validateEnvVars()

function validateEnvVars() {
	const ENV_VARS = {
		CLIENT_ID,
		CLIENT_SECRET,
		REDIRECT_URI,
		REFRESH_TOKEN,
		VIDEO_ID,
	}

	for (const key in ENV_VARS) {
		if (!ENV_VARS[key]) {
			throw new Error(`${key} is missing.`)
		}
	}
}
