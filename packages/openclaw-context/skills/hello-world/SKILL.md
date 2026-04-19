# Skill: hello-world

## Purpose

Proof-of-concept skill that validates the connection between the **Team_Repo_OpenClaw_Assistant** monorepo and the OpenClaw agent. Use this skill to confirm OpenClaw can read the project structure and execute basic commands. Closes **Issue #21**.

## Instructions

When invoked, OpenClaw must perform the following steps **in order**:

1. **Create a hello file** — Write a file called `hello-openclaw.txt` in the repository root with the content:
   ```
   Hello from OpenClaw!
   Timestamp: <current date and time in ISO 8601 format>
   ```
2. **List monorepo workspaces** — Run the command:
   ```bash
   pnpm ls --depth 0
   ```
   and include the output in the response so the user can verify all workspaces are detected.

## Expected Output

- A new file `hello-openclaw.txt` at the project root.
- A printed list of the PNPM workspaces (`@team/api`, `@team/web`, `@team/config`, `@team/openclaw-context`).

## Example Prompts

- "Run the hello-world skill to test the OpenClaw connection."
- "Execute hello-world and show me the workspace list."
- "Create the hello file and verify the monorepo workspaces are working."
