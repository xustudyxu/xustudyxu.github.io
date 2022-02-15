
const path = require("path");
module.exports = (options, context) => ({
    define() {
        return {
            labelText: options.labelText,
            size: options.size,
            channel: options.channel
        }
    },
    clientRootMixin: path.resolve(__dirname, "clientRootMixin.js")
})