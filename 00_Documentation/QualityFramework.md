# Quality Framework for AI-Assisted Development

## 1. Quality Practices Overview

_Ordered by the V-Model phase where each practice first applies._

- **Requirements-driven development** — think requirements through thoroughly before generating code _(Phase 1)_
- **Inspectability** — full traceability from requirements to tests and code _(Phase 1)_
- **Testability** — code structured so it can be verified in isolation _(Phase 1 → 4)_
  - Write tests first (TDD)
  - Testing across environments and configurations
  - Reusable test suite across features
- **Modularity** — separation of concerns and clear module boundaries _(Phase 2)_
- **Security** — defensive posture baked into the pipeline _(Phase 2 → 4)_
  - Reusable security test templates
  - Automated security scanning in CI
- **Static analysis** — lint and format rules configured once, applied consistently _(Phase 3)_
- **Documentation and code comments** — explain _why_, not _what_ _(Phase 3)_
- **Version control discipline** — clean commits, meaningful messages, branching strategy _(Phase 3)_
- **Logging** — structured logging derived from the requirement spec _(Phase 3)_
- **Code review (four-eyes principle)** — human verification gate before merging _(Phase 4)_
- **Performance testing** — measure response times, query counts, memory usage _(Phase 5)_
- **Observability** — alerts for unusual patterns, failed authentication, unexpected errors _(Phase 6)_

## 2. V-Model Quality Mapping

### 2.1 Requirements & Specification

- **Requirements-driven development** — think through requirements thoroughly so the AI generates correct code
- **Inspectability** — establish traceability from the start via unique REQ UIDs referenced by tests and code
- **Write tests first (TDD)** — define expected behavior before generating implementation

### 2.2 Design & Architecture

- **Modularity** — design for separation of concerns from the start
- **Testability** — structure code so it can be tested in isolation
- **Reusable security test templates** — design the security test surface before touching code; reusable across features

### 2.3 Implementation

- **Static analysis** — lint and format rules configured once, applied consistently across the codebase
- **Documentation and code comments** — explain _why_ something is done, not just _what_ it does
- **Version control discipline** — clean commits, meaningful messages, branching strategy
- **Logging** — add logging requirements directly to the code generation prompt
- **Testing across environments and configurations** — ask the AI explicitly to generate env-aware, config-aware code

### 2.4 Integration & Unit Testing

- **Reusable test suite** — tests that can be run consistently across changes
- **Automated security scanning** — runs as part of the integration pipeline
- **Code review (four-eyes principle)** — human verification gate before merging

### 2.5 System & Acceptance Testing

- **Performance testing** — measure response times, query counts, and memory usage at the system level

### 2.6 Operation

- **Observability** — set alerts for unusual patterns, failed authentication attempts, and unexpected errors; runtime feedback loop into the next iteration

## 3. Development Flow — Activity Reference

### 3.0 Overview

This section maps how the six phases relate as a V-cycle and lists every activity in linear order.

#### V-cycle at a glance

The classic V-cycle pairs each specification phase with the verification phase that proves it. Phase 3 sits at the apex (the build); Phase 6 is the post-release feedback loop into the next iteration.

| Specification (descending) |         Build         |  Verification (ascending)  |
| :------------------------: | :-------------------: | :------------------------: |
|    **1. Requirements**     |         `<->`         |   **5. System Testing**    |
|       **2. Design**        |         `<->`         | **4. Integration Testing** |
|                            | **3. Implementation** |                            |

_Phase 6: Operation — production feedback loops back into Phase 1 of the next iteration._

#### All activities in linear order

Each phase below is one box containing its title and every activity it owns, grouped by sub-section (A / B / C). Phases flow strictly left to right; Phase 6 feeds back into Phase 1 for the next iteration.

