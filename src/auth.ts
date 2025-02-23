/**
 * This script generates the access and refresh token for the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 */

import express from "express"
import { google } from "googleapis"
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./env"

const app = express()
const PORT = 3000

app.listen(PORT, () => {
	console.info(`Server is running on http://localhost:${PORT}`)
})

const SCOPES = ["https://www.googleapis.com/auth/youtube"]

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: "offline",
	scope: SCOPES,
})

app.use(express.json())

app.get("/", (_, res) => {
	res.send(
		`<p style="font-size:1.25rem; font-family: system-ui, sans-serif;">
			Use the following link to retrieve the access and refresh token:
			<br>
			<a style="color: blue; font-weight: bold" href="${authUrl}">${authUrl}</a>
		</p>`
	)
})

const warning =
	"Refresh token is missing. You may revoke the access under " +
	"https://myaccount.google.com/connections to retrieve it."

app.get("/callback", async (req, res) => {
	const code = req.query.code as string
	try {
		const { tokens } = await oAuth2Client.getToken(code)
		console.info("Tokens have been generated successfully.")
		console.info(tokens)
		if (!tokens.refresh_token) {
			console.warn(warning)
		}
		res.status(200).json(tokens)
	} catch (error) {
		console.error("Error retrieving tokens", error)
		res.status(500).send("Error retrieving tokens")
	}
})
