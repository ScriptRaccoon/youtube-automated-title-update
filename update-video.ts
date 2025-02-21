import { google } from "googleapis"

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, VIDEO_ID } from "./env"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const youtube = google.youtube({ version: "v3", auth: oAuth2Client })

function getNewTitle(views: number, likes: number) {
	return `Dieses Video wurde ${views} mal gesehen und hat ${likes} Likes!`
}

async function updateVideoTitle() {
	try {
		console.info("Searching for video with ID:", VIDEO_ID)

		// // https://developers.google.com/youtube/v3/docs/videos/list
		const response = await youtube.videos.list({
			part: ["snippet", "statistics"],
			id: [VIDEO_ID],
		})

		if (!response.data.items || response.data.items.length === 0) {
			console.error("Video not found.")
			return
		}

		const video = response.data.items[0]

		const oldTitle = video.snippet?.title
		const views = Number(video.statistics?.viewCount)
		const likes = Number(video.statistics?.likeCount)

		console.info("Found the video:", oldTitle)

		const newTitle = getNewTitle(views, likes)

		if (oldTitle === newTitle) {
			console.info("Video already up to date.")
			return
		}

		console.info("Updating video...")

		// https://developers.google.com/youtube/v3/docs/videos/update
		await youtube.videos.update({
			part: ["snippet"],
			requestBody: {
				id: VIDEO_ID,
				snippet: {
					title: newTitle,
					categoryId: video.snippet?.categoryId,
					description: video.snippet?.description,
					defaultAudioLanguage: video.snippet?.defaultAudioLanguage,
					defaultLanguage: video.snippet?.defaultLanguage,
				},
			},
		})

		console.info("Video updated successfully.")
	} catch (error) {
		console.error("Error updating video:", error)
	}
}

updateVideoTitle()
