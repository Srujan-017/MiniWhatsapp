const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./models/chat");

const app = express();
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/whatsapp";
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// DB Connection
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// ROUTES

// INDEX
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// NEW FORM
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;

  let newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date()
  });

  await newChat.save();
  res.redirect("/chats");
});

// EDIT FORM
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);

  res.render("edit.ejs", { chat });
});

// UPDATE
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;

  await Chat.findByIdAndUpdate(id, { msg }, { runValidators: true });

  res.redirect("/chats");
});

// DELETE
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;

  await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
});

// ROOT
app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
