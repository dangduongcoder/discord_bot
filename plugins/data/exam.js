//nên require modules ở trên này

module.exports = {
	command: [""],//từ khoá của plugin
	author: "",//tên tác giả
	description: "",//mô tả
	guide: "",//tóm tắt hướng dẫn sử dụng
	allowListening: false,//luôn lắng nghe (noprefix)
	async listen (data,db) {
        //code (noprefix)
	},
	async call (data,db) {
		/*
		db là database của bot bao gồm get và write
		get db: db.get //>Object
		write db: db.write(data) //>data: Object
		thay đổi dữ liệu trong db:
		<code>
			let {get,write} = db
			get.abc = abc
			write(get)
		<code>
		*/
        //code khi được gọi đến
	}
}