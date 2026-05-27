require("dotenv").config({ quiet: true });

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./models/chat");

const app = express();

// ─── Config ────────────────────────────────────────────────────────────────────
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

if (!MONGO_URL) {
  console.error(
    "FATAL: MONGO_URL environment variable is not set.\n" +
    "Copy .env.example to .env and fill in your MongoDB connection string."
  );
  process.exit(1);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const mongoStates = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

// Sanitise a plain string — strip leading/trailing whitespace
const sanitise = (str) =>
  typeof str === "string" ? str.trim() : "";

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Basic security headers (no extra dependency needed)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// ─── Database ──────────────────────────────────────────────────────────────────
async function connectDB() {
  await mongoose.connect(MONGO_URL, {
    serverSelectionTimeoutMS: 10000,
  });
}

connectDB()
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    // Keep the process alive — Render / Atlas transient errors should not crash
  });

// ─── Routes ────────────────────────────────────────────────────────────────────

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    app: "MiniWhatsapp",
    mongoState: mongoStates[mongoose.connection.readyState],
    nodeVersion: process.version,
    uptime: process.uptime(),
  });
});

// INDEX
app.get(
  "/chats",
  asyncHandler(async (req, res) => {
    const chats = await Chat.find().sort({ created_at: -1 });
    res.render("index.ejs", { chats });
  })
);

// NEW FORM
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// CREATE
app.post(
  "/chats",
  asyncHandler(async (req, res) => {
    const from = sanitise(req.body.from);
    const to   = sanitise(req.body.to);
    const msg  = sanitise(req.body.msg);

    // Server-side validation (mirrors Mongoose schema constraints)
    if (!from || !to || !msg) {
      return res.status(400).send("All fields (sender, receiver, message) are required.");
    }
    if (msg.length > 50) {
      return res.status(400).send("Message must be 50 characters or fewer.");
    }

    const newChat = new Chat({ from, to, msg, created_at: new Date() });
    await newChat.save();
    res.redirect("/chats");
  })
);

// EDIT FORM
app.get(
  "/chats/:id/edit",
  asyncHandler(async (req, res) => {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).send("Chat not found.");
    res.render("edit.ejs", { chat });
  })
);

// UPDATE
app.put(
  "/chats/:id",
  asyncHandler(async (req, res) => {
    const msg = sanitise(req.body.msg);

    if (!msg) {
      return res.status(400).send("Message cannot be empty.");
    }
    if (msg.length > 50) {
      return res.status(400).send("Message must be 50 characters or fewer.");
    }

    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { msg },
      { runValidators: true, new: true }
    );
    if (!chat) return res.status(404).send("Chat not found.");
    res.redirect("/chats");
  })
);

// DELETE
app.delete(
  "/chats/:id",
  asyncHandler(async (req, res) => {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) return res.status(404).send("Chat not found.");
    res.redirect("/chats");
  })
);

// ROOT
app.get("/", (req, res) => res.redirect("/chats"));

// 404
app.use((req, res) => {
  res.status(404).send("Page not found.");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  // Never leak stack traces to the browser in production
  const isDev = process.env.NODE_ENV !== "production";
  res.status(500).send(
    isDev
      ? `Server error: ${err.message}`
      : "Something went wrong. Please try again later."
  );
});

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
