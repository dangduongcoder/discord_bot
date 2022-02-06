const { getParam } = citnut.tools;
const fetch = require("node-fetch");

module.exports = {
	command: ["say", "voice"],
	author: "Citnut",
	description: "giọng nói google",
	guide: "<param>",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		let { content } = data;

		try {
			let text = await getParam(content);
			let url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi_VN&client=tw-ob`;
			let r = await fetch(url);
			let attachment = await r.buffer();
			return citnut.send({
				files: [{
					name: "tts.mp3",
					attachment
				}]
			}, data)
		} catch (e) { console.error(e); return citnut.send(`đã xảy ra lỗi`, data) }
	}
}