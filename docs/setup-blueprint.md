# Setup blueprint

Instructions for setting up a new application the same way this repository is set up. Copy this file into the new project and follow it. Keep the layout, processes, and code rules. Replace product names, database name, ports only if they collide, and feature modules with the new app’s domain.

This repository is an internal knowledge assistant. That product is not part of the setup. Do not copy RAG, embeddings, documents, or chat into the new app unless the new product needs them.

## Stack

| Piece | Choice | Where |
|---|---|---|
| API | NestJS 11 in **JavaScript** (Babel, not TypeScript) | `apps/api` |
| UI | React 19 + TypeScript + Vite | `apps/web` |
| ORM | Sequelize 6 + sequelize-typescript | `apps/api/src/models` |
| Migrations | sequelize-cli, CommonJS | `apps/api/migrations` |
| Database | MySQL 9 via Docker Compose | repo root `docker-compose.yml` |
| Queue | Redis 7 + BullMQ | API queue process |
| Auth | JWT (`@nestjs/jwt`), Bearer token | `apps/api/src/guards` |
| Validation | class-validator DTOs, not Nest pipes | `dto/` + `ValidateRequestGuard` |
| Env | one `.env` at the **repository root** | loaded by the API and sequelize-cli |

Node.js 20 or newer. There is no root `package.json`. Each app installs its own dependencies.

## Architecture

Three processes. Each boots its own Nest application. They share models, config, and helpers. They do not share a running process.

```
Browser  →  Vite (apps/web :5173)
              proxies /api  →  HTTP API (apps/api :6000, prefix /api)
                                    │
                                    ├─ MySQL (users and domain tables)
                                    ├─ Redis (BullMQ)
                                    └─ enqueues jobs
                                           │
                                           ▼
                                    Queue worker (no HTTP)
                                    Cron process (no HTTP, only schedules work)
```

| Process | Dev command | Entry file | Boot file | What it runs |
|---|---|---|---|---|
| HTTP API | `npm run dev` | `index.js` | `src/main.js` | `AppModule` |
| Cron | `npm run cron-dev` | `cron.index.js` | `src/cron.js` | `CronModule` |
| Queue worker | `npm run queue-dev` | `queue.index.js` | `src/queue.js` | `QueueModule` |

The three entry files only load Babel, then the boot file:

```js
require('@babel/register')
require('./src/main')
```

`cron.index.js` requires `./src/cron`. `queue.index.js` requires `./src/queue`.

HTTP bootstrap (`src/main.js`):

- `app.setGlobalPrefix('api')` so `@Controller('categories')` is `/api/categories`.
- CORS origin `http://localhost:5173`.
- Listen on `process.env.PORT` or `6000`.

`AppModule` imports the feature-module array from `src/modules/index.js`, registers `JwtModule`, and registers `AllExceptionsFilter` as `APP_FILTER`. It does not list feature modules one by one.

The web app calls `/api/...`. Vite proxies that prefix to `http://localhost:6000`, so the browser stays on port 5173.

## Repository layout

```
<repo>/
  .env                      gitignored, copied from .env.example
  .env.example              placeholders only
  .gitignore
  docker-compose.yml        MySQL 9 + Redis 7
  README.md
  docs/
    setup-blueprint.md      this file
  apps/
    api/                    NestJS JavaScript API
    web/                    React + TypeScript UI
```

### API tree

```
apps/api/
  index.js                  HTTP entry
  cron.index.js             cron entry
  queue.index.js            queue entry
  package.json
  nest-cli.json             { "language": "js" }
  jsconfig.json             experimentalDecorators
  .babelrc                  preset-env (node 20), legacy decorators, class properties
  .eslintrc.js
  .prettierrc
  .sequelizerc              sequelize-cli → src/config/database.js
  migrations/               CommonJS up/down
  seeders/                  CommonJS
  src/
    main.js                 HTTP bootstrap
    app.module.js           root module
    cron.js                 cron bootstrap
    queue.js                queue bootstrap
    config/
      database.js           CommonJS, read by sequelize-cli
      redis.js
      bull.js
      jwt.js
      uploads.js
    modules/
      index.js              array of feature modules
      <feature>/
        <feature>.module.js
        <feature>.controller.js
        <action>.service.js
        dto/
          <action>.dto.js
    models/
      index.js              Sequelize instance + models array
      AbstractModel.js
      <ModelName>.js        one table, default export
    guards/
    decorators/
    middlewares/            exception filter
    exceptions/             AppValidationError
    helpers/                plain functions, default export
    lang/en/                errors.js, messages.js, validations.js
    queues/
      queue.module.js
      <job-name>.processor.js
    crons/
      cron.module.js
      <job-name>.cron.service.js
    scripts/                one-off babel-node scripts
    templates/
```

