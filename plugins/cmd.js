const {MessageActionRow, MessageButton} = citnut.Discord
const allowedMentions = citnut.allowedMentions

module.exports = {
	command: ["cmd"],
	author: "Citnut",
	description: "test",
	guide: "",
	allowListening: true,
    allowInteraction: true,
    async interaction (data) {
        let {customId, reply, member} = data
        if (!data.isButton()) return
        //console.log(data)
        const {get, write} = citnut.tools.db
        let {id} = data.user

        let avt = (data.user).displayAvatarURL({size: 1024, dynamic: true})

        switch (customId) {
            case "a":
                return data.reply({embeds:[citnut.defaultemb(`id: ${id}\n> số dư của bạn là ${get.user[id].money} 💵`).setThumbnail(avt)],allowedMentions})
            break
            case "b":
                await require("./work.js").workfunc(data,id)
            break
            case "c":
                await require("./crime.js").crimefunc(data,id)
            break
            default:
            break
        }
        //console.log(member.user)
        //return data.reply({content:"test",allowedMentions})
    },
	async listen (data,db) {
	},
	async call (data,db) {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('a')
				.setLabel('ví')
				.setStyle('PRIMARY'),
            new MessageButton()
				.setCustomId('b')
				.setLabel('work')
				.setStyle('PRIMARY'),
            new MessageButton()
				.setCustomId('c')
				.setLabel('crime')
				.setStyle('PRIMARY')
			)
        const embeds = [citnut.defaultemb("short cmd của bạn")]
		return data.reply({embeds, allowedMentions, components: [row]})
        
		//return data.reply({embeds:[emb], allowedMentions: citnut.allowedMentions})
	}
}