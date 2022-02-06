
module.exports = {
	command: ["cadao"],
	author: "Citnut",
	description: "ca dao VN",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		const res = await citnut.tools.getapi("cadao",data,false)
		if (!res) return citnut.send("`"+"chưa có api này trong config"+"`", data)
		const emb =  citnut.defaultemb(res)
		
		return data.reply({embeds:[emb], allowedMentions: citnut.allowedMentions})
	}
}