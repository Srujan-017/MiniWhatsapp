const mongoose = require("mongoose");
const Chat = require("./models/chat");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main();

let allChats = [
  {
    from: "neha",
    to: "priya",
    msg: "send me your exam sheets",
    created_at: new Date()
  },
  {
    from: "rohit",
    to: "mohit",
    msg: "teach me JS callbacks",
    created_at: new Date()
  }
];

Chat.insertMany(allChats).then(() => {
  console.log("data inserted");
});