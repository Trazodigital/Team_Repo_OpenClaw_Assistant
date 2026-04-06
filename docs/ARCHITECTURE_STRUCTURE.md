# Architecture & Directory Structure

## Introduction

**OpenClaw Assistant** is an AI agent project focused on medical automation and voice-to-text processing. The codebase is organized as a **PNPM Monorepo** (pnpm@10.32.1) with workspaces for applications and shared packages, a StrictDoc-based requirements traceability pipeline, and a fully automated CI workflow.

Node.js **≥ 22** is required. TypeScript is the primary language across all packages.

---

## Directory Tree

```
Team_Repo_OpenClaw_Assistant/
├── .github/
│   ├── dependabot.yml              # Dependabot config (npm + GitHub Actions, weekly)
│   └── workflows/
│       └── ci.yml                  # CI pipeline: lint, format, test & secret scanning
├── apps/
│   ├── api/                        # Back-end API application (@team/api)
│   │   ├── src/
│   │   │   └── HelloWorldTest.ts
│   │   └── package.json
│   └── web/                        # Front-end web application (@team/web)
│       ├── src/                    # (scaffold — work in progress)
│       └── package.json
├── packages/
│   ├── config/                     # Shared configuration package (@team/config)
│   │   ├── .gitkeep
│   │   └── package.json
│   └── openclaw-context/           # OpenClaw domain context package (@team/openclaw-context)
│       ├── src/
│       └── package.json
├── requirements/                   # StrictDoc requirement documents (.sdoc)
│   ├── index.sdoc                  # Root document — sections & requirement index
│   ├── requirements.sdoc           # Detailed functional & non-functional requirements
│   └── HelloWorldTest.sdoc         # Traceability stub linked to HelloWorldTest
├── tests/                          # Root-level integration / cross-cutting tests
│   ├── HelloWorldTest.test.ts
│   └── sample.test.ts
├── .env.example                    # Template for local environment variables
├── .gitignore
├── package.json                    # Root package — scripts, devDependencies, engines
├── pnpm-lock.yaml
├── pnpm-workspace.yaml             # Workspace definition (apps/* , packages/*)
├── requirements-strictdoc.txt      # Python dependency pin for StrictDoc (>=0.19.0)
├── strictdoc_config.py             # StrictDoc project configuration
├── tsconfig.json                   # Root TypeScript config (ES2022, NodeNext)
├── tsdown.config.ts                # Bundle config (ESM + CJS, declarations)
├── vitest.config.ts                # Test runner config (Node env, V8 coverage)
├── README.md
├── REQUIREMENTS_SPEC.md            # Full requirements traceability pipeline spec
└── SECURITY.md                     # Security policy & vulnerability reporting
```

---

## Directory Breakdown

### `apps/` — Deployable Applications

Each subdirectory is a standalone PNPM workspace package.