| **Phase 1: Requirements**   | **Phase 2: Design**         | **Phase 3: Implementation** | **Phase 4: Integration Testing** | **Phase 5: System Testing** | **Phase 6: Operation** |
| --------------------------- | --------------------------- | --------------------------- | -------------------------------- | --------------------------- | ---------------------- |
| **A. Core work**            | **A. Core work**            | **A. Core work**            | **A. Core work**                 | **A. Core work**            | **A. Core work**       |
| A.1 Create UID              | A.1 Module boundaries       | A.1 Implement to pass tests | A.1 Unit + security tests        | A.1 Deploy to staging       | A.1 Configure alerts   |
| A.2 Write statement and AC  | A.2 Processing flow         |                             | A.2 Integration tests            | A.2 E2E acceptance tests    | A.2 Log aggregation    |
| A.3 Failing acceptance test | A.3 Interfaces (`types.ts`) |                             | A.3 Security scanning            | A.3 Performance benchmarks  | A.3 Health checks      |
| **B. Quality obligations**  | **B. Quality obligations**  | **B. Quality obligations**  | _(no B)_                         | _(no B)_                    | _(no B)_               |
| B.1 Domain glossary         | B.1 Testability             | B.1 `@sdoc` markers         |                                  |                             |                        |
| B.2 NFR measurability       | B.2 Security templates      | B.2 Why-comments and ADRs   |                                  |                             |                        |
|                             |                             | B.3 Structured logging      |                                  |                             |                        |
|                             |                             | B.4 Env/config awareness    |                                  |                             |                        |
| **C. Gate**                 | **C. Gate**                 | **C. Gate**                 | **C. Gate**                      | **C. Gate**                 | **C. Loop back**       |
| C.1 Validate traceability   | C.1 Design review           | C.1 Branching strategy      | C.1 Code review                  | C.1 NFR threshold check     | C.1 Backlog from prod  |
|                             |                             | C.2 Lint and format         | C.2 Merge                        | C.2 PO acceptance           | C.2 Sprint retro       |
|                             |                             | C.3 Audit test evidence     |                                  |                             |                        |

_Phase 6 → Phase 1 (next iteration): production feedback feeds the next round of REQ authoring._

### 3.1 Phase 1: Requirements & Specification

**Goal:** Define _what_ to build before writing any code.

**How to read this section:** Phase 1 activities cluster into three groups:

- **A — Core work:** sequential authoring steps repeated for every requirement in scope
- **B — Quality obligations:** quality constraints that apply across all requirements during authoring (extending StrictDoc's built-in checks)
- **C — Gate:** a single corpus-wide check that runs once all requirements have been authored

#### 3.1.A Core work — Per-requirement authoring

_Sequential steps repeated for every requirement: create the UID, fill its content, then write the failing test that proves it._

| #   | Activity                                          | Tool               | Output                                                                                                                                                                            | Auditability                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Comments (TL;DR) |
| --- | ------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Create requirement with unique UID                | StrictDoc          | `.sdoc` file (StrictDoc) at `docs/requirements/*.sdoc` with UID                                                                                                                   | **Criteria:** UID follows naming convention (`REQ-<TYPE>-NNN`) and is unique across all `.sdoc` files.<br>**Control:** CI check enforces UID uniqueness and rejects PRs with duplicates.                                                                                                                                                                                                                                                                                      |                  |
| 2   | Write statement, inputs, outputs, constraints     | StrictDoc          | Requirement statement and acceptance criteria captured in `.sdoc` file                                                                                                            | **Criteria:** All mandatory fields populated; statement is unambiguous; acceptance criteria are testable (measurable).<br>**Control:** Enforce StrictDoc schema with mandatory fields (statement, acceptance criteria).                                                                                                                                                                                                                                                       |                  |
| 3   | Write failing acceptance test with `@sdoc` marker | Vitest + StrictDoc | `.test.ts` file at `tests/<feature>.test.ts` with `@sdoc[UID]` marker linking requirement to test + JUnit XML report / CI log showing failing tests that describe the requirement | **Criteria:** Test file exists at expected path and references the correct `@sdoc[UID]`; every `@sdoc` marker resolves to an existing REQ UID with no orphan markers; tests fail on assertion (not syntax/runtime); assertions describe expected behavior from acceptance criteria.<br>**Control:** CI check: every REQ UID must have at least one linked test file; CI step greps for orphan markers and fails build; archive JUnit XML as CI artifact retained per release. |                  |

#### 3.1.B Quality obligations

_Constraints applied across all requirements during authoring. These extend StrictDoc's built-in checks with concerns it does not natively enforce._

| #   | Activity                                          | Tool                        | Output                                                                                  | Auditability                                                                                                                                                                                                                                                                                                                       | Comments (TL;DR) |
| --- | ------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Maintain a domain glossary referenced by all REQs | Markdown + custom CI script | `docs/glossary.md` listing every domain term used in REQs with one canonical definition | **Criteria:** Every distinct domain term that appears in a REQ statement is defined exactly once in the glossary; no synonyms or aliases for the same concept.<br>**Control:** CI script extracts domain terms from `.sdoc` files and fails the build on any term not defined in `docs/glossary.md` (or any duplicate definition). |                  |
| 2   | Make every NFR measurable                         | StrictDoc grammar           | NFR-type `.sdoc` files include `METRIC`, `THRESHOLD`, and `MEASUREMENT_METHOD` fields   | **Criteria:** Every REQ with type `NFR-*` declares a metric (e.g., "p95 response time"), a threshold (e.g., "≤ 500ms"), and a measurement method (e.g., "Vitest benchmark suite at `tests/perf/`").<br>**Control:** StrictDoc grammar marks the three fields as mandatory for NFR-type REQs; CI fails if any is missing.           |                  |

#### 3.1.C Gate — Corpus validation

_A single check that runs after all requirements are authored — verifies the whole specification corpus is internally consistent and traceable end-to-end._

| #   | Activity              | Tool             | Output                                                                           | Auditability                                                                                                                                                                                                                                                                                                                                                             | Comments (TL;DR) |
| --- | --------------------- | ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| 1   | Validate traceability | StrictDoc export | HTML / JSON traceability matrix linking every REQ UID to test and implementation | **Criteria:** Every REQ UID appears in the matrix with at least one linked test; every REQ UID traces to both test and implementation; no orphan REQs, tests, or code items; no gaps reported.<br>**Control:** Publish matrix to GitHub Pages after each merge and archive per release; CI fails on orphan REQ / test / code items and blocks merge on traceability gap. |                  |

**Requirements-driven development:**

- Activities A.1–A.2 force thinking through each requirement thoroughly before any implementation
- The requirement UID becomes the single source of truth referenced by code and tests

**Write tests first (TDD):**

- Activity A.3 produces a failing test suite that encodes the expected behavior and links it to the requirement
- Implementation (Phase 3) starts only after tests exist and fail for the right reason

**Spec quality:**

- Activity B.1 keeps the vocabulary consistent across requirements — every domain term used in a REQ has exactly one canonical definition in the glossary
- Activity B.2 makes every non-functional requirement measurable — each NFR carries a metric, a threshold, and a measurement method so Phase 5 can automatically verify it
- Both checks extend StrictDoc's built-in grammar, which alone does not enforce vocabulary or measurability

**Corpus traceability gate:**

- Activity C.1 runs after all requirements are authored and ensures the corpus is internally consistent — no orphan REQs, no missing tests, no gaps before Phase 2 starts

### 3.2 Phase 2: Design & Architecture

**Goal:** Structure the solution for modularity, testability, and security before implementation.

**How to read this section:** Phase 2 activities cluster into three groups that operate at different rhythms:

- **A — Core work:** sequential top-down progression from module boundaries → flow → interfaces
- **B — Quality obligations:** quality constraints applied to the design (testability, security) — not separate sequential steps
- **C — Gate:** a single corpus-wide check that every REQ + AC is addressed by a concrete design decision

#### 3.2.A Core work — Architectural design (top-down)

| #   | Activity                                                  | Tool                         | Output                                                                     | Auditability                                                                                                                                                                                                                                         | Comments (TL;DR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | --------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Define module boundaries and separation of concerns       | Markdown + Mermaid (in repo) | `.md` design document or `.mmd` Mermaid diagram with module description    | **Criteria:** Diagram shows separation of concerns for each module; each module's function is clearly defined and not overlapping with others.<br>**Control:** Version-control the diagram in git; require update in any PR that changes boundaries. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2   | Define processing flow (step, module, input, output, REQ) | Markdown + Mermaid (in repo) | `.md` design document containing the flow table                            | **Criteria:** Every flow step has module, input, output populated and links to at least one REQ UID; flow is complete end-to-end.<br>**Control:** Version in git; link each flow step to a REQ UID.                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 3   | Design interfaces and data contracts (types/interfaces)   | TypeScript                   | `types.ts` source file at `src/<module>/types.ts` with exported interfaces | **Criteria:** All public module contracts exported from `types.ts`; no `any` types; interfaces match the flow table contracts.<br>**Control:** Lint rule: interfaces must be declared in dedicated `types.ts` file.                                  | `types.ts` is a single file that declares everything the outside world needs to know about a module — inputs, outputs, errors, required external tools — without any actual code.<br><br>**It exists so:**<br>1. The compiler catches mistakes before you run anything<br>2. Modules can be tested in isolation (swap real dependencies for fakes)<br>3. You can rewrite the implementation without breaking anyone else<br>4. New developers see the module's "shape" in 30 seconds without reading any logic |

#### 3.2.B Quality obligations

_Quality properties applied to the design — not separate sequential steps._

| #   | Activity                                             | Tool       | Output                                                                                                                                          | Auditability                                                                                                                                                                                                                                                                                                                                                         | Comments (TL;DR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --- | ---------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Ensure each module can be tested in isolation        | TypeScript | Clean interface boundaries in `src/<module>/types.ts` + unit tests mocking all external dependencies                                            | **Criteria:** Each module exposes a clear interface through `types.ts`; unit tests mock all external dependencies; no direct external imports in core logic.<br>**Control:** Code review verifies interface boundaries; unit tests required to mock externals; enforced via test coverage check.                                                                     | A module is tested in isolation by depending only on abstract **ports** (interfaces from `types.ts`), never on real tools. One **composition root** per entry point (e.g., `apps/api/src/main.ts`) is the single place that injects the concrete implementation — real adapters in production, fakes in each test file.<br><br>**It exists so:**<br>1. Tests run in milliseconds and don't flake on network or external-service issues<br>2. A failing test means the code is broken, not the outside world<br>3. Swapping one LLM or database for another touches only the composition root + a new adapter<br>4. New developers run the full test suite locally without API keys or external services                                                    |
| 2   | Design security test surface with reusable templates | Vitest     | `templates/security.ts` source file with shared assertions + `.security.test.ts` file at `tests/<feature>.security.test.ts` importing templates | **Criteria:** Templates cover standard attack vectors and OWASP-relevant categories (authn, authz, injection, input validation); every `.security.test.ts` imports at least one template.<br>**Control:** Enforce naming convention `*.security.test.ts` via CI; require one per feature; CI check verifies every `.security.test.ts` imports from shared templates. | A shared `templates/security.ts` file encodes reusable attack checks (SQL injection, missing auth, malformed input, etc.). Every feature gets its own `tests/<feature>.security.test.ts` that imports these templates. CI enforces that every feature has one and that it uses the shared templates — so security coverage is uniform and updated in one place.<br><br>**It exists so:**<br>1. Every feature is verified against the same standard attack set (OWASP-aligned)<br>2. Adding a new attack check means editing one file — all features inherit it automatically<br>3. No feature can ship without security tests — CI blocks merges that skip them<br>4. Security standards stay current: update templates once, every feature is re-verified |

#### 3.2.C Gate — Design vs. requirements

_A single corpus-wide check that every REQ + AC is addressed by a concrete design decision before Phase 3 starts._

| #   | Activity                           | Tool                 | Output                                                                                                | Auditability                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Comments (TL;DR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | ---------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Review design against requirements | StrictDoc + Markdown | `.md` design doc at `docs/design/<feature>.md` with REQ + AC UID references for every design decision | **Criteria — Automated (StrictDoc):** Every in-scope REQ and AC is referenced by at least one design decision in the doc; every named artifact (module, port, service) path resolves; StrictDoc traceability matrix shows zero orphans / zero gaps for the feature.<br>**Criteria — Human (design review):** Each design decision is _semantically correct_ (it actually solves the AC, not just mentions it); non-goals are honest; no requirement is missing from the spec itself.<br>**Control — Automated:** StrictDoc passthrough runs in CI and fails on any unreferenced REQ/AC or broken artifact reference; traceability matrix published to GitHub Pages after each merge.<br>**Control — Human:** Design doc requires explicit sign-off from dev lead, reviewer, and PO before Phase 3 starts; review checklist enforced via PR template. | A single design-review document at `docs/design/<feature>.md` walks through every in-scope REQ and its acceptance criteria, recording the concrete design decision (module, port, service) that addresses each one. StrictDoc parses the `.sdoc` requirements, design doc, source markers, and test markers, then fails CI on any unreferenced REQ or AC — so no requirement reaches implementation undesigned.<br><br>**It exists so:**<br>1. No requirement (or AC) is forgotten between specification and implementation<br>2. Every design decision is automatically traced from REQ → AC → design → test → code via StrictDoc<br>3. Overdesign is caught — modules with no linked REQ flag as suspicious<br>4. The design doc + StrictDoc traceability matrix become the single source of truth for "why this module exists" |

**Modularity:**

- Activities A.1–A.3 and B.1 ensure code is structured into isolated, independently testable modules from the start

**Testability:**

- Activity B.1 enforces clean interface boundaries so units can be tested in isolation by mocking external dependencies

**Security test templates:**

- Activity B.2 defines the security test surface before touching implementation code; templates are reusable across features

**Requirements traceability gate:**

- Activity C.1 closes Phase 2 by verifying — automatically via StrictDoc and via human sign-off — that every in-scope REQ and AC is addressed by a concrete design decision before any code is written

### 3.3 Phase 3: Implementation

**Goal:** Write production code that passes the existing tests, following consistent standards and full traceability.

**How to read this section:** Phase 3 activities are **not strictly sequential**. They cluster into three categories that operate at different rhythms during implementation:

- **A — Core work:** the actual coding
- **B — Quality obligations:** properties the source code itself must carry while being written (not separate sequential steps)
- **C — Gate:** Git discipline, pre-merge checks, and audit-evidence production around the coding work

#### 3.3.A Core work — Implementation

| #   | Activity                                                    | Tool       | Output                                                                             | Auditability                                                                                                                                                                  | Comments (TL;DR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | ----------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Implement the module to pass the failing tests from Phase 1 | TypeScript | `.ts` source files at `src/<module>/*.ts` — production code that makes tests green | **Criteria:** Files located in expected directory; naming follows convention; all Phase 1 tests now pass.<br>**Control:** Enforce module structure via path-based lint rules. | Production code is written **last**, after Phase 1 tests and Phase 2 contracts already define expected behavior and shape. Implementation just makes the tests turn green — no inventing, no redesigning.<br><br>**Flow:** run suite → pick a failing test → write the minimum code that turns it green → repeat until all green. CI blocks merge until 100% of Phase 1 tests pass.<br><br>**It exists so:**<br>1. Code is forced to match the spec (tests dictate what's correct)<br>2. The tests can't be tailored to fit whatever the code happens to do — they were locked in Phase 1 before the code existed<br>3. Every line of code is traceable to a REQ via the test that demanded it |

#### 3.3.B Quality obligations

_Properties the source code itself must carry while being written. Not separate sequential steps — qualities of the implementation._

| #   | Activity                                                        | Tool              | Output                                                                                                                                                          | Auditability                                                                                                                                                                                                                                                                                                                                                             | Comments (TL;DR)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | --------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Add `@sdoc[UID]` markers in source code linking to requirements | StrictDoc + JSDoc | `@sdoc[REQ-UID]` marker in a JSDoc comment above the implementing class/function/module                                                                         | **Criteria:** Every REQ-implementing file has a matching `@sdoc[UID]`; no orphan markers and no missing markers.<br>**Control:** CI step runs StrictDoc and fails on orphan markers, missing markers on REQ-linked files, or markers referencing non-existent REQ UIDs.                                                                                                  | A tiny `@sdoc[REQ-UID]` tag in a JSDoc comment above the implementing class, function, or module makes the link **REQ → source code** machine-readable. StrictDoc parses these markers (alongside the test-side and design-side markers) to build the full traceability matrix.<br><br>**Flow:** add `@sdoc` marker on every file that implements a REQ → CI runs StrictDoc → build fails on any orphan or missing marker.<br><br>**It exists so:**<br>1. Anyone (auditor, new developer) can answer "which code implements REQ-X?" in seconds<br>2. Stale or typo'd UIDs are caught at PR time, not in production<br>3. The traceability matrix from Phase 2 #6 is complete — REQ → design → test → **code** |
| 2   | Add documentation explaining _why_ (not _what_)                 | Markdown + JSDoc  | Inline `// why:` comments in source for routine rationale + ADR files in `docs/adr/*.md` (linked via `@adr` marker) for genuinely non-obvious design decisions  | **Criteria:** Routine rationale captured as `// why:` comments in code; non-obvious design decisions captured in an ADR following template (context / decision / consequences); every `@adr` marker resolves to an existing ADR file.<br>**Control:** CI check: every `@adr` marker resolves to an existing ADR file; enforce ADR PR template for non-obvious decisions. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 3   | Add structured logging statements per the requirement spec      | TypeScript        | Log events (start / end / error) emitted by the feature + assertions on these events inside existing integration tests at `tests/<feature>.integration.test.ts` | **Criteria:** Key log events (start / end / error) are emitted by the feature; at least one integration test asserts on these log events per feature.<br>**Control:** Code review verifies logging of key events; integration tests cover log assertions; archive captured logs from integration runs.                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 4   | Add environment/config awareness (env vars, config validation)  | TypeScript        | `.env.example` file + config validation tests at `tests/config.test.ts` ensuring fail-fast on invalid env vars                                                  | **Criteria:** `.env.example` lists every required env var; config tests assert fail-fast on missing/invalid vars.<br>**Control:** CI check: `.env.example` stays in sync with code; config tests cover all required env vars.                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

#### 3.3.C Gate — Workflow and CI checks

_Activities that wrap around the coding work — Git discipline, pre-merge gates, and audit-evidence production._

| #   | Activity                                                      | Tool                    | Output                                                                                                                                   | Auditability                                                                                                                                                                                                                                                                                                                                                    | Comments (TL;DR) |
| --- | ------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Follow branching strategy: feature branch, meaningful commits | Git                     | `git log` output / commit history with descriptive messages                                                                              | **Criteria:** All commits follow Conventional Commits; each commit references issue/REQ UID; no WIP commits on `main`.<br>**Control:** Enforce Conventional Commits via commitlint; protect main branch.                                                                                                                                                        |                  |
| 2   | Run linter and formatter with configured rules                | Oxlint + Prettier       | `.oxlintrc` and `.prettierrc` config files at repo root + CI log (GitHub Actions run) showing `pnpm format` + lint pass with zero errors | **Criteria:** Config files present at repo root with rules matching team standard and versions pinned in lockfile; CI log shows zero lint errors and zero format diffs on the PR commit.<br>**Control:** Pin versions in lockfile; CI fails if config file missing or modified without review; upload lint results as CI artifact; block merge on lint failure. |                  |
| 3   | Produce auditable test evidence                               | Vitest + GitHub Actions | JUnit XML test report + coverage report archived as CI artifacts, retained per release                                                   | **Criteria:** Coverage meets or exceeds the defined threshold (e.g., 80%); JUnit + coverage reports are generated for every CI run and retained per release for traceability.<br>**Control:** Publish JUnit + coverage as CI artifacts; require minimum coverage threshold; block release on threshold violation.                                               |                  |

**Static analysis tools:**

- Activity C.2 ensures consistent code quality — rules are configured once at repo root and applied across the entire codebase
- Linting and formatting run before every commit (`pnpm format` via pre-commit hook)

**Documentation & code comments:**

- Activity B.2 enforces explaining _why_ something is done, not just _what_ it does
- Comments capture design decisions and constraints that are not obvious from the code itself

**Version control discipline:**

- Activity C.1 enforces clean commits with meaningful messages and a consistent branching strategy
- Each feature branch maps to a requirement UID for traceability

**Logging:**

- Activity B.3 adds logging requirements directly to the implementation — log levels, structured messages, and error context
- Logging statements are derived from the requirement spec, not added as an afterthought

**Environment & configuration testing:**

- Activity B.4 ensures code reads configuration from environment variables and validates them at startup
- The AI is explicitly asked to generate env-aware, config-aware code during implementation

**Auditable test evidence:**

- Activity C.3 produces and retains JUnit + coverage reports per release so any auditor (or future you) can verify test outcomes for any historical version

### 3.4 Phase 4: Integration & Unit Testing

**Goal:** Verify that modules work correctly in isolation and together, with automated security scanning and human review.

**How to read this section:** Phase 4 activities cluster into two groups:

- **A — Core work:** automated verification of Phase 3's output — unit, integration, and security checks run in CI
- **C — Gate:** human review followed by the merge action that releases the branch into `main`

_(Phase 4 has no group B because no new artifacts are authored here — every activity is verification or release.)_

#### 3.4.A Core work — Automated verification

_Tests and scans run in CI on every PR. They consume the artifacts produced in Phase 3 and produce auditable reports._

| #   | Activity                                                             | Tool           | Output                                                                                                         | Auditability                                                                                                                                                                                                                                                                                                                                       | Comments (TL;DR) |
| --- | -------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Run unit tests and feature security tests for the implemented module | Vitest         | JUnit XML test report — all unit tests and `tests/<feature>.security.test.ts` pass for the module in isolation | **Criteria:** 100% pass rate; coverage ≥ defined threshold (e.g., 80%); no skipped tests; all security template assertions pass per feature; minimum number of security tests met.<br>**Control:** Require minimum unit-test coverage threshold; archive reports per release; track security test count per feature and require minimum threshold. |                  |
| 2   | Run integration tests across dependent modules                       | Vitest         | JUnit XML test report — cross-module interactions verified                                                     | **Criteria:** All module-to-module interactions covered by at least one integration test; all pass.<br>**Control:** Publish coverage delta per PR; track cross-module test count.                                                                                                                                                                  |                  |
| 3   | Run automated security scanning on the codebase                      | GitHub Actions | SARIF / JSON security scan report with zero critical findings                                                  | **Criteria:** Zero critical and zero high findings; scan covers dependencies and secrets.<br>**Control:** Fail CI on critical findings; archive SARIF per release; upload to GitHub Security tab.                                                                                                                                                  |                  |

#### 3.4.C Gate — Human review and merge

_Final human approval and the release action that lands the branch on `main`. Both depend on every A activity having passed._

| #   | Activity                                  | Tool      | Output                                                                     | Auditability                                                                                                                                                                                                                          | Comments (TL;DR) |
| --- | ----------------------------------------- | --------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Execute code review (four-eyes principle) | GitHub PR | GitHub PR approval record — PR reviewed and approved by second team member | **Criteria:** At least one CODEOWNERS approval; PR checklist fully completed (correctness / style / traceability / logging).<br>**Control:** Require approvals from CODEOWNERS; enforce PR checklist template.                        |                  |
| 2   | Merge feature branch after approval       | Git       | `git log` output showing merge commit on main with clean history           | **Criteria:** Merge commit on protected `main`; all CI checks green at merge time; branch protection rules enforced.<br>**Control:** Protect `main`: no force-push, require review + CI green; enforce linear or merge-commit policy. |                  |

**Reusable test suite:**

- Activities A.1–A.2 use the test skeletons written in Phase 1 — tests are designed to be run consistently across every change
- Activity A.1 also validates that the security test templates from Phase 2 pass against the implementation
- Tests are deterministic, isolated, and repeatable in CI

**Automated security scanning:**

- Activity A.3 runs security scans as part of the integration pipeline (TruffleHog for secrets, dependency audit for vulnerabilities)

**Four-eyes / code review principle:**

- Activity C.1 enforces a human verification gate — no code merges without a second pair of eyes
- The reviewer checks correctness, style, traceability markers, and logging completeness

**Protected merge:**

- Activity C.2 lands the branch on `main` only when all CI checks are green and the human review has been approved

### 3.5 Phase 5: System & Acceptance Testing

**Goal:** Validate that the complete system meets requirements and performs within acceptable limits.

**How to read this section:** Phase 5 activities cluster into two groups:

- **A — Core work:** deploy to staging and run automated functional + performance tests
- **C — Gate:** automated NFR threshold check followed by Product Owner acceptance

_(Phase 5 has no group B because no new artifacts are authored here — every activity is verification or release approval.)_

#### 3.5.A Core work — Deploy and verify

_Set up the staging environment, then run automated functional and performance verification against it._

| #   | Activity                                                          | Tool                                                                  | Output                                                                                                                                                                  | Auditability                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Comments (TL;DR) |
| --- | ----------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Deploy the integrated system to a staging environment             | GitHub Actions                                                        | CI deployment log + staging URL — staging environment running the latest build                                                                                          | **Criteria:** Build succeeded; staging URL responds 200 on health endpoint; deployment tagged with release version.<br>**Control:** Tag staging deployments with release version; retain logs per retention policy.                                                                                                                                                                                                                                                                                                    |                  |
| 2   | Run end-to-end acceptance tests against staging                   | Vitest                                                                | JUnit XML test report — all acceptance criteria from requirements verified                                                                                              | **Criteria:** Every REQ acceptance criterion covered by at least one E2E test; all pass.<br>**Control:** Require every REQ acceptance criterion covered by at least one E2E test.                                                                                                                                                                                                                                                                                                                                      |                  |
| 3   | Run performance benchmarks (response times, query counts, memory) | Vitest + custom benchmarks + Logging/monitoring + Node.js diagnostics | Benchmark report (`.json` / `.md`) with response times per endpoint + monitoring export (`.csv` / `.json`) with query counts + `.heapsnapshot` or memory profile report | **Criteria:** Response times for each critical endpoint within NFR threshold with no regression vs baseline; query count per operation within NFR threshold with no N+1 patterns detected; memory usage under load within threshold with no upward trend across repeated runs (no leak).<br>**Control:** Store historical benchmarks and fail build on regression vs baseline; alert on query-count regressions and archive monitoring export per release; store heap snapshots per release for historical comparison. |                  |

#### 3.5.C Gate — Threshold and acceptance

_Automated NFR threshold check followed by explicit Product Owner sign-off. Both must pass before the increment ships._

| #   | Activity                                               | Tool                | Output                                                                                  | Auditability                                                                                                                                                                     | Comments (TL;DR) |
| --- | ------------------------------------------------------ | ------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Compare results against requirement-defined thresholds | StrictDoc + reports | `.md` comparison report with REQ UIDs — pass/fail per non-functional requirement        | **Criteria:** Every NFR has explicit pass/fail; all NFRs pass for the release to proceed.<br>**Control:** Formal NFR pass/fail gate in PR; block release on threshold violation. |                  |
| 2   | Obtain Product Owner acceptance of the increment       | GitHub PR / meeting | GitHub PR approval or `.md` meeting minutes — increment accepted or feedback in backlog | **Criteria:** Explicit approval recorded from PO; rejection feedback captured as backlog items.<br>**Control:** Require explicit PR approval from PO role via CODEOWNERS.        |                  |

**Performance testing:**

- Activity A.3 runs the performance benchmark suite (response times, query counts, memory usage) at the system level
- Thresholds are derived from non-functional requirements (linked via REQ UIDs)
- Performance regressions are caught before reaching production

**NFR threshold gate:**

- Activity C.1 automatically compares benchmark results to NFR thresholds and blocks release on any violation

**Product Owner acceptance:**

- Activity C.2 closes Phase 5 with explicit PO sign-off — no increment ships without it

### 3.6 Phase 6: Operation

**Goal:** Monitor the running system, detect anomalies, and feed runtime insights back into the next iteration.

**How to read this section:** Phase 6 activities cluster into two groups:

- **A — Core work:** one-time setup of observability infrastructure (alerts, log aggregation, health checks)
- **C — Loop back:** recurring review of production data that produces backlog items and lessons for the next iteration

_(Phase 6 has no group B because no quality obligations apply across the setup activities. It also has no traditional gate — instead of releasing an increment, group C feeds insights into Phase 1 of the next iteration.)_

#### 3.6.A Core work — Observability setup

_One-time creation of the monitoring infrastructure that will surface production behavior. These activities run when a feature is first deployed; afterwards they evolve incrementally._

| #   | Activity                                           | Tool                      | Output                                                                                    | Auditability                                                                                                                                                                                                                                                                                                                                 | Comments (TL;DR) |
| --- | -------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1   | Configure alerts (operational and security)        | Monitoring platform       | Alert rule config (`.yaml` / `.json`) covering critical paths and security-specific rules | **Criteria:** Alerts cover every critical path defined in NFR requirements; security alert fires after N failed authentication attempts within a time window; all alerts tested in staging before production.<br>**Control:** Version-control alert config; require PR review on any change; test alert firing in staging before production. |                  |
| 2   | Set up structured log aggregation from production  | Logging infrastructure    | Dashboard config file + URL — centralized, searchable log dashboard                       | **Criteria:** Dashboard queries cover every feature module; accessible to on-call team.<br>**Control:** Version-control dashboard config; export snapshot periodically.                                                                                                                                                                      |                  |
| 3   | Define runtime health checks and uptime monitoring | GitHub Actions / external | Health check config + uptime report — endpoints verified periodically                     | **Criteria:** Health endpoint returns status per NFR; measured uptime meets SLA for the period.<br>**Control:** Version-control health check config; archive monthly uptime reports.                                                                                                                                                         |                  |

#### 3.6.C Loop back — Production feedback to next iteration

_Recurring activities that close the loop between operation and planning. Production insights become backlog items and lessons that feed Phase 1 of the next iteration._

| #   | Activity                                           | Tool          | Output                                                             | Auditability                                                                                                                                                                                     | Comments (TL;DR) |
| --- | -------------------------------------------------- | ------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| 1   | Review runtime feedback and create backlog items   | GitHub Issues | GitHub Issue — new issues or requirements from production insights | **Criteria:** Production-derived issues labeled `origin:prod` and linked to incident ID or log reference.<br>**Control:** Label production-derived issues (`origin:prod`); link to incident ID.  |                  |
| 2   | Feed lessons learned into the next sprint planning | Team meeting  | `.md` retrospective notes + GitHub Issues with action items        | **Criteria:** Each action item has owner and due date; items tracked to closure via linked GitHub Issues.<br>**Control:** Publish retro notes to wiki; track action items to closure via labels. |                  |

**Observability:**

- Activities A.1–A.2 set alerts for unusual patterns, failed authentication attempts, and unexpected errors, plus structured log aggregation
- Activity A.3 verifies endpoints are reachable and meet uptime SLA
- Observability is not an afterthought; it is designed alongside the feature

**Feedback loop closure:**

- Activities C.1–C.2 close the runtime feedback loop — production insights feed directly into Phase 1 of the next iteration
- Backlog items derived from production carry an explicit `origin:prod` label so their provenance is traceable
