const mongoose = require("mongoose");

//Mock schema for message history
const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        messageHistory: [{
            type: String
        }]
    },
    {strict: false}
);

var msgHistory;
module.exports = msgHistory = mongoose.model("msgHistory", MessageSchema);
