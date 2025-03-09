/**
 * This script generates the access and refresh token for the YouTube API.
 * See {@link https://www.npmjs.com/package/googleapis}
 * The refresh token needs to be added as an environment variable.
 */

import express from 'express'
import { google } from 'googleapis'
import { VARS } from './env'

const app = express()
const PORT = 3000

app.listen(PORT, () => {
	console.info(`Open http://localhost:${PORT} to authenticate.`)
})

const oAuth2Client = new google.auth.OAuth2(VARS.CLIENT_ID, VARS.CLIENT_SECRET, VARS.REDIRECT_URI)

const SCOPES = ['https://www.googleapis.com/auth/youtube']

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: SCOPES,
})

const homeBody = (url: string) =>
	`<body style="max-width: 30rem">
		<h1>Authentication with OAuth2</h1>
		<p>Use the following link to retrieve the access and refresh token.</p>
		<a href="${url}">${url}</a>
	</body>`

app.get('/', (_, res) => {
	res.send(homeBody(authUrl))
})

const connectionUrl = 'https://myaccount.google.com/connections'

const callbackBody = (access_token: string | null, refresh_token: string | null) =>
	`<body style="max-width:30rem">
		<h1>Tokens have been generated successfully.</h1>
		<h2>Access token:</h2>
		<code style="word-break: break-all;">${access_token}</code>
		<h2>Refresh token:</h2>
		<code style="word-break: break-all;">${refresh_token}</code>` +
	(refresh_token
		? ''
		: `<p>Refresh token has not been generated again.
		  You may revoke access of the existing one under:
		  <a href="${connectionUrl}">${connectionUrl}</a></p>`) +
	`</body>`

app.get('/callback', async (req, res) => {
	const code = req.query.code as string
	try {
		const { tokens } = await oAuth2Client.getToken(code)
		res.send(callbackBody(tokens.access_token ?? null, tokens.refresh_token ?? null))
	} catch (error) {
		res.status(500).send('Error retrieving tokens')
	}
})
