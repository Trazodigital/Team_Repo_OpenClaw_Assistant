# Project Plan

## 1. Initiating

### 1.1 Goal

Set up a framework that enables development of **abilities** for the OpenClaw platform. The framework defines the required activities and quality standards needed to develop high-quality code for abilities that can be integrated into OpenClaw.

### 1.2 Success Criteria

At least one ability is integrated into the OpenClaw framework, developed end-to-end using a consistent and systematic development flow guided by the quality framework for AI-assisted coding.

### 1.3 High-Level Roadmap

1. **Understand OpenClaw** — study the OpenClaw project structure and the integration mechanism for abilities.
2. **Build a test ability** — a deliberately simple ability that exercises and exemplifies the development flow end-to-end against the quality framework.
3. **Build a complex ability** — apply the validated flow to a more substantial ability.

## 2. Planning

### 2.1 Quality Framework for Code Development

Code development follows the **Quality Framework for AI-Assisted Development**, maintained as a separate standard. The framework defines the activities, gates, and quality obligations that apply across all six phases of the V-cycle (Requirements → Design → Implementation → Integration Testing → System Testing → Operation).

### 2.2 Development Tools

| Area                     | Selected tool          | Alternative         | Reason to reject                                |
| ------------------------ | ---------------------- | ------------------- | ----------------------------------------------- |
| Backlog management       | GitHub Projects        | Notion              | No code traceability                            |
| Backlog management       | GitHub Projects        | Jira                | Excessive config for a two-person team          |
| Source control           | GitHub                 | Bitbucket           | Smaller ecosystem, lower AI stack compatibility |
| CI/CD                    | GitHub Actions         | Bitbucket Pipelines | Linux-only, incompatible with GitHub            |
| Requirements engineering | StrictDoc              | —                   | —                                               |
| Documentation            | GitHub Repository Wiki | —                   | —                                               |

### 2.3 Technology Stack

| Area            | Tool                                                      |
| --------------- | --------------------------------------------------------- |
| Language        | TypeScript                                                |
| Runtime         | Node.js 22+                                               |
| Package manager | pnpm + Workspaces                                         |
| Bundler         | tsdown                                                    |
| Linter          | Oxlint                                                    |
| Formatter       | Prettier (changed because oxfmt is not available in pnpm) |
| Test runner     | Vitest                                                    |

### 2.4 Collaboration

#### 2.4.1 GitHub commits

> **Golden rule:** never work directly on `main`. Always create a branch for each task.

##### Why we use branches

The repository has a single main branch — `main` — that holds the official code. If anyone commits directly to `main`, an error immediately affects the whole team. Branches let each member work in isolation; changes only reach `main` after a Pull Request review.

```text
main (official code)
  │
  ├── feature/<task-name>   ← member A works here
  │
  └── feature/<task-name>   ← member B works here
```

##### Workflow — step by step

**Step 1 — Pull the latest `main` before starting**

```bash
git checkout main
git pull
```

**Step 2 — Create a branch named after the task**

```bash
git checkout -b feature/<task-name>
```

**Branch prefixes:**

- `feature/` — new functionality
- `fix/` — bug fix
- `docs/` — documentation change

**Step 3 — Work on your files normally**

All changes stay on your branch and do not affect anyone else.

**Step 4 — Stage, commit, and push**

```bash
git add .
git commit -m "feat: short description of the change"
git push origin feature/<task-name>
```

**Commit message prefixes:**

- `feat:` — new functionality
- `fix:` — bug fix
- `docs:` — documentation change
- `test:` — test change

**Step 5 — Open a Pull Request on GitHub**

1. Go to the repository on GitHub.
2. Click **Compare & pull request** on the yellow banner.
3. Write a descriptive title.
4. In the description, explain _what_ you did and _why_.
5. Assign a teammate as **Reviewer**.
6. Click **Create pull request**.

**Step 6 — Reviewer reviews the PR**

The reviewer opens the **Files changed** tab and may:

