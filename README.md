# AI Resume & CV Builder

A full-stack Resume & CV builder with bilingual support (English / Bengali), ATS scanner, AI professional summary generator, style customization, and high-fidelity print/export options.

---

## 🚀 Quick Deployment Options

### 1. Instant Deployment via Google AI Studio
Your app is already deployed and accessible through the **Shared App URL**:
- **Shared App URL**: Check the top bar in AI Studio or use the share link provided in your session.
- Anyone with the link can use the CV Builder immediately without extra setup.

---

### 2. Deploy to Render / Railway / Fly.io (Recommended for Node.js Full-Stack)

Since this app has an Express backend (`server.ts`) for Gemini AI API proxying and static file serving:

#### **Render.com**
1. Push your code to a GitHub repository.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New Web Service**.
3. Connect your repository.
4. Set the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key (get from [Google AI Studio](https://aistudio.google.com/))
   - `NODE_ENV`: `production`
6. Click **Deploy Web Service**.

#### **Railway.app**
1. Create a new project on [Railway.app](https://railway.app/).
2. Select **Deploy from GitHub repo**.
3. Add the environment variable:
   - `GEMINI_API_KEY`: Your Google Gemini API Key
4. Railway will automatically detect the build and start scripts in `package.json` (or use the provided `Dockerfile`).

---

### 3. Deploy with Docker / Google Cloud Run

A production-ready `Dockerfile` is included in this repository.

#### **Deploy to Google Cloud Run:**
```bash
# 1. Build and push container image using Google Cloud Build
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/cv-builder

# 2. Deploy to Cloud Run
gcloud run deploy cv-builder \
  --image gcr.io/YOUR_PROJECT_ID/cv-builder \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_KEY
```

#### **Run locally or on a VPS with Docker:**
```bash
docker build -t cv-builder .
docker run -p 3000:3000 -e GEMINI_API_KEY="YOUR_KEY" cv-builder
```

---

### 4. Deploy to a Linux VPS (Ubuntu / Debian) with PM2 & Nginx

1. **Clone & Install**:
   ```bash
   git clone <YOUR_REPO_URL>
   cd <REPO_FOLDER>
   npm install
   npm run build
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env and enter your GEMINI_API_KEY
   ```

3. **Start with PM2**:
   ```bash
   npm install -g pm2
   pm2 start dist/server.cjs --name "cv-builder"
   pm2 startup
   pm2 save
   ```

4. **Nginx Reverse Proxy**:
   Point Nginx `proxy_pass http://localhost:3000;` to serve on port 80/443 with your custom domain and SSL (Certbot).

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for AI summary & ATS analysis | Yes (for AI features) |
| `PORT` | Server listening port (default: 3000) | No |
| `NODE_ENV` | Set to `production` in live environments | Recommended |
