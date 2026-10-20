# Progression

Hello World application laid out as an API, a queue worker, a cron process, and a web app.

## Stack

- API: NestJS 11, JavaScript, Babel
- UI: React 19, TypeScript, Vite
- Database: MySQL 9 (Docker Compose)
- Queue: Redis 7 and BullMQ

There is no root `package.json`. Install dependencies inside `apps/api` and `apps/web`.

## Setup

```bash
docker compose up -d
cp .env.example .env

cd apps/api
npm install
npm run migrate
npm run seed
npm run dev
```

In a second terminal:

```bash
cd apps/web
npm install
npm run dev
```

| Check | URL |
|---|---|
| API health | http://localhost:6000/api/health |
| Hello | http://localhost:6000/api/hello |
| Web | http://localhost:5174 |

Host ports 3306, 6379, and 5173 were already in use on this machine, so MySQL is published on 3307, Redis on 6380, and the web app on 5174. The API stays on 6000.

Queue and cron, when you add background work:

```bash
cd apps/api
npm run queue-dev
npm run cron-dev
```

The layout and code rules live in [docs/setup-blueprint.md](docs/setup-blueprint.md).