- Leave line-level comments
- Request changes via **Request changes**
- Approve via **Approve**

**Step 7 — Merge into `main`**

Once approved, the author clicks **Merge pull request**.

**Step 8 — Clean up the branch**

```bash
git checkout main
git pull
git branch -d feature/<task-name>
```

##### Quick command reference

| Action                            | Command                          |
| --------------------------------- | -------------------------------- |
| Check current branch              | `git branch`                     |
| Create and switch to a new branch | `git checkout -b feature/<name>` |
| Switch to an existing branch      | `git checkout <branch-name>`     |
| Pull latest from `main`           | `git pull`                       |
| Push your branch to GitHub        | `git push origin feature/<name>` |
| Delete a local branch             | `git branch -d feature/<name>`   |
| Show file status                  | `git status`                     |

## 3. Executing

### 3.1 Repository directory structure

#### Overview

**OpenClaw Assistant** is an AI agent project focused on medical automation and speech-to-text processing. The source is organised as a **PNPM monorepo** (`pnpm@10.32.1`) with workspaces for applications and shared packages, a StrictDoc-based requirements traceability pipeline, and a fully automated CI workflow.

**Requirements:** Node.js ≥ 22. TypeScript is the primary language across all packages.

#### Directory tree

```text
Team_Repo_OpenClaw_Assistant/
├── .github/
│   ├── dependabot.yml              # Dependabot config (npm + GitHub Actions, weekly)
│   └── workflows/
│       └── ci.yml                  # CI pipeline: lint, format, tests, secret scanning
├── apps/
│   ├── api/                        # Back-end application (@team/api)
│   │   ├── src/
│   │   │   └── HelloWorldTest.ts
│   │   └── package.json
│   └── web/                        # Front-end web application (@team/web)
│       ├── src/                    # (skeleton — work in progress)
│       └── package.json
├── packages/
│   ├── config/                     # Shared configuration package (@team/config)
│   │   ├── .gitkeep
│   │   └── package.json
│   └── openclaw-context/           # OpenClaw domain context (@team/openclaw-context)
│       ├── src/
│       └── package.json
├── requirements/                   # StrictDoc requirement documents (.sdoc)
│   ├── index.sdoc                  # Root document — sections and requirement index
│   ├── requirements.sdoc           # Detailed functional and non-functional requirements
│   └── HelloWorldTest.sdoc         # Traceability stub linked to HelloWorldTest
├── tests/                          # Cross-cutting and integration tests (root level)
│   ├── HelloWorldTest.test.ts
│   └── sample.test.ts
├── .env.example                    # Template for local environment variables
├── .gitignore
├── package.json                    # Root package — scripts, devDependencies, engines
├── pnpm-lock.yaml
├── pnpm-workspace.yaml             # Workspace definition (apps/*, packages/*)
├── requirements-strictdoc.txt      # Python dependency for StrictDoc (>=0.19.0)
├── strictdoc_config.py             # StrictDoc project configuration
├── tsconfig.json                   # Root TypeScript config (ES2022, NodeNext)
├── tsdown.config.ts                # Bundle config (ESM + CJS, declarations)
├── vitest.config.ts                # Test runner config (Node env, V8 coverage)
├── README.md
├── REQUIREMENTS_SPEC.md            # Full traceability pipeline specification
└── SECURITY.md                     # Security policy and vulnerability reporting
```

#### Directory breakdown

##### `apps/` — Deployable applications

Each subdirectory is an independent PNPM workspace package.

| Package     | Name        | Purpose                                                                                                                                                                              |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apps/api/` | `@team/api` | Back-end API service. Contains the server entry point and business logic. Currently initialised with a `HelloWorldTest.ts` placeholder. Built with `tsdown`, run via `node --watch`. |
| `apps/web/` | `@team/web` | Front-end web application. Skeleton in place; implementation pending.                                                                                                                |

## 4. Monitoring & Controlling

_TODO_

## 5. Closing

_TODO_