Feature code lives under `src/modules/<feature>/`. Shared code does not go inside a feature folder.

### Web tree

```
apps/web/
  index.html
  package.json              "type": "module"
  tsconfig.json
  vite.config.ts            port 5173, proxy /api → :6000
  src/
    main.tsx
    App.tsx                 page state + session
    index.css
    vite-env.d.ts
    lib/api.ts              fetch wrappers and session in localStorage
    components/             shell, top bar, icons
    pages/                  one screen per file
    features/<area>/        pieces used by a page
```

The UI has no router library in this setup. `App.tsx` keeps the current page in state and renders one page component. The session (JWT + user) is stored in `localStorage` and sent as `Authorization: Bearer <token>`.

## Installation

From a clean machine, with Docker available:

```bash
# 1. Data services
docker compose up -d

# 2. Environment
cp .env.example .env
# edit DB_USER, DB_PASSWORD, DB_NAME, CLIENT_SECRET

# 3. API
cd apps/api
npm install
npm run migrate
npm run seed
npm run dev

# 4. Web (second terminal)
cd apps/web
npm install
npm run dev
```

| Check | URL |
|---|---|
| API health | http://localhost:6000/api/health → `{ "status": "ok" }` |
| Web | http://localhost:5173 |

Queue and cron, when the app has background work:

```bash
cd apps/api
npm run queue-dev
npm run cron-dev
```

### Docker Compose

```yaml
services:
  mysql:
    image: mysql:9
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: rag
      MYSQL_DATABASE: rag
      MYSQL_USER: rag
      MYSQL_PASSWORD: rag
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mysql_data:
```

Change `rag` to the new app’s database name in Compose and in `.env` together.

### Environment

One file at the repo root. The API loads it with `path.resolve(__dirname, '../../../.env')` from `src/`. `src/config/database.js` loads it with `path.resolve(__dirname, '../../../../.env')` because that file is CommonJS and sequelize-cli runs with cwd `apps/api`.

```
PORT=6000
CLIENT_SECRET=change-me

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=rag
DB_PASSWORD=rag
DB_NAME=rag

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
BULL_PREFIX=rag
```

`CLIENT_SECRET` signs and verifies JWTs. `.env` is gitignored. `.env.example` is committed and contains placeholders only.

### API scripts

| Script | Command |
|---|---|
| Dev API | `eslint src --fix && babel-node index.js` |
| Dev cron | `eslint src --fix && babel-node cron.index.js` |
| Dev queue | `eslint src --fix && babel-node queue.index.js` |
| Production build | `babel src --out-dir dist --copy-files` |
| Production start | `node dist/main.js` |
| Migrate | `sequelize-cli db:migrate` |
| Seed | `sequelize-cli db:seed:all` |
| Undo last migration | `sequelize-cli db:migrate:undo` |
| Lint | `eslint src --fix` |
| Format | `prettier --write "src/**/*.js"` |

### API dependencies to install

Runtime: `@nestjs/common`, `@nestjs/core`, `@nestjs/jwt`, `@nestjs/platform-express`, `bcrypt`, `class-validator`, `dotenv`, `mysql2`, `reflect-metadata`, `rxjs`, `sequelize`, `sequelize-typescript`. Add `@nestjs/bullmq`, `bullmq`, and `@nestjs/schedule` when the app uses queues or cron.

Dev: `@babel/core`, `@babel/eslint-parser`, `@babel/node`, `@babel/plugin-proposal-class-properties`, `@babel/plugin-proposal-decorators`, `@babel/preset-env`, `@babel/register`, `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier`, `sequelize-cli`.

### Babel

```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "20" } }]],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
```

`nest-cli.json` is `{ "language": "js" }`. Do not add `.ts` files under `apps/api`.

### Web dependencies

Runtime: `react`, `react-dom`. Dev: `typescript`, `vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`.

```ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:6000' },
  },
})
```

Scripts: `dev` = `vite`, `build` = `tsc --noEmit && vite build`.

### Git ignore

```
node_modules/
dist/
.env
.env.*
!.env.example
*.log
.DS_Store
coverage/
.vite/
apps/api/dist/
apps/web/dist/
apps/api/uploads/
```

## How a feature is built

