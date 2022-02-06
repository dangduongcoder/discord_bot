const { getParam } = citnut.tools
async function helpCmd (cmd) {
	let _msg = ``;
		_msg += `Lệnh: ${(cmd.command.length > 1) ? cmd.command.join(', ') : cmd.command[0]}\n`;
		_msg += `Tác giả: ${cmd.author}\n`;
		_msg += `> Mô tả: ${cmd.description}\n`;
		_msg += `> Sử dụng: ${citnut.config.prefix}${cmd.command[0]} ${cmd.guide}\n`
	return _msg
};
async function checkHelp (body, index) {
	let cache = [];
	let cmd = "";
	for (const i of index.data) {
		if (i.item.command.includes(body)) {
			cache.push(true); cmd = i.item
		} else { cache.push(false) }
	};
	let result = cache.includes(true) ? true : false;
	return { 
		result,
		cmd
	}
};

module.exports = {
	command: ["help", "h"],
	author: "Citnut",
	description: "hiển thị hướng dẫn",
	guide: "",
	allowListening: true,
	async listen (data,db) {
		let { content } = data
		if (content == "prefix") {
			return data.reply({embeds:[citnut.defaultemb("prefix là: "+citnut.config.prefix)],allowedMentions:citnut.allowedMentions})
		}
	},
	async call (data,db) {
		let { content } = data
		let body = await getParam(content)
		let index = await citnut.plugin()

		if (body) {
			let check = await checkHelp(body, index)
			let helpMsg = await helpCmd(check.cmd)

			if (check.result) {
				return data.reply({embeds:[citnut.defaultemb(helpMsg)],allowedMentions:citnut.allowedMentions})
			}
		} else {
			let msg = `Danh sách lệnh:\n`;
			let i = 0;
			for (const command of index.allcommand) {
				msg += `> ${i+1}. ${command}\n`;
				i++
			}
			return data.reply({embeds:[citnut.defaultemb(msg)],allowedMentions:citnut.allowedMentions})
			
		}
	}
}