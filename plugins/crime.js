const {round,random} = citnut.tools
module.exports = {
	command: ["crime"],
	author: "Citnut",
	description: "kiếm tiền :>",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async crimefunc (data,id) {
		const {crime,cooldown} = await citnut.tools.getapi("eco",data,false)
        let {get,write} =  citnut.tools.db
        const time = new Date
        const rate = [true,false]
        //let id = (!data.author)?data.member.user.id:data.author.id
        if (time.getTime() < get.eco.crime[id] + (cooldown.crime * 1000)) {
            let cd = (get.eco.crime[id] + (cooldown.crime * 1000)) - time.getTime()
            data.reply({embeds:[citnut.defaultemb(`vui lòng đợi ${round((cd/1000), 0)} giây để tiếp tục`)],allowedMentions:citnut.allowedMentions})
        }else {
            get.eco.crime[id] = time.getTime()
            if(rate[round(random(0,1),0)]) {
                let payout = round(random(crime.min, crime.max), 0)
                get.user[id].money += payout
                await write(get)
                await data.reply({embeds:[citnut.defaultemb(`| +${payout} 💵 | ví của bạn có: ${get.user[id].money} 💵`)],allowedMentions:citnut.allowedMentions})
            }else {
                let payout = round(random(crime.lose.min, crime.lose.max), 0)
                get.user[id].money -= payout
                await write(get)
                await data.reply({embeds:[citnut.defaultemb(`| -${payout} 💵 | ví của bạn có: ${get.user[id].money} 💵`)],allowedMentions:citnut.allowedMentions})
            }
        }
	},
    async call (data, db) {
        return await this.crimefunc(data,data.author.id)
    }
}