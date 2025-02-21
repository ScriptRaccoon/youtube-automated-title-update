import { VIDEO_ID } from "./env"
import { youtube, type YouTubeVideo } from "./client"

updateVideoTitle()

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

async function fetchVideoDetails(videoId: string): Promise<YouTubeVideo> {
	// https://developers.google.com/youtube/v3/docs/videos/list
	const response = await youtube.videos.list({
		part: ["snippet", "statistics"],
		id: [videoId],
	})

	if (!response.data.items?.length) {
		throw new Error("Video not found.")
	}

	const video = response.data.items[0]
	if (!video.snippet) {
		throw new Error("Snippet not found.")
	}

	return video
}

async function updateTitle(video: YouTubeVideo, newTitle: string) {
	const { categoryId, description, defaultAudioLanguage, defaultLanguage } = video.snippet!

	// https://developers.google.com/youtube/v3/docs/videos/update
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

function getTitle(video: YouTubeVideo) {
	return video.snippet?.title
}

function getStats(video: YouTubeVideo) {
	return {
		views: Number(video.statistics?.viewCount),
		likes: Number(video.statistics?.likeCount),
	}
}

function getNewTitle(views: number, likes: number) {
	return `Dieses Video wurde ${views} mal gesehen und hat ${likes} Likes!`
}
