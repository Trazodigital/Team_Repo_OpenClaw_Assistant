# Security Policy

## Reporting a Vulnerability

Do NOT open a public GitHub issue for security vulnerabilities.
Use **GitHub Private Advisories**: Security → Advisories → Report a vulnerability.
Include: description, reproduction steps, affected version, optional fix suggestion.

## Response SLA

| Step            | Target                 |
| --------------- | ---------------------- |
| Acknowledgement | 48 h                   |
| Triage          | 5 business days        |
| Fix             | Based on CVSS severity |

## Practices

- Secret scanning via Gitleaks on every push (CI)
- Dependabot weekly updates enabled
- No secrets in code — use .env (see .env.example)
