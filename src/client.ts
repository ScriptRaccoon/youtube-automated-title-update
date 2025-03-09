/**
 * This file creates the YouTube client.
 * See {@link https://www.npmjs.com/package/googleapis}
 */

import { google, type youtube_v3 } from 'googleapis'
import { VARS } from './env'

const oAuth2Client = new google.auth.OAuth2(VARS.CLIENT_ID, VARS.CLIENT_SECRET, VARS.REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: VARS.REFRESH_TOKEN })

export const youtube = google.youtube({ version: 'v3', auth: oAuth2Client })

export type YouTubeVideo = youtube_v3.Schema$Video
