module.exports = {
	command: ["source", "src"],
	author: "Citnut",
	description: "xem srouce gốc của bot",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		try {
			data.reply({content:"https://github.com/Citnut/demoProject",allowedMentions:citnut.allowedMentions})		
		} catch {
			citnut.send("https://github.com/Citnut/demoProject",data)
		}
	}
}