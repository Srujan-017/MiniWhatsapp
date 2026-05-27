# MiniWhatsapp

MiniWhatsapp is a clean, lightweight chat-message CRUD application built with Node.js, Express, MongoDB, Mongoose, and EJS. It lets users create, view, edit, and delete short chat messages through a polished responsive interface.

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

4. Start MongoDB locally.

If MongoDB is installed as a service, make sure it is running. The app currently connects to:

```txt
mongodb://127.0.0.1:27017/whatsapp
```

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

## Deployment Ready Setup

This project already includes the required deployment setup:

- `npm start` script for production
- `npm run dev` script for development
- `process.env.PORT` support for Render
- `process.env.MONGO_URL` support for MongoDB Atlas
- `.env.example` file for environment variable reference

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

If your remote is already added, use:

```bash
git push -u origin main
```

### 2. Add A Start Script

Render needs a production start command. This project already includes:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### 3. Use Environment Variables

For deployment, do not keep the MongoDB URL and port hardcoded. This project already uses environment variables in `index.js`:

```js
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/whatsapp";

async function main() {
  await mongoose.connect(MONGO_URL);
}
```

Update the server port in `index.js`:

```js
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
```

### 4. Create A MongoDB Atlas Database

Render cannot use your local MongoDB database. You need MongoDB Atlas:

1. Go to MongoDB Atlas.
2. Create a free cluster.
3. Create a database user.
4. Allow network access.
5. Copy your MongoDB connection string.
6. Replace the password and database name in the connection string.

Your connection string will look like this:

```txt
mongodb+srv://username:password@cluster-name.mongodb.net/whatsapp
```

### 5. Values You Need Before Deploying

You need these values while creating the Render service:

| Value | Where To Get It | Where To Paste It |
| --- | --- | --- |
| GitHub Repository URL | GitHub repository page | Render Web Service repository selection |
| Build Command | Use `npm install` | Render Build Command field |
| Start Command | Use `npm start` | Render Start Command field |
| `MONGO_URL` | MongoDB Atlas connection string | Render Environment Variables |
| Live App Path | Render service URL plus `/chats` | Browser address bar |

### 6. Create A Render Web Service

1. Go to Render.
2. Click **New +**.
3. Select **Web Service**.
4. Connect your GitHub repository.
5. Select the MiniWhatsapp repository.
6. Set the environment to **Node**.
7. Use this build command:

```bash
npm install
```

8. Use this start command:

```bash
npm start
```

### 7. Add Environment Variables On Render

In Render, open the service settings and add:

```txt
MONGO_URL=your_mongodb_atlas_connection_string
```

Render automatically provides the `PORT` variable, so you do not need to add it manually.

### 8. Deploy

Click **Deploy Web Service**. After the deployment finishes, open:

```txt
https://your-render-service-name.onrender.com/chats
```

## Important Deployment Notes

- Keep `node_modules` out of GitHub.
- Keep `.env` files out of GitHub.
- Use MongoDB Atlas for production.
- Make sure `package.json` has a valid `start` script.
- Make sure `index.js` uses `process.env.PORT`.
- Make sure `index.js` uses `process.env.MONGO_URL`.

## Author

Built by Srujan.
