/**
 * Use this script to generate the access and refresh token for the YouTube API.
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

app.get("/callback", (req, res) => {
	const code = req.query.code as string
	oAuth2Client.getToken(code, (err, token) => {
		if (err) {
			console.error("Error retrieving access token", err)
			res.status(500).send("Error retrieving access token")
			return
		}
		console.info("Token has been generated successfully.")
		console.info(token)
		res.status(200).json(token)
	})
})
