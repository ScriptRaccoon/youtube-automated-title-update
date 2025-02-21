/**
 * This script generates an access token and a refresh token for the YouTube API.
 */

import { google } from "googleapis"
import readline from "readline"

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./env"

const SCOPES = ["https://www.googleapis.com/auth/youtube"]

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: "offline",
	scope: SCOPES,
})

console.info("Authorize this app by visiting:", authUrl)

rl.question("Enter the code from that page: ", (code) => {
	oAuth2Client.getToken(code, (err, token) => {
		if (err) {
			console.error("Error retrieving access token", err)
			return
		}
		console.info("Token has been generated successfully.")
		console.info(token)
		rl.close()
	})
})
