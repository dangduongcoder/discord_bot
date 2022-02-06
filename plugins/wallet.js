
module.exports = {
	command: ["wallet"],
	author: "Citnut",
	description: "ví của bạn",
	guide: "",
	allowListening: true,
	async listen (data,db) {
        if (data.author.bot) return
        let {get,write} = db
        if(data.content){
            get.total.msg+=1
            write(get)
        }
        if (!get.eco) {
            get.eco = {}
            write(get)
        }
        if (!get.eco.work) {
            get.eco.work = {}
            write(get)
        }
        if (!get.eco.work[data.author.id]) {
            get.eco.work[data.author.id] = 0
            write(get)
        }
        if (!get.eco.crime) {
            get.eco.crime = {}
            write(get)
        }
        if(!get.eco.crime[data.author.id]) {
            get.eco.crime[data.author.id] = 0
            write(get)
        }
	},
	async call (data,db) {
        let {get} = db
        let tag = citnut.tools.getParam(data.content)
        let avt = (data.mentions.users.first() || data.author).displayAvatarURL({size: 1024, dynamic: true})
        if(tag.includes("@")) {
            let id = tag.slice(2,-1)
            if(!get.user[id]) return data.reply({embeds:[citnut.defaultemb(`id: ${data.author.id}\n> chưa có thông tin về người dùng này`)],allowedMentions:citnut.allowedMentions})
            return data.reply({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của người dùng này là ${get.user[id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})

        }else {
            return data.reply({embeds:[citnut.defaultemb(`id: ${data.author.id}\n> số dư của bạn là ${get.user[data.author.id].money} 💵`).setThumbnail(avt)],allowedMentions:citnut.allowedMentions})
	    }
    }
}