One folder per resource. The folder name is kebab-case and matches the URL prefix.

```
src/modules/categories/
  categories.module.js
  categories.controller.js
  get.service.js
  view.service.js
  create.service.js
  update.service.js
  dto/
    create.dto.js
    update.dto.js
```

Register the module in `src/modules/index.js`. `AppModule` spreads that array. Do not import feature modules inside `app.module.js`.

The module lists the controller and the services. Services are still constructed with `new` inside the controller. Do not switch a feature to Nest constructor injection.

```js
@Module({
    controllers: [CategoriesController],
    providers: [GetService, ViewService, CreateService, UpdateService],
})
export class CategoriesModule {}
```

### Naming

| Kind | File | Class |
|---|---|---|
| Module | `categories.module.js` | `CategoriesModule` |
| Controller | `categories.controller.js` | `CategoriesController` |
| Service | `get.service.js`, `create.service.js` | `GetService`, `CreateService` |
| DTO | `dto/create.dto.js` | `CreateDto` |
| Guard | `jwt-auth.guard.js` | `AuthGuard` |
| Decorator | `check-scope.decorator.js` | `CheckScope` |
| Model | `Category.js` | `Category` (default export) |
| Queue | `send-email.processor.js` | `SendEmailProcessor` |
| Cron | `renew-subscription.cron.service.js` | `RenewSubscriptionCronService` |
| Migration | `YYYYMMDDHHMMSS-create-<table>-table.js` | CommonJS `up` / `down` |
| Seeder | `YYYYMMDDHHMMSS-<description>-seed.js` | CommonJS |

- Files and folders: kebab-case. Classes: PascalCase.
- One action per service file. Methods match the file: `get`, `view`, `create`, `update`, `remove`.
- Database tables: snake_case plural (`carrier_profiles`). Model file: PascalCase singular (`CarrierProfile.js`).
- Queue names in `@Processor('queueName')` and `new Queue('queueName', bullConfig)` are camelCase and must match.

### Controller

```js
@Controller('categories')
@Dependencies()
export class CategoriesController {
    constructor() {
        this.getService = new GetService()
        this.createService = new CreateService()
    }

    @Post()
    @CheckScope(['admin-access'])
    @ValidateRequest(CreateDto)
    @UseGuards(AuthGuard, CheckScopeGuard, ValidateRequestGuard)
    @Bind(Req(), Res())
    async create(request, response) {
        const data = await this.createService.create(request)
        return response.json({ data })
    }
}
```

- Pass the Express `request` into the service. The service reads `request.user`, `request.body`, `request.query`, `request.params`.
- Return `response.json({ data })`. Do not return the object and let Nest serialize it.
- Decorator order: HTTP verb, `@CheckScope`, `@ValidateRequest`, `@UseGuards`, `@Bind(Req(), Res())`.
- Guard order: `AuthGuard`, then `CheckScopeGuard`, then `ValidateRequestGuard`.
- `@CheckScope([...])` passes if the token has any listed scope. A `super-admin` scope skips the check.
- Public routes omit `AuthGuard` and `CheckScope`.
- Static paths (`GET options`) stay above param paths (`GET :id`).

### Service

```js
@Injectable()
export class CreateService {
    async create(request) {
        const { body, user } = request
        return createdRow
    }
}
```

- `@Injectable()` on the class. Empty constructor is fine. Do not inject models through Nest.
- Import models as default imports from `src/models/<Model>`.
- Throw `AppValidationError` for business failures. Second argument is the HTTP status (`404`, `403`, `422`).
- User-facing strings go through `translate('errors' | 'messages' | 'validations', key)`.
- Which rows this user may see is decided in the service. Guards only check that the token and scope exist.

### DTO

DTOs are `class-validator` classes. They are not Nest pipes.

```js
export class CreateDto {
    @IsString(createValidationMessage({ key: 'string' }))
    @IsNotEmpty(createValidationMessage({ key: 'required' }))
    name
}
```

- Class properties have no TypeScript types.
- `@ValidateRequest(CreateDto)` plus `ValidateRequestGuard` copies matching keys from `body`, `params`, and `query` onto a DTO instance and runs `class-validator`.
- `page`, `limit`, `order`, `orderBy`, and `attributes` are not validated by that middleware. Do not require them on the DTO.

### Models

