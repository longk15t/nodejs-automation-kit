# Automation Monorepo (Playwright Web, Playwright API, WebdriverIO Mobile)

This monorepo provides a clean, scalable structure for managing multiple automation frameworks under one repository. It includes:

- **Web UI Automation** — Playwright
- **API Automation** — Playwright APIRequestContext
- **Mobile Automation** — WebdriverIO + Appium
- **Shared utilities** for cross-framework reuse

Designed for teams who want a unified automation codebase with modular components and individual framework isolation.

---

## 📦 Repository Structure

```
automation-monorepo/
│
├── package.json                     # root workspace manager
├── tsconfig.json                    # root TS config
├── pnpm-workspace.yaml              # monorepo management (pnpm/yarn)
│
├── frameworks/
│   ├── web-playwright/              # Playwright UI automation
│   ├── api-playwright/              # Playwright API automation
│   └── mobile-wdio/                 # WebdriverIO (Appium) mobile automation
│
└── shared/                          # reusable code across frameworks
    ├── config/
    ├── utils/
    └── helpers/
```

---

## 🚀 Frameworks Overview

### 1️⃣ Web UI Automation — Playwright

- Located in: `frameworks/web-playwright/`
- Uses Playwright Test Runner
- Supports browser and mobile viewport (Chrome, Google Pixel 7 and iPhone 13)
- Functional tests
- CMS content validation (text, content, font size, font family, ...)
- Test tagging
- Visual testing (full page/section/element)
- HTML report including trace/screenshot for failure

Run tests:

```sh
npm run test:web
```

---

### 2️⃣ API Automation — Playwright APIRequestContext

- Located in: `frameworks/api-playwright/`
- No external libraries needed
- Supports authenticated API tests
- Restful API testing (GET/POST/PUT/DELETE/...)
- GraphQL API testing (query, mutation)
- Response schema validation

Run tests:

```sh
npm run test:api
```

---

### 3️⃣ Mobile Automation — WebdriverIO + Appium

- Located in: `frameworks/mobile-wdio/`
- Uses WebdriverIO test runner
- Compatible with Android & iOS
- Includes basic sample mobile test

Run tests:

```sh
npm run test:mobile
```

---

## 📦 Installation

### 1. Install dependencies (root + all workspaces):

```sh
npm install
npm install --prefix frameworks/web-playwright
npm install --prefix frameworks/api-playwright
npm install --prefix frameworks/mobile-wdio
```

Install Playwright dependencies

```sh
cd frameworks/web-playwright
npx playwright install
```

```sh
cd frameworks/api-playwright
npx playwright install
```

---

## ▶️ Running Tests

### Run Web UI (Playwright)

```sh
npm run test:web
npm run test:web:android
npm run test:web:ios
```

### Run API Tests (Playwright)

```sh
npm test:api
```

### Run Mobile Tests (WebdriverIO + Appium)

```sh
npm test:mobile
```

---

## 🏗️ Technology Stack

| Area         | Library / Tool               |
| ------------ | ---------------------------- |
| Web UI       | Playwright                   |
| API          | Playwright APIRequestContext |
| Mobile       | WebdriverIO + Appium         |
| Language     | TypeScript                   |
| Package Mgmt | pnpm / yarn workspaces       |
| Runner       | Playwright / Mocha (WDIO)    |

---

## 🧩 Shared Utilities

The `shared/` directory is used for reusable helpers such as:

- API clients
- Custom loggers
- Test data handling
- Config readers
- Assertion helpers

Imported via TypeScript path aliases:

```ts
import { something } from '@shared/utils';
```

---

## 🧪 Folder-Level tsconfig Setup

Each framework has its own `tsconfig.json`, extending the root config:

- `frameworks/web-playwright/tsconfig.json`
- `frameworks/api-playwright/tsconfig.json`
- `frameworks/mobile-wdio/tsconfig.json`

This ensures clean isolation but shared conventions.

---

## 🔧 CI/CD Integration

- Run each test suite independently
- Parallelize framework execution
- Upload Playwright / WDIO reports

```
.github/workflows/
  ├── test-web.yml
  ├── test-api.yml
  └── test-mobile.yml
```

---

## 🛠️ Future Enhancements

- Add **Allure reports**
- Add test with **mock data**
- Add **Dockerized appium service**
- Add **test data management**
- Add **environment profiles**
- Integrate **eslint + prettier**
- Add **global test coverage** tooling
- Add **monorepo release management** (nx, turbo)

---

## 📄 License

This repository is provided as an example template.
You may reuse and modify it freely.

---
