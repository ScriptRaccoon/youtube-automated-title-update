export const defaultTemplate = "This video has {views} views and {likes} likes!" // Default

export const titleTemplates: Partial<Record<string, string>> = {
	"ar-SA": "هذا الفيديو لديه {views} مشاهدة و {likes} إعجاب!", // Arabic
	"bn-BD": "এই ভিডিওটি {views} বার দেখা হয়েছে এবং {likes} লাইক পেয়েছে!", // Bengali
	"de-DE": "Dieses Video wurde {views} mal gesehen und hat {likes} Likes!", // German
	"en-US": "This video has {views} views and {likes} likes!", // English
	"es-ES": "¡Este video tiene {views} vistas y {likes} me gusta!", // Spanish
	"fa-IR": "این ویدیو {views} بازدید و {likes} لایک دارد!", // Persian
	"fr-FR": 'Cette vidéo a été vue {views} fois et a reçu {likes} mentions "J\'aime" !', // French
	"hi-IN": "इस वीडियो को {views} बार देखा गया है और {likes} लाइक्स मिले हैं!", // Hindi
	"it-IT": "Questo video ha {views} visualizzazioni e {likes} mi piace!", // Italian
	"ja-JP": "このビデオは{views}回視聴され、{likes}件の「いいね」があります！", // Japanese
	"ko-KR": "이 비디오는 {views}회 조회되었으며 {likes}개의 좋아요를 받았습니다!", // Korean
	"mr-IN": "या व्हिडिओला {views} वेळा पाहिले गेले आहे आणि {likes} लाईक्स मिळाले आहेत!", // Marathi
	"nl-NL": "Deze video is {views} keer bekeken en heeft {likes} likes!", // Dutch
	"pt-BR": "Este vídeo tem {views} visualizações e {likes} curtidas!", // Portuguese
	"ru-RU": "Это видео посмотрели {views} раз и оно набрало {likes} лайков!", // Russian
	"ta-IN": "இந்த வீடியோவை {views} முறை பார்த்து {likes} விருப்பம் பெற்றுள்ளது!", // Tamil
	"te-IN": "ఈ వీడియోను {views} సార్లు చూశారు మరియు {likes} లైక్‌లు పొందాయి!", // Telugu
	"tr-TR": "Bu video {views} kez izlendi ve {likes} beğeni aldı!", // Turkish
	"ur-PK": "اس ویڈیو کو {views} بار دیکھا گیا ہے اور {likes} لائکس ملے ہیں!", // Urdu
	"vi-VN": "Video này có {views} lượt xem và {likes} lượt thích!", // Vietnamese
	"zh-CN": "这个视频已观看{views}次，获得了{likes}个赞！", // Chinese (China)
	"zh-TW": "這部影片已觀看{views}次，並獲得{likes}個讚", // Chinese (Taiwan)
} satisfies Record<`${Lowercase<string>}-${Uppercase<string>}`, string>

export const supportedLocales = Object.keys(titleTemplates)
