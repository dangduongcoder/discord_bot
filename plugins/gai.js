module.exports = {
	command: ["girl", "gái"],
	author: "Citnut",
	description: "mlem",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		const res = await citnut.tools.getapi("girl",data,false)
		if (!res) return citnut.send("`"+"chưa có api này trong config"+"`", data)
		
		return data.reply({content:res,allowedMentions:citnut.allowedMentions})
		
	}
}