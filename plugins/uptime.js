let {totalmem, freemem} = require("os")
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};

module.exports = {
	command: ["uptime", "upt"],
	author: "Citnut",
	description: "xem uptime của bot",
	guide: "",
	allowListening: false,
	async listen (data,db) {
	},
	async call (data,db) {
		let {get,write} = db
		let price = citnut.config.price.uptime

		if(get.user[data.author.id].money<price) {
			let thieutien = "bạn còn thiếu "+(price-get.user[data.author.id].money)+" 💵 để sử dụng lệnh này"
			return data.reply({embeds:[citnut.defaultemb(thieutien)],allowedMentions:citnut.allowedMentions})
		}else {
			get.user[data.author.id].money-=price
		}

		let prefix = citnut.config.prefix,
			time = process.uptime(),
			day = Math.floor(time/(60*60*24)),
			hours = Math.floor((time / (60 * 60)) - (day*24)),
			minutes = Math.floor((time % (60 * 60)) / 60),
			seconds = Math.floor(time % 60),
			timeStart = Date.now(),
			ram = (totalmem-freemem)/1024/1024,
			total = get.total
		try {
			let res = await citnut.tools.getapi("girl",data,false)

			let hoatdong = ""
			hoatdong+=(day>0)?`${day} ngày\n`:""
			hoatdong+=(hours>0)?`${hours} giờ\n`:""
			hoatdong+=(minutes>0)?`${minutes} phút\n`:""
			hoatdong+=seconds+" giây"
			get.total.user = Object.keys(get.user).length + 1
			write(get)
			const emb = citnut.defaultemb(`bot đã hoạt động được:\n${hoatdong}\n> Prefix: ${prefix}\n> Tổng số tin nhắn: ${total.msg}\n> Tổng số người dùng: ${total.user}\n> Ram đang sử dụng: ${ram.toFixed(1)}MB\n> Ping: ${Date.now() - timeStart}ms`)
	
			return data.reply({embeds:[!res?emb:emb.setThumbnail(res)],allowedMentions:citnut.allowedMentions})		
		}catch (e) {
			send("`"+`đã xảy ra lỗi`+"`", data);
			console.error(e)
		}
	}
}