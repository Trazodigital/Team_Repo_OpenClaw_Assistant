# Skill Specification — Playwright Website Verifier

## 1. Introduction

### 1.1 Purpose

This ability provides **automated end-to-end verification of a WordPress-based Learning Management System built on the LearnDash plugin**. It confirms that the site is reachable, responsive, and that every step of the learner journey works as expected — from landing page through login, course navigation, video playback, quiz completion, progression gating, and final PDF certificate download.

The ability operates by **mirroring a real user's interaction with the site** using Playwright, rather than probing the server through isolated API calls. This exercises the full stack (web server, WordPress, LearnDash, media delivery, certificate generation) exactly as an end user would, allowing regressions in availability, content, or functional behaviour to be caught before they affect learners.

The ability supports two execution modes:

- **Single-user run** — verification for one learner account.
- **Batch run** — verification for many accounts in sequence, with credentials supplied via a CSV input file.

Detailed behavioural requirements for each step of the flow, input schemas, and pass/fail criteria are specified in §3 (Functional requirements) and §5 (External interfaces).

### 1.2 Scope

The skill must be configurable to scan any URL. For developing and testing purposes following URL shall be used: https://arbeitsschutz-elearning.de/
Use following user: Octavio.Becerril

### 1.3 Definitions and acronyms

_TODO_

### 1.4 References

_TODO_

### 1.5 Document overview

_TODO_

## 2. Overall description

### 2.1 Product context

_TODO_

### 2.2 Users and roles

_TODO_

### 2.3 Assumptions and dependencies

_TODO_

### 2.4 Constraints

_TODO_

## 3. Functional requirements

_TODO — requirements with unique UIDs (REQ-FUNC-xxx), inputs, outputs, acceptance criteria._

## 4. Non-functional requirements

### 4.1 Performance

_TODO_

### 4.2 Reliability and error handling

_TODO_

### 4.3 Security

_TODO_

### 4.4 Maintainability and portability

_TODO_

### 4.5 Observability

_TODO_

## 5. External interfaces

### 5.1 User / invocation interface

_TODO_

### 5.2 Software interfaces (OpenClaw host, Playwright)

_TODO_

### 5.3 Data contracts and schemas

_TODO_

## 6. Test strategy

### 6.1 Test scope

_TODO_

### 6.2 Test environment and fixtures

_TODO_

### 6.3 Acceptance criteria mapping

_TODO — maps each REQ-FUNC UID to its acceptance test._

## 7. Traceability

_TODO — matrix of requirement UIDs to design elements, tests, and source modules._

## 8. Risks and open questions

_TODO_

## 9. Appendices

_TODO_
