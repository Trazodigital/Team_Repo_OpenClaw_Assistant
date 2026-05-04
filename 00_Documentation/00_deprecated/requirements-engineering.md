# Requirements Engineering with StrictDoc

---

## 1. Repository Structure

A clean structure is critical. One common setup:

```
repo/
|
├─ requirements/
|   ├─ vision.sdoc
|   ├─ system_requirements.sdoc
|   ├─ software_requirements.sdoc
|
├─ design/
|   ├─ architecture.md
|   ├─ agent_loop_design.md
|
├─ src/
|
├─ tests/
|
├─ docs/
|
└─ strictdoc.toml
```

**Purpose:**

| Folder       | Role                            |
| ------------ | ------------------------------- |
| requirements | Formal requirements             |
| design       | Architecture / design decisions |
| src          | Implementation                  |
| tests        | Requirement verification        |

---

## 2. Requirement Levels

Use three levels of requirements.

### 1. Vision / Stakeholder Requirements

High-level goals.

Example:

```
[REQ-VIS-001]
The system shall provide an AI agent capable of performing autonomous tasks.
```

### 2. System Requirements

Describe system capabilities.

```
[REQ-SYS-010]
The system shall allow the agent to execute shell commands.
```

### 3. Software Requirements

Implementation-level requirements.

```
[REQ-SW-042]
The agent shall provide a shell tool that executes commands and returns stdout/stderr.
```

---

## 3. Traceability Links

StrictDoc supports explicit links between requirements.

Example:

```
REQ-VIS-001
  |
REQ-SYS-010
  |
REQ-SW-042
```

**Traceability chain:**

```
Stakeholder need
  |
System requirement
  |
Software requirement
  |
Code
  |
Test
```

---

## 4. Example .sdoc File

Example software requirements file:

```
DOCUMENT: Software Requirements
TITLE: OpenClaw Software Requirements

[REQ-SW-042]
TITLE: Shell tool execution
STATEMENT:
The agent shall provide a shell tool that executes system commands.

RATIONALE:
Required for interacting with development environments.

VERIFICATION:
Automated test.

PARENT:
REQ-SYS-010
```

---

## 5. Linking Requirements to Code

You reference requirements in the code.

Example TypeScript:

```typescript
// REQ-SW-042
export async function runShellCommand(cmd: string) {
  return exec(cmd);
}
```

This creates traceability:

```
Requirement -> Implementation
```

---

## 6. Linking Requirements to Tests

Tests verify requirements.

Example:

```typescript
// Verifies REQ-SW-042
test("shell tool executes commands", async () => {
  const result = await runShellCommand("echo test");
  expect(result.stdout).toContain("test");
});
```

Traceability becomes:

```
Requirement
  |
Code
  |
Test
```

---

## 7. Generating Documentation

StrictDoc can generate HTML documentation automatically.

**Command:**

```bash
strictdoc export requirements/
```

**Output:**

```
docs/
 ├─ requirements.html
 ├─ traceability_matrix.html
 └─ coverage_report.html
```

You get:

- Requirement specs
- Traceability matrix
- Requirement coverage

---

## 8. CI Integration

Use GitHub Actions to validate requirements.

**Example workflow:**

```yaml
name: requirements-check

on: [push, pull_request]

jobs:
  strictdoc:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install strictdoc
      - run: strictdoc export requirements/
```

**CI ensures:**

- Requirements compile
- Links are valid
- Documentation stays up to date

---

## 9. Requirements Change Workflow

**Typical lifecycle:**

```
idea
  |
GitHub issue
  |
requirement written (.sdoc)
  |
design document
  |
implementation
  |
tests
```

**Pull request example:**

```
PR #120
Adds REQ-SW-073: File search tool
```

---

## 10. Traceability Matrix Example

StrictDoc can generate:

| Requirement | Code         | Test              |
| ----------- | ------------ | ----------------- |
| REQ-SW-042  | shell.ts     | shell.test.ts     |
| REQ-SW-043  | file_tool.ts | file_tool.test.ts |

This helps answer:

- Which requirements are implemented?
- Which are tested?

---

## 11. Architecture Decision Records (Recommended)

Combine StrictDoc with ADRs.

**Folder:**

```
docs/adr/
```

**Examples:**

- ADR-001: Agent architecture
- ADR-002: Tool interface design
- ADR-003: LLM provider abstraction

This documents design decisions linked to requirements.

---

## 12. Minimal Tool Stack

For a GitHub project:

| Purpose          | Tool           |
| ---------------- | -------------- |
| Requirements     | StrictDoc      |
| Discussion       | GitHub Issues  |
| Implementation   | Git            |
| CI               | GitHub Actions |
| Design decisions | ADRs           |

This gives professional requirements engineering without enterprise overhead.

---

## Final Result

Full traceability in Git:

```
requirements
  |
design
  |
implementation
  |
tests
```
