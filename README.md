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

Whether you're just starting out or training for a 10K, RunSync helps you structure your runs, track your progress visually, and stay motivated with smart guidance — all in a clean, accessible UI.

---

## ✨ Key Features

- **Strava Integration** – Sync your running data with Strava to see real-time activity.
- **Weekly Plan View** – Personalized 7-day overview with progress indicators and day highlights.
- **Visual Stats** – Distance, duration, and pace visualized using Chart.js.
- **AI-Powered Plan Generator** – Create custom plans based on your experience, distance goal, and number of weeks.
- **Theme Toggle** – Switch between light and dark mode, with adaptive logo.
- **Responsive UI** – Clean and accessible layout for both desktop and mobile.

---

## 🎯 Purpose

The goal of RunSync is to empower everyday runners with structure and insight — without complexity. Using real data, RunSync bridges the gap between training intuition and smart planning by combining user-centered design with AI-driven feedback.

---

## 🧱 Tech Stack

### Frontend

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **Chart.js**
- **Strava API**

### Tooling

- VS Code
- GitHub & Git
- Node.js
- NPM
- Vercel (hosting)

### AI / Backend

- OpenAI GPT (via `/api/generate-plan`)
- JSON plan structure
- Custom prompt design for plan creation

### Database

- **Prisma ORM** – type-safe database access
- **Neon** – serverless Postgres database platform

---

## ⚙️ Installation

### Prerequisites

- Node.js (LTS)
- NPM
- PostgreSQL (installed locally or via Docker)

### Setup

```bash
git clone https://github.com/cindybruikman/runsync-next.git
cd runsync-next
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of the project:

```env
OPENAI_API_KEY=sk-xxxxxxx

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key

STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret

DATABASE_URL=postgresql://postgres:runsync123@localhost:5432/runsync
```

> Replace `runsync123` with your actual PostgreSQL password if different.

---

## 🧭 Strava API Setup

To connect your app to the Strava API:

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Register a new application (or edit your existing one).
3. Use the following values:

| Field                       | Value                  |
|----------------------------|------------------------|
| **Website**                | `http://localhost:3000` |
| **Authorization Callback Domain** | `localhost`           |

> ⚠️ Only put `localhost` in the callback domain field — **no protocol or port**.

---

## 🗃️ Database Setup

1. Create a PostgreSQL database named `runsync`:
```bash
createdb runsync
```

2. Add your `DATABASE_URL` to `.env.local` as shown above.

3. Apply the Prisma schema:
```bash
npx prisma migrate dev --name init
```

4. If needed, regenerate the Prisma Client:
```bash
npx prisma generate
```

---

## 🛠 Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the production app     |
| `npm start`     | Start the production server  |
| `npm run lint`  | Lint the codebase            |

---

## 🤝 Contributing

Pull requests are welcome! For suggestions or improvements, feel free to open an issue or submit a PR.

---

## 📄 License

This project is licensed under the MIT License.
