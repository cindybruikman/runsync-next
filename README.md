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

## 🖼️ Screenshot

![Screenshot van de app](public/img/readme/readme.png)

---

## 🏃 Overview

**RunSync** is a modern running companion web app designed for recreational runners who want to train smarter using real performance data. The application connects with the Strava API and offers weekly planning, progress tracking, and AI-generated training plans tailored to your personal goals.

---

## ✨ Key Features

- **Strava Integration** – Sync your running data with Strava.
- **Weekly Plan View** – Personalized 7-day overview.
- **Visual Stats** – Distance, duration, and pace via Chart.js.
- **AI-Powered Plan Generator** – Custom training plans via OpenAI.
- **Theme Toggle** – Light/dark mode.
- **Responsive UI** – Desktop and mobile friendly.

---

## 🧱 Tech Stack

**Frontend:** Next.js, React, Tailwind, Chart.js, Strava API  
**Backend/AI:** Prisma ORM, OpenAI API, PostgreSQL (local or Neon)  
**Tooling:** VS Code, Node.js, NPM, GitHub, Vercel

---

## ⚙️ Installation

### Prerequisites

- Node.js (LTS)
- PostgreSQL

### Setup

```bash
git clone https://github.com/cindybruikman/runsync-next.git
cd runsync-next
npm install
```

### 1. Environment Variables

Create `.env.local` in the project root:

```env
DATABASE_URL=postgresql://postgres:runsync123@localhost:5432/runsync
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
OPENAI_API_KEY=your_openai_key
```

### 2. Create Database

```bash
createdb -U postgres runsync
```

If database exists already, skip this.

### 3. Apply Migrations

```bash
npx prisma migrate dev --name init
```

If you get a drift warning, reset:

```bash
npx prisma migrate reset
```

### 4. Start App

```bash
npm run dev
```

Then open: http://localhost:3000

---

## 🛠 Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server             |
| `npm run build` | Build for production         |
| `npm start`     | Start prod server            |
| `npm run lint`  | Lint the codebase            |

---

## 📄 License

This project is licensed under the MIT License.
