/**
 * This file updates the title of a specified YouTube video.
 */

import { VIDEO_ID } from "./env"
import { youtube, type YouTubeVideo } from "./client"
import { defaultTemplate, supportedLocales, titleTemplates } from "./titles"

updateVideoTitle()

/**
 * Updates the title of a YouTube video based on its view and like count.
 */
async function updateVideoTitle() {
	try {
		console.info(`Searching for video with ID ${VIDEO_ID} ...`)
		const video = await fetchVideoDetails(VIDEO_ID)

		console.info("Video found.")

		const newTitle = await updateTitle(video)
		if (newTitle) {
			console.info(`New title: ${newTitle}`)
			console.info(`Title has been updated in ${supportedLocales.length} languages.`)
		}
	} catch (error) {
		console.error("Error updating video:", error)
	}
}

/**
 * Fetches all the required information about a video.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/list}
 */
async function fetchVideoDetails(videoId: string): Promise<YouTubeVideo> {
	const response = await youtube.videos.list({
		part: ["snippet", "statistics", "localizations"],
		id: [videoId],
	})

	if (!response.data.items?.length) {
		throw new Error("Video not found.")
	}

	return response.data.items[0]
}

/**
 * Updates the title of a video. Includes translations in multiple languages.
 * See {@link https://developers.google.com/youtube/v3/docs/videos/update}
 * Returns the new default title if the title has been updated successfully.
 */
async function updateTitle(video: YouTubeVideo): Promise<string | null> {
	if (!video.snippet) {
		throw new Error("Snippet is missing.")
	}

	const { title, categoryId, description, defaultAudioLanguage, defaultLanguage } = video.snippet

	if (!defaultLanguage) {
		throw new Error("Default language is missing.")
	}

	const newTitle = getNewTitle(defaultLanguage, video)

	if (title === newTitle) {
		console.info("Title is already up to date.")
		return null
	}

	const requestBody = {
		id: video.id,
		snippet: {
			title: getNewTitle(defaultLanguage, video),
			categoryId,
			description,
			defaultAudioLanguage,
			defaultLanguage,
		},
		localizations: getLocalizations(video),
	}

	await youtube.videos.update({
		part: ["snippet", "localizations"],
		requestBody,
	})

	return newTitle
}

/**
 * Returns the new title of a video based on its view and like count
 * in a specified locale.
 */
function getNewTitle(locale: string, video: YouTubeVideo): string {
	const views = video.statistics?.viewCount ?? 0
	const likes = video.statistics?.likeCount ?? 0
	const template = titleTemplates[locale] ?? defaultTemplate
	return template.replace("{views}", views.toString()).replace("{likes}", likes.toString())
}

/**
 * Returns the description of a video in a specified locale.
 */
function getDescription(locale: string, video: YouTubeVideo): string {
	return video.localizations?.[locale]?.description ?? ""
}

/**
 * Returns the localizations for a video in multiple languages.
 */
function getLocalizations(video: YouTubeVideo) {
	const localizations: Record<string, { title: string; description: string }> = {}
	for (const locale of supportedLocales) {
		if (locale === video.snippet?.defaultLanguage) continue
		localizations[locale] = {
			title: getNewTitle(locale, video),
			description: getDescription(locale, video),
		}
	}
	return localizations
}
