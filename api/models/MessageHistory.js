const mongoose = require("mongoose");

//Mock schema for message history
const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        messageHistory: {
            type: Map,
            of: [String],
            //required: true
        }
    },
    {strict: false}
);

var msgHistory;
module.exports = msgHistory = mongoose.model("msgHistory", MessageSchema);