- One Sequelize model per file, `export default class`, extending `AbstractModel`.
- Decorators from `sequelize-typescript`: `@Table`, `@Column`, `@PrimaryKey`, `@AutoIncrement`, `@AllowNull`, associations.
- `@Table({ tableName: 'categories', timestamps: true })`.
- Register every model in the `models` array in `src/models/index.js`.
- `src/config/database.js` is CommonJS (`module.exports`) because sequelize-cli loads it. App code imports it as ESM. Do not convert it to `export`.

### Migrations and seeders

- CommonJS only: `'use strict'` and `module.exports = { up, down }`.
- Filename: `YYYYMMDDHHMMSS-kebab-description.js`.
- Create or alter tables here. Do not call `sync()` in application code.
- Integer primary keys are `Sequelize.INTEGER.UNSIGNED`.

`.sequelizerc`:

```js
const path = require('path')

module.exports = {
    config: path.resolve('src', 'config', 'database.js'),
    'migrations-path': path.resolve('migrations'),
    'seeders-path': path.resolve('seeders'),
}
```

### Queues and cron

A service or a cron enqueues work. The queue process runs it. Cron classes only enqueue. They do not do the heavy work.

```js
this.sendEmail = new Queue('sendEmail', bullConfig)
this.sendEmail.add(payload)
```

```js
@Processor('sendEmail')
export class SendEmailProcessor {
    @Process()
    async handleJob(job) {
        // job.data
    }
}
```

- Register every processor in `src/queues/queue.module.js`.
- Bull config is `src/config/bull.js` (Redis host, port, prefix).
- Register cron classes in `src/crons/cron.module.js`. Schedule with `@Cron(...)` from `@nestjs/schedule`.

### Auth pieces to copy

| File | Role |
|---|---|
| `src/guards/jwt-auth.guard.js` | Read `Authorization: Bearer`, verify JWT with `CLIENT_SECRET`, set `request.user` |
| `src/decorators/check-scope.decorator.js` | `CheckScope` metadata |
| `src/guards/check-scope.guard.js` | Compare token scopes to the route |
| `src/decorators/validate-request.decorators.js` | `ValidateRequest` metadata |
| `src/guards/validate-request.guard.js` | Run the DTO |
| `src/middlewares/exception-handler.js` | Global `AllExceptionsFilter` |
| `src/helpers/translate.js` | `translate(type, key, replacements)` |
| `src/lang/en/*.js` | String tables |
| `src/exceptions/AppValidationError.js` | Business errors |

### Import order

External packages first, then local groups, blank line between groups, with a comment on each local group.

```js
import { Injectable } from '@nestjs/common'

/* import models */
import CategoryModel from '../../models/Category'

/* import helpers */
import translate from '../../helpers/translate'

/* import exceptions */
import AppValidationError from '../../exceptions/AppValidationError'
```

Controllers use the same comments: `/* import services */`, `/* import guards */`, `/* import decorators */`, `/* import dto */`.

### Formatting

- No semicolons. Single quotes. 4-space indent. Trailing commas where ES5 allows them.
- Prettier print width 80. ESLint `max-len` 120, ignoring strings, comments, and template literals.
- `const` when the binding is not reassigned.
- `no-console` and `no-var` are errors.
- Object curly spacing: `{ data }`.
- Identifiers are camelCase. Object properties may stay snake_case (database columns).
- Parser is `@babel/eslint-parser` with legacy decorators.
- `src/` uses `import` / `export`. Babel transpiles that to CommonJS.
- Migrations, seeders, and `src/config/database.js` stay CommonJS.

## New feature checklist

1. Add `src/modules/<feature>/<feature>.module.js` and `<feature>.controller.js`.
2. Add one `<action>.service.js` per action and `dto/<action>.dto.js` when the route accepts input.
3. Export the module from `src/modules/index.js`.
4. If there is a new table: model in `src/models/`, register it in `src/models/index.js`, add a migration.
5. If work is slow or scheduled: a `*.processor.js` in `src/queues/` and a `*.cron.service.js` if it is on a clock. Register both.
6. Put reusable functions in `src/helpers/` once a second feature needs them.
7. Put user-facing strings in `src/lang/en/`.
8. Add a page under `apps/web/src/pages/` and a fetch function in `apps/web/src/lib/api.ts`. Call `/api/<feature>` and send the bearer token.

## What not to change

- Do not add TypeScript to the API.
- Do not put every feature service behind Nest dependency injection.
- Do not create a root `package.json` workspace unless you are deliberately changing the standard.
- Do not put secrets in `.env.example`.
- Do not let the controller return a raw object. Respond with `response.json({ data })`.
- Do not use the original upload filename as a storage path. Generate a storage key.
