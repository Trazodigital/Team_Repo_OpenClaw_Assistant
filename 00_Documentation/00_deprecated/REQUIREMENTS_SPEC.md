# Requirements Specification — OpenClaw Assistant

## 1. Requirements Traceability Pipeline

This project uses a traceability pipeline that connects **requirements**, **source code**, and **tests** into a single auditable system. The pipeline is powered by **StrictDoc** (requirements management) and **Vitest** (test runner with JUnit XML reporting).

### 1.1 Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                   REQUIREMENTS TRACEABILITY PIPELINE                │
└─────────────────────────────────────────────────────────────────────┘

 1. DEFINE REQUIREMENTS              2. WRITE CODE + TESTS
 ┌─────────────────────┐             ┌──────────────────────────────┐
 │ docs/requirements/   │             │ src/                         │
 │   requirements.sdoc   │             │   feature.ts                 │
 │                       │             │     // @sdoc[REQ-FUNC-001]   │
 │ [REQUIREMENT]         │◄───────────►│     function handle() {...}  │
 │ UID: REQ-FUNC-001    │  traceability│     // @sdoc[/REQ-FUNC-001] │
 │ TITLE: ...            │             │                              │
 │ STATEMENT: ...        │             ├──────────────────────────────┤
 │                       │             │ tests/                       │
 │ [REQUIREMENT]         │             │   feature.test.ts            │
 │ UID: REQ-TECH-007    │◄───────────►│     // @sdoc[REQ-FUNC-001]   │
 │ TITLE: ...            │  traceability│     describe('...', () => {  │
 └─────────────────────┘             │       it('...', () => {...}) │
                                      │     })                       │
                                      │     // @sdoc[/REQ-FUNC-001]  │
                                      └──────────────┬───────────────┘
                                                      │
                                                      │ pnpm test
                                                      ▼
                                      ┌──────────────────────────────┐
 3. TEST EXECUTION (Vitest)           │ Vitest runs tests            │
                                      │   ✓ feature.test.ts          │
                                      │   ✓ sample.test.ts           │
                                      │                              │
                                      │ Outputs:                     │
                                      │   reports/junit.vitest.xml   │
                                      └──────────────┬───────────────┘
                                                      │
                                                      │
                                                      ▼
 4. STRICTDOC EXPORT                  ┌──────────────────────────────┐
                                      │ strictdoc export             │
 ┌─────────────────────┐             │   docs/requirements          │
 │ Inputs:              │────────────►│                              │
 │  • *.sdoc files      │             │ Reads:                       │
 │  • @sdoc markers     │             │  • Requirements (.sdoc)      │
 │    in src/ & tests/  │             │  • Source markers (@sdoc)    │
 │  • junit.vitest.xml  │             │  • JUnit XML (test results)  │
 └─────────────────────┘             └──────────────┬───────────────┘
                                                      │
                                                      ▼
 5. OUTPUT                            ┌──────────────────────────────┐
                                      │ output/html/                 │
                                      │                              │
                                      │ ┌──────────────────────────┐ │
                                      │ │ Requirements Document    │ │
                                      │ │  • All REQ-xxx listed    │ │
                                      │ └──────────────────────────┘ │
                                      │ ┌──────────────────────────┐ │
                                      │ │ Traceability Matrix      │ │
                                      │ │  REQ ──► Source File     │ │
                                      │ │  REQ ──► Test File       │ │
                                      │ └──────────────────────────┘ │
                                      │ ┌──────────────────────────┐ │
                                      │ │ Source File Pages        │ │
                                      │ │  File ──► REQ links      │ │
                                      │ └──────────────────────────┘ │
                                      │ ┌──────────────────────────┐ │
                                      │ │ Search Index             │ │
                                      │ └──────────────────────────┘ │
                                      └──────────────────────────────┘
```

### 1.2 Pipeline Steps

| Step                   | Command                                                            | Description                                                    |
| ---------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Run tests**          | `pnpm test`                                                        | Executes Vitest and generates `reports/junit.vitest.xml`       |
| **Export docs**        | `.venv/bin/strictdoc export docs/requirements --output-dir output` | Generates static HTML with traceability matrix                 |
| **Interactive server** | `.venv/bin/strictdoc server docs/requirements`                     | Starts a local web UI for authoring and reviewing requirements |

### 1.3 How Traceability Works

1. **Requirements** are defined in `docs/requirements/*.sdoc` files, each with a unique `UID` (e.g., `REQ-FUNC-001`).
2. **Source code** and **test files** reference requirement UIDs using `@sdoc` markers:
   ```typescript
   // @sdoc[REQ-FUNC-001]
   function handleQuery() { ... }
   // @sdoc[/REQ-FUNC-001]
   ```
3. **Vitest** runs tests and produces a JUnit XML report.
4. **StrictDoc** reads all three inputs (requirements, source markers, test results) and generates:
   - **Forward traceability:** Requirement → Source code and test files implementing it
   - **Backward traceability:** Source/test file → Requirements it satisfies
   - **Coverage view:** Which requirements have code and tests, which don't