| Package     | Name        | Purpose                                                                                                                                                                                         |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/api/` | `@team/api` | Back-end API service. Contains the server entry point and business logic. Currently bootstrapped with a `HelloWorldTest.ts` placeholder. Built with **tsdown** and runnable via `node --watch`. |
| `apps/web/` | `@team/web` | Front-end web application. Scaffold is in place; implementation is pending.                                                                                                                     |

### `packages/` — Shared Libraries

Reusable packages consumed by the applications via PNPM workspace protocol.

| Package                      | Name                     | Purpose                                                                                                                  |
| ---------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `packages/config/`           | `@team/config`           | Centralized, shared configuration (feature flags, constants, environment helpers). Currently a placeholder (`.gitkeep`). |
| `packages/openclaw-context/` | `@team/openclaw-context` | Core domain logic for OpenClaw — medical context models, prompt schemas, and voice-to-text processing utilities.         |

### `requirements/` — StrictDoc Requirements

This directory holds all **StrictDoc** `.sdoc` files that define the project's formal requirements and enable end-to-end traceability.

- **`index.sdoc`** — Root document that organizes sections (Overview, Functional, Non-Functional) and serves as the entry point for StrictDoc export.
- **`requirements.sdoc`** — Detailed requirement definitions with UIDs (e.g., `REQ-FUNC-001`, `REQ-NFR-001`).
- **`HelloWorldTest.sdoc`** — A traceability stub that links to the `HelloWorldTest` source and test files via `@sdoc` markers.

Requirements are linked bidirectionally to source code and tests using `@sdoc[REQ-xxx]` markers. See `REQUIREMENTS_SPEC.md` for the full traceability pipeline documentation.

### `tests/` — Root-Level Tests

Integration and cross-cutting test files that are not scoped to a single app or package.

- **`HelloWorldTest.test.ts`** — Validates the `HelloWorldTest` module and demonstrates `@sdoc` traceability markers.
- **`sample.test.ts`** — Baseline smoke test.

Tests are executed with **Vitest** (`pnpm test`). Per-app tests can also live inside `apps/*/src/` and `packages/*/src/` — the Vitest config includes all three locations.

### `.github/` — CI/CD & Automation

- **`workflows/ci.yml`** — GitHub Actions CI pipeline with two jobs:
  - **`quality`** — Installs dependencies, runs OxLint, Prettier format check, and Vitest.
  - **`secret-scan`** — Runs TruffleHog OSS to detect leaked secrets in the commit history.
- **`dependabot.yml`** — Automated weekly dependency updates for both npm packages and GitHub Actions.

---

## Key Root Files

| File                             | Description                                                                                                                                                                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`package.json`**               | Root workspace package. Defines shared `devDependencies` (TypeScript 5.9, Vitest 4, OxLint, Prettier, Husky, tsdown), `engines` (Node ≥ 22), `packageManager` (pnpm@10.32.1), and workspace-level scripts (`build`, `lint`, `format`, `test`, `strictdoc:serve`). |
| **`pnpm-workspace.yaml`**        | Declares the monorepo workspace globs: `apps/*` and `packages/*`.                                                                                                                                                                                                 |
| **`tsconfig.json`**              | Root TypeScript configuration targeting ES2022 with NodeNext module resolution. Includes source from `apps/*/src`, `packages/*/src`, `tests/`, and root `*.ts` files.                                                                                             |
| **`tsdown.config.ts`**           | Bundler configuration. Produces ESM and CJS outputs with type declarations for the API entry point.                                                                                                                                                               |
| **`vitest.config.ts`**           | Test runner configuration. Uses the Node environment, collects tests from apps, packages, and the root `tests/` directory, and generates V8 coverage reports (text + lcov).                                                                                       |
| **`strictdoc_config.py`**        | StrictDoc project settings. Enables requirement-to-source traceability, the traceability screen, and search. Configures the source root and `.sdoc` include paths.                                                                                                |
| **`requirements-strictdoc.txt`** | Python pip requirements file pinning StrictDoc ≥ 0.19.0 for the traceability pipeline.                                                                                                                                                                            |
| **`.env.example`**               | Template for local environment variables (`NODE_ENV`, `PORT`, `DATABASE_URL`, `API_KEY`). Actual `.env` files are git-ignored.                                                                                                                                    |
| **`REQUIREMENTS_SPEC.md`**       | Comprehensive documentation of the requirements traceability pipeline (StrictDoc + Vitest + JUnit XML).                                                                                                                                                           |
| **`SECURITY.md`**                | Security policy — vulnerability reporting via GitHub Private Advisories, response SLAs, and security practices (secret scanning, Dependabot, no secrets in code).                                                                                                 |
| **`README.md`**                  | Project overview with CI status badge.                                                                                                                                                                                                                            |
| **`.gitignore`**                 | Ignores build artifacts (`dist/`, `build/`), `node_modules/`, Python virtual environments, coverage reports, StrictDoc output, logs, and IDE settings.                                                                                                            |
