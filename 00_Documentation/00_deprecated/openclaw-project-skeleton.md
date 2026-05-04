# OpenClaw Assistant - Agile Project Skeleton

---

## Phase 1: Initiating

### 1.1 Product Vision

| Question                                    | Answer |
| ------------------------------------------- | ------ |
| What problem does OpenClaw Assistant solve? | _TODO_ |
| Who is the target user?                     | _TODO_ |
| What is the value proposition?              | _TODO_ |
| What does success look like?                | _TODO_ |

### 1.2 Stakeholders

| Role                       | Person |
| -------------------------- | ------ |
| Key stakeholders           | _TODO_ |
| Product Owner              | _TODO_ |
| Scrum Master / facilitator | _TODO_ |
| End users                  | _TODO_ |

### 1.3 Scope and Constraints

| Question                                                     | Answer                                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| What is in scope for the initial release?                    | _TODO_                                                                        |
| What is explicitly out of scope?                             | _TODO_                                                                        |
| Known constraints (budget, time, regulatory)                 | Team dedication: 20% (drives one-week sprint cadence); Team size: two persons |
| Compliance or legal requirements (e.g., medical data, HIPAA) | _TODO_                                                                        |

### 1.4 Agile Approach

| Question        | Answer                                                    |
| --------------- | --------------------------------------------------------- |
| Agile framework | Scrum (adapted for a two-person team with 20% dedication) |
| Sprint duration | One-week sprints (due to 20% dedication level)            |
| Ceremonies      | Weekly meeting: Monday 2:00 PM, 30 minutes                |

### 1.5 Tooling Decisions

**Quick Reference:**

| Area               | Tool             |
| ------------------ | ---------------- |
| Backlog management | GitHub Projects  |
| Version control    | GitHub           |
| Communication      | WhatsApp / Gmail |
| CI/CD              | GitHub Actions   |
| Meetings           | Teams            |

#### Backlog Management - GitHub Projects

| Criteria in Favor                                 | Limitations                             |
| ------------------------------------------------- | --------------------------------------- |
| Issues and PRs linked directly to the backlog     | No native sprints                       |
| Native automations on issue close or merge        | No burndown chart or automatic velocity |
| Custom fields: story points, sprint, priority     | Limited agile reports vs Jira           |
| Already integrated in GitHub, no additional setup |                                         |

| Discarded Tool | Reason                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| Notion         | Lack of integration with technical tools, impossible code traceability |
| Jira           | Learning curve, excessive configuration for a two-person team          |

#### Requirements / Documentation

> **PMI Process Group: Planning** — Requirements engineering approach and tooling defined as part of Scope Management Planning.

| Tool                   | Purpose                                   | Status                |
| ---------------------- | ----------------------------------------- | --------------------- |
| StrictDoc              | Requirements engineering (Markdown-based) | Pending Configuration |
| GitHub Repository Wiki | Documentation                             | Configured            |

**CI integration:** GitHub Actions validates requirements on push/PR (`strictdoc export requirements/`). See [requirements-engineering.md](requirements-engineering.md) for full details.

#### Source Control - GitHub

| Criteria in Favor                                | Limitations                                               |
| ------------------------------------------------ | --------------------------------------------------------- |
| GitHub Actions integrated                        | Jira integration requires additional app (not applicable) |
| GitHub Projects for backlog on the same platform |                                                           |
| Dependabot for automatic updates                 |                                                           |
| Unified stack on a single platform               |                                                           |

| Discarded Tool | Reason                                                   |
| -------------- | -------------------------------------------------------- |
| Bitbucket      | Smaller ecosystem, lower compatibility with the AI stack |

#### CI/CD - GitHub Actions

| Criteria in Favor                    | Limitations                   |
| ------------------------------------ | ----------------------------- |
| Direct integration with GitHub       | Can be slow in some pipelines |
| Triggered by repository events       |                               |
| Self-hosted runner support           |                               |
| Dependency caching and Matrix Builds |                               |

| Discarded Tool      | Reason                                        |
| ------------------- | --------------------------------------------- |
| Bitbucket Pipelines | Only supports Linux, incompatible with GitHub |

#### Communication

| Channel                   | Tool             | Status        |
| ------------------------- | ---------------- | ------------- |
| Main communication        | WhatsApp / Gmail | Active        |
| Meetings                  | Teams            | Active        |
| Meeting minutes tool      | _TODO_           | To be defined |
| Urgent questions protocol | _TODO_           | To be defined |

#### Testing

| Tool   | Status                |
| ------ | --------------------- |
| Vitest | Installed and running |

#### Design / Prototyping

