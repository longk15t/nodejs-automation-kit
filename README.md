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
- CMS content tests
- Test tagging
- Visual testing (full page/section)

Run tests:

```sh
pnpm test:web
```

---

### 2️⃣ API Automation — Playwright APIRequestContext

- Located in: `frameworks/api-playwright/`
- No external libraries needed
- Supports authenticated API tests
- Includes GET + POST example tests

Run tests:

```sh
pnpm test:api
```

---

### 3️⃣ Mobile Automation — WebdriverIO + Appium

- Located in: `frameworks/mobile-wdio/`
- Uses WebdriverIO test runner
- Compatible with Android & iOS
- Includes basic sample mobile test

Run tests:

```sh
pnpm test:mobile
```

---

## 📦 Installation

### 1. Install dependencies (root + all workspaces):

```sh
pnpm install
```

(You may use `yarn` or `npm` workspaces as well.)

---

## ▶️ Running Tests

### Run Web UI (Playwright)

```sh
pnpm test:web
```

### Run API Tests (Playwright)

```sh
pnpm test:api
```

### Run Mobile Tests (WebdriverIO + Appium)

```sh
pnpm test:mobile
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
import { something } from "@shared/utils";
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

You may add GitHub Actions / GitLab pipelines to:

- Run each test suite independently
- Parallelize framework execution
- Upload Playwright / WDIO reports

CI folder example:

```
.github/workflows/
  ├── test-web.yml
  ├── test-api.yml
  └── test-mobile.yml
```

(Ask if you want these auto-generated.)

---

## 🛠️ Future Enhancements

- Add **Allure reports**
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

## 🙋 Need Add-ons?

I can generate:

- Full folder structure
- All config files
- Sample specs for all frameworks
- CI YAML pipelines
- Allure reporting setup
