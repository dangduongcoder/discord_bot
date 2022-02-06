const {createServer} = require("http")

module.exports = function fakesv () {
    createServer((req, res) => {
        res.write("citnut bot lmao")
        res.end()
    }).listen(process.env.PORT || 80)
}