| Tool   | Status |
| ------ | ------ |
| _TODO_ | _TODO_ |

### 1.6 Feasibility

| Question                            | Answer                                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Is the technical approach feasible? | Yes. Technical stack installed and validated. Repository initialized, tests running correctly.                                       |
| Strategic decision                  | Entire stack uses GitHub and its native tools to ensure full compatibility and traceability. Prepared by: Octavio Becerril Olivares. |
| Proof of concept or spike needed?   | _TODO_                                                                                                                               |

**Technology Risks / Unknowns:**

| Risk                                   | Status                |
| -------------------------------------- | --------------------- |
| GitHub Actions CI/CD pipeline          | Pending Configuration |
| StrictDoc for requirements engineering | Pending Configuration |

### 1.7 Setup Session (Completed)

> **PMI Process Group: Executing** — Actual work performed to set up the project environment and infrastructure.

| Task                                                     | Status |
| -------------------------------------------------------- | ------ |
| Repository initialized in the Trazodigital organization  | Done   |
| Technical stack installed and working                    | Done   |
| Tests running correctly with Vitest                      | Done   |
| .gitignore configured                                    | Done   |
| Wiki migrated to the main repository                     | Done   |
| Issues and Projects board configured for the next sprint | Done   |

---

## Phase 2: Planning

### 2.1 Product Backlog

- **What are the high-level epics?**
  - _TODO_
- **What are the user stories for the first release?**
  - _TODO_
- **How are stories prioritized (MoSCoW, value vs effort, etc.)?**
  - _TODO_

### 2.2 Definition of Done

- **What criteria must a story meet to be considered done?**
  - To be defined

**Quality Gates:**

| Gate                      | Tool      | Notes                                 |
| ------------------------- | --------- | ------------------------------------- |
| Linting                   | Oxlint    |                                       |
| Formatting                | Prettier  | Run `pnpm format` before every commit |
| Testing                   | Vitest    |                                       |
| Code review               | _TODO_    | To be defined                         |
| Documentation             | _TODO_    | To be defined                         |
| Requirements traceability | StrictDoc | REQ IDs referenced in code and tests  |

### 2.3 Definition of Ready

- **What must a story have before it enters a sprint?**
  - To be defined

### 2.4 Architecture and Technical Decisions

#### Architecture

- **What is the high-level architecture?**
  - _TODO_
- **What are the key integration points?**
  - _TODO_
- **What are the data models and domain boundaries?**
  - Domain models live in `packages/openclaw-context/` (imported as `@team/openclaw-context`)

#### Technology Stack

| Area                     | Tool                     | Status                                                     |
| ------------------------ | ------------------------ | ---------------------------------------------------------- |
| Language                 | TypeScript               | Installed                                                  |
| Runtime                  | Node.js 22+              | Confirmed                                                  |
| Package manager          | PNPM + Workspace         | Installed                                                  |
| Bundler                  | Tsdown                   | Installed                                                  |
| Linter                   | Oxlint                   | Installed                                                  |
| Formatter                | Prettier                 | Installed (changed because oxfmt is not available in pnpm) |
| Test runner              | Vitest                   | Installed                                                  |
| CI/CD                    | GitHub Actions           | Pending Configuration                                      |
| Version control          | GitHub                   | Confirmed                                                  |
| Task management          | GitHub Issues + Projects | Installed                                                  |
| Documentation            | GitHub Repository Wiki   | Configured                                                 |
| Requirements engineering | StrictDoc                | Pending Configuration                                      |

#### Requirements Engineering Approach

See full details: [requirements-engineering.md](requirements-engineering.md)

**Requirement Levels:**

| Level                | ID Convention | Description                       |
| -------------------- | ------------- | --------------------------------- |
| Vision / Stakeholder | REQ-VIS-xxx   | High-level goals                  |
| System               | REQ-SYS-xxx   | System capabilities               |
| Software             | REQ-SW-xxx    | Implementation-level requirements |

**Traceability chain:** Requirement -> Code (REQ ID in comments) -> Test (verifies REQ ID)

**Repository structure for requirements:**

| Folder          | Role                                |
| --------------- | ----------------------------------- |
| `requirements/` | Formal requirements (`.sdoc` files) |
| `design/`       | Architecture / design decisions     |
| `docs/adr/`     | Architecture Decision Records       |

**CI validation:** GitHub Actions runs `strictdoc export requirements/` on push/PR to ensure requirements compile, links are valid, and documentation stays up to date.

**Requirements change workflow:** `Idea -> GitHub Issue -> Requirement (.sdoc) -> Design document -> Implementation -> Tests`

