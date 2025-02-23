/**
 * This file updates the tile of a specified YouTube video.
 */

import { VIDEO_ID } from "./env"
import { youtube, type YouTubeVideo } from "./client"

updateVideoTitle()

/**
 * This function updates the title of a YouTube video based on its view and like count.
 * It fetches the video details, calculates the new title, and updates the video.
 * It uses the YouTube API client created in the client.ts file.
 */
async function updateVideoTitle() {
	try {
		console.info(`Searching for video with ID ${VIDEO_ID} ...`)
		const video = await fetchVideoDetails(VIDEO_ID)

		const oldTitle = getTitle(video)
		const { views, likes } = getStats(video)

		console.info(`Found the video with title "${oldTitle}".`)

		const newTitle = getNewTitle(views, likes)
		if (oldTitle === newTitle) {
			console.info("Video title already up to date.")
			return
		}

		console.info(`Updating video title to "${newTitle}" ...`)
		await updateTitle(video, newTitle)

		console.info("Video title updated successfully.")
	} catch (error) {
		console.error("Error updating video:", error)
	}
}

/**
 * Fetches basic information and statistics about a video.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/list}
 */
async function fetchVideoDetails(videoId: string): Promise<YouTubeVideo> {
	const response = await youtube.videos.list({
		part: ["snippet", "statistics"],
		id: [videoId],
	})

	if (!response.data.items?.length) {
		throw new Error("Video not found.")
	}

	return response.data.items[0]
}

/**
 * Updates the title of a video.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/update}
 */
async function updateTitle(video: YouTubeVideo, newTitle: string) {
	if (!video.snippet) {
		throw new Error("Snippet is missing.")
	}

	const { categoryId, description, defaultAudioLanguage, defaultLanguage } = video.snippet

	await youtube.videos.update({
		part: ["snippet"],
		requestBody: {
			id: video.id,
			snippet: {
				title: newTitle,
				categoryId,
				description,
				defaultAudioLanguage,
				defaultLanguage,
			},
		},
	})
}

/**
 * Returns the title of a YouTube video.
 */
function getTitle(video: YouTubeVideo) {
	return video.snippet?.title
}

/**
 * Returns the view count and like count of a YouTube video.
 */
function getStats(video: YouTubeVideo) {
	return {
		views: Number(video.statistics?.viewCount),
		likes: Number(video.statistics?.likeCount),
	}
}

/**
 * Generates the new title for the YouTube video.
 * Adjust this function as you like. In my case, it's German.
 */
function getNewTitle(views: number, likes: number) {
	return `Dieses Video wurde ${views} mal gesehen und hat ${likes} Likes!`
}
