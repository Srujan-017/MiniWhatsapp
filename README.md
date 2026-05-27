# MiniWhatsapp

MiniWhatsapp is a clean, lightweight chat-message CRUD application built with Node.js, Express, MongoDB, Mongoose, and EJS. It lets users create, view, edit, and delete short chat messages through a polished responsive interface.

## 🔴 Live Demo

> **[https://miniwhatsapp-1ue3.onrender.com/chats](https://miniwhatsapp-1ue3.onrender.com/chats)**

Deployed on **Render** · Backed by **MongoDB Atlas** · Always on

---

## Screenshot

![MiniWhatsapp Dashboard](public/screenshot.png)

## Features

- Create new chat messages with sender, receiver, and message text
- View all conversations in a responsive chat dashboard
- Edit existing messages
- Delete chats
- MongoDB database integration using Mongoose
- EJS server-side rendered views
- Modern responsive UI with clean cards, forms, and mobile-friendly layout
- Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- Server-side input validation and sanitisation
- Crashes on missing `MONGO_URL` rather than exposing a default connection

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- HTML5
- CSS3
- Method Override

## Project Structure

```txt
Miniwhatsapp/
  models/
    chat.js
  public/
    style.css
  views/
    edit.ejs
    index.ejs
    new.ejs
  .env.example        ← safe template, commit this
  .gitignore          ← .env is excluded
  index.js
  init.js
  package.json
  README.md
```

## Prerequisites

Before running the project, install these tools:

- Node.js
- npm
- MongoDB Community Server, or a MongoDB Atlas database
- Git

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/MiniWhatsapp.git
```

2. Move into the project folder:

```bash
cd MiniWhatsapp
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

```bash
cp .env.example .env
```

Then open `.env` and fill in your MongoDB connection string:

```txt
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/whatsapp?retryWrites=true&w=majority
PORT=8080
```

> **Never commit `.env` to version control.** It is already excluded via `.gitignore`.

5. Optional: add sample chats:

```bash
node init.js
```

6. Start the server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

7. Open the app in your browser:

```txt
http://localhost:8080/chats
```

## Main Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/chats` | Show all chats |
| GET | `/chats/new` | Show create chat form |
| POST | `/chats` | Create a new chat |
| GET | `/chats/:id/edit` | Show edit chat form |
| PUT | `/chats/:id` | Update a chat message |
| DELETE | `/chats/:id` | Delete a chat |
| GET | `/health` | App and DB status check |

## Security

The following measures are in place:

- `.env` is excluded from version control via `.gitignore`
- A `.env.example` template is provided with no real credentials
- `MONGO_URL` **must** be set as an environment variable; the app refuses to start without it — no hardcoded fallback connection string
- Server-side input validation and whitespace sanitisation on all write routes
- HTTP security headers set on every response: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- Stack traces are never sent to the browser in production (`NODE_ENV=production`)
- 404 handler for unknown routes
- Proper `findById` null checks with 404 responses

### Removing `.env` from Git History

If `.env` was previously committed, remove it from history with:

```bash
# Remove the file from tracking (keep it locally)
git rm --cached .env
git commit -m "Remove .env from tracking"
git push

# To scrub it from all history (use with caution on shared repos)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

After removing it, **rotate your MongoDB Atlas password immediately** since the credentials were exposed in the git history.

## Deployment Ready Setup

This project already includes the required deployment setup:

- `npm start` script for production
- `npm run dev` script for development
- `process.env.PORT` support for Render
- `process.env.MONGO_URL` support for MongoDB Atlas

## Deployment Steps For Render

To deploy this project professionally, complete these steps.

### 1. Push The Project To GitHub

Create a GitHub repository and push the project:

```bash
git add .
git commit -m "Add MiniWhatsapp project"
git branch -M main
git remote add origin https://github.com/your-username/MiniWhatsapp.git
git push -u origin main
```

### 2. Create A MongoDB Atlas Database

Render cannot use your local MongoDB database. You need MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free cluster.
3. Create a database user.
4. Allow network access (allow all IPs: `0.0.0.0/0` for Render).
5. Copy your MongoDB connection string.

### 3. Values You Need Before Deploying

| Value | Where To Get It | Where To Paste It |
| --- | --- | --- |
| GitHub Repository URL | GitHub repository page | Render Web Service repository selection |
| Build Command | Use `npm install` | Render Build Command field |
| Start Command | Use `npm start` | Render Start Command field |
| `MONGO_URL` | MongoDB Atlas connection string | Render Environment Variables |

### 4. Create A Render Web Service

1. Go to [Render](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set environment to **Node**.
5. Build command: `npm install`
6. Start command: `npm start`

### 5. Add Environment Variables On Render

In Render → Environment, add:

```txt
MONGO_URL=your_mongodb_atlas_connection_string
NODE_ENV=production
```

Render automatically provides `PORT`.

### 6. Deploy

Click **Deploy Web Service**. Once finished, open:

```txt
https://miniwhatsapp-7v6z.onrender.com/chats
```

## Important Security Notes

- Keep `node_modules` out of GitHub (covered by `.gitignore`)
- Keep `.env` out of GitHub (covered by `.gitignore`)
- Commit `.env.example` instead — it documents required variables without real values
- Use MongoDB Atlas for production
- Rotate credentials immediately if they were ever committed to a public repo
- Set `NODE_ENV=production` on Render to suppress stack traces in error responses

## Author

Built by Srujan.
