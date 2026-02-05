---
description: Conventional commit types and format — use when suggesting or writing commit messages
alwaysApply: true
---

# Conventional Commits

Cursor MUST use this format when suggesting or writing commit messages.

## Format

```
<type>[(scope)]: <short description>

[optional body]
[optional footer]
```

- **type**: One of the allowed types below (required).
- **scope**: Optional area of the app (e.g. `auth`, `navigation`, `home`).
- **description**: Short, imperative, lowercase start, no period at end (e.g. "add login screen" not "Added login screen").

## Allowed Types

| Type         | Use for                                       | Example                                        |
| ------------ | --------------------------------------------- | ---------------------------------------------- |
| **feat**     | New feature                                   | `feat: add OTP screen`                         |
| **fix**      | Bug fix                                       | `fix: prevent crash on back from task details` |
| **chore**    | Tooling, deps, config (no user-facing change) | `chore: add husky pre-commit`                  |
| **docs**     | Documentation only                            | `docs: update README setup`                    |
| **style**    | Formatting, whitespace (no logic change)      | `style: run prettier`                          |
| **refactor** | Code change that is not a fix or a feature    | `refactor: simplify onboarding flow`           |
| **perf**     | Performance improvement                       | `perf: memoize home list`                      |
| **test**     | Adding or updating tests                      | `test: add form validation tests`              |
| **ci**       | CI/CD config                                  | `ci: add GitHub Actions workflow`              |
| **build**    | Build system or dependency bumps              | `build: bump react-native to 0.83`             |

## Scope Examples (optional)

- `feat(auth): add OTP screen`
- `fix(navigation): resolve Metro alias for @navigation`
- `chore(deps): upgrade react-hook-form`
- `refactor(utils): use alias imports only`

## Breaking Changes

- Append `!` after type/scope: `feat!: remove legacy onboarding`
- Or use footer: `BREAKING CHANGE: remove legacy onboarding`

## Rules

- Always use one of the allowed types.
- Keep the subject line under ~72 characters.
- Use imperative mood: "add" not "added", "fix" not "fixed".
- Do not end the subject with a period.