### 2.5 Release Plan

- **What is the target date for the first release (MVP)?**
  - _TODO_
- **How many sprints are estimated for MVP?**
  - _TODO_
- **What features define the MVP?**
  - _TODO_

### 2.6 Risk Management

- **What are the top identified risks?**
  - _TODO_
- **What is the mitigation strategy for each?**
  - _TODO_
- **Who owns risk monitoring?**
  - _TODO_

### 2.7 Communication Plan

| Channel                   | Detail                          | Status        |
| ------------------------- | ------------------------------- | ------------- |
| Weekly sync               | Monday 2:00 PM, 30 minutes      | Active        |
| Main channel              | WhatsApp, email, or Google Meet | To be defined |
| Urgent questions protocol | _TODO_                          | To be defined |
| Stakeholder updates       | _TODO_                          | To be defined |
| Project status visibility | GitHub Issues + Projects board  | Active        |

### 2.8 Resource Planning

| Question                                 | Answer |
| ---------------------------------------- | ------ |
| Team members and roles                   | _TODO_ |
| Skill gaps to address                    | _TODO_ |
| External resources or contractors needed | _TODO_ |

---

## Phase 3: Executing (Per Sprint)

### 3.1 Sprint Planning

| Question           | Answer |
| ------------------ | ------ |
| Sprint goal        | _TODO_ |
| Committed stories  | _TODO_ |
| Estimated capacity | _TODO_ |

### 3.2 Development

| Question                                     | Answer |
| -------------------------------------------- | ------ |
| Coding standards and conventions documented? | _TODO_ |
| Branching strategy defined?                  | _TODO_ |
| Code reviews happening?                      | _TODO_ |

### 3.3 Testing

| Type                            | Status                              |
| ------------------------------- | ----------------------------------- |
| Unit tests                      | Yes. Running correctly with Vitest. |
| Integration testing             | _TODO_                              |
| End-to-end / acceptance testing | _TODO_                              |

### 3.4 Stakeholder Collaboration

| Question                                     | Answer |
| -------------------------------------------- | ------ |
| Product Owner available for clarifications?  | _TODO_ |
| Stakeholders reviewing increments regularly? | _TODO_ |

### 3.5 Deliverables

| Deliverable               | Status |
| ------------------------- | ------ |
| Working product increment | _TODO_ |
| Updated backlog           | _TODO_ |
| Sprint burndown / metrics | _TODO_ |

---

## Phase 4: Monitoring and Controlling (Continuous)

### 4.1 Progress Tracking

| Metric                                           | Status |
| ------------------------------------------------ | ------ |
| Tracked metrics (velocity, burndown, cycle time) | _TODO_ |
| On track for sprint goals?                       | _TODO_ |
| On track for release goals?                      | _TODO_ |

### 4.2 Quality Control

| Question                      | Answer |
| ----------------------------- | ------ |
| Quality standards being met?  | _TODO_ |
| Defects tracked and resolved? | _TODO_ |
| Technical debt managed?       | _TODO_ |

### 4.3 Scope Control

| Question                                           | Answer |
| -------------------------------------------------- | ------ |
| New requests captured in backlog (not mid-sprint)? | _TODO_ |
| Scope creep managed?                               | _TODO_ |

### 4.4 Risk Monitoring

| Question                        | Answer |
| ------------------------------- | ------ |
| New risks emerged?              | _TODO_ |
| Existing mitigations effective? | _TODO_ |

### 4.5 Retrospective Actions

| Question                 | Answer |
| ------------------------ | ------ |
| What went well?          | _TODO_ |
| What needs improvement?  | _TODO_ |
| Actions for next sprint? | _TODO_ |

---

## Phase 5: Closing

### 5.1 Sprint Closing (Per Sprint)

| Question                             | Answer |
| ------------------------------------ | ------ |
| Sprint goal achieved?                | _TODO_ |
| Increment accepted by Product Owner? | _TODO_ |
| Retrospective actions documented?    | _TODO_ |

### 5.2 Release Closing

| Question                       | Answer |
| ------------------------------ | ------ |
| All acceptance criteria met?   | _TODO_ |
| Release deployed and verified? | _TODO_ |
| User documentation complete?   | _TODO_ |

### 5.3 Project Closing

| Question                                  | Answer |
| ----------------------------------------- | ------ |
| Final acceptance from stakeholders?       | _TODO_ |
| Lessons learned documented?               | _TODO_ |
| Contracts and external agreements closed? | _TODO_ |
| Team released or reassigned?              | _TODO_ |
| Final project report complete?            | _TODO_ |
