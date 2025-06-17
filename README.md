# RunSync

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)
![Strava API](https://img.shields.io/badge/API-Strava-orange?style=for-the-badge&logo=strava&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logologoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-0081F1?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 🏃 Overview

**RunSync** is a modern running companion web app designed for recreational runners who want to train smarter using real performance data. The app integrates with the Strava API and uses AI (OpenAI) to generate personalized training plans.

---
## 🖼️ ScreenshotAdd commentMore actions

![Screenshot van de app](public/img/readme/readme.png)

---

## 🔧 Complete Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/cindybruikman/runsync-next.git
cd runsync-next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL=postgresql://postgres:runsync123@localhost:5432/runsync
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
OPENAI_API_KEY=your_openai_key
```

> ⚠️ Replace all placeholders with your actual credentials. `.env.local` **must be in the root**.

---

### 4. Setup Strava API

1. Go to: https://www.strava.com/settings/api
2. Fill in:
   - **Application Name**: RunSync
   - **Authorization Callback Domain**: `localhost`
3. After saving, use:
   - **Client ID** → `STRAVA_CLIENT_ID`
   - **Client Secret** → `STRAVA_CLIENT_SECRET`

---

### 5. Create Local Database

Ensure PostgreSQL is running locally:

```bash
createdb -U postgres runsync
```

> Or use: `sudo -u postgres createdb runsync` if needed.

---

### 6. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

If you see drift errors:

```bash
npx prisma migrate reset
```

---

### 7. Start the App

```bash
npm run dev
```

Then go to [http://localhost:3000](http://localhost:3000)

---

### 8. Login and Use

- Click **Login with Strava**
- Approve app access
- Generate your training plan
- Refresh to see your saved plan

---

## 🛠 Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server             |
| `npm run build` | Build for production         |
| `npm start`     | Start production server      |
| `npm run lint`  | Lint the codebase            |

---

## 📄 License

MIT License
