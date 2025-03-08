/**
 * This script generates the access and refresh token for the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 * The refresh token needs to be added as an environment variable.
 */

import express from "express"
import { google } from "googleapis"
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./env"

const app = express()
const PORT = 3000

app.listen(PORT, () => {
	console.info(`Open http://localhost:${PORT} to authenticate.`)
})

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const SCOPES = ["https://www.googleapis.com/auth/youtube"]

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: "offline",
	scope: SCOPES,
})

app.get("/", (_, res) => {
	res.send(
		`<body style="max-width:30rem">` +
			`<h1>Authentication with OAuth2</h1>` +
			`<p>Use the following link to retrieve the access and refresh token.</p>` +
			`<a href="${authUrl}">${authUrl}</a>` +
			`</body>`
	)
})

app.get("/callback", async (req, res) => {
	const code = req.query.code as string
	try {
		const { tokens } = await oAuth2Client.getToken(code)

		const showWarning = !tokens.refresh_token
		const connectionUrl = "https://myaccount.google.com/connections"

		const warning =
			"Refresh token has not been generated again. You may revoke access of the existing one under: " +
			`<a href="${connectionUrl}">${connectionUrl}</a>`

		res.send(
			`<body style="max-width:30rem">` +
				`<h1>Tokens have been generated successfully.</h1>` +
				`<h2>Access token:</h2>` +
				`<code style="word-break: break-all;">${tokens.access_token}</code>` +
				`<h2>Refresh token:</h2>` +
				`<code style="word-break: break-all;">${tokens.refresh_token}</code>` +
				(showWarning ? `<p>${warning}</p>` : "") +
				`</body>`
		)
	} catch (error) {
		res.status(500).send("Error retrieving tokens")
	}
})
