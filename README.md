# Gradely

Automated grading and security feedback for Java test-automation students.

## Current milestone

React + TypeScript student prototype with a light developer workspace. Assignment browsing, submission simulation, test results, security feedback, hints, and progress use explicit sample data. No backend, authentication, code execution, real scanning, or AI service is implemented yet.

## Run locally

Use Node.js 24 LTS (minimum 22.12) and npm.

```sh
cd frontend
npm ci
npm run dev
```

Open http://127.0.0.1:5176. The server binds to loopback and fails clearly if its port is occupied. The earlier Python preview is obsolete; it cannot serve React source files.

```sh
npm test          # component and submission lifecycle checks
npm run build    # strict TypeScript check plus production build
npm run preview  # preview the build at http://127.0.0.1:5175
```

All file selection is local. No ZIP bytes are uploaded or executed. Simulated submissions show the same labeled Java Fundamentals sample report, not an analysis of the selected project. Reloading discards local interaction state.

## Structure

```text
frontend/
  src/
    components/   Shared shell and visual components
    data/         Typed demo fixtures
    lib/          File-selection validation
    pages/        Assignments, submission, results, progress
    App.tsx       Routes, including not-found handling
    App.test.tsx  Submission lifecycle and interaction checks
  public/         Static assets
  package-lock.json
.github/workflows/frontend.yml
  npm ci -> tests -> typecheck + build -> dependency audit

docs/BUILD_SPEC.md  Original requirements, preserved verbatim
DECISIONS.md       Scope and technology decisions
docs/PLAN.md       Working schedule
docs/HANDOFF.md    Verified status and next session
```

## Development workflow

Use short-lived feature branches and commits that represent coherent changes. Record meaningful decisions, run relevant checks, and keep the lockfile committed. Do not commit credentials, dependency folders, build output, or student submissions. CI is configured for frontend changes; a successful local run does not imply a GitHub Actions run has occurred.

The prototype keeps React 18. Patched Vite, Router, Vitest, and compatible TypeScript versions supersede the older build-spec versions; exact installed versions are pinned in package.json and package-lock.json. The visual design and Java/Spring target remain unchanged. Tailwind, charts, API clients and authentication are deferred until needed for the next implementation slices.

## GitHub

Requested public repository: https://github.com/hamdamme/gradely. Publication has not been confirmed and no remote is configured locally. From the owner's authenticated Terminal, inspect whether it already exists before running:

```sh
gh repo create gradely --public --source=/Users/nazar/Desktop/gradely --remote=origin --push
```

If it already exists, inspect its contents and connect the correct remote instead of creating or overwriting a repository.

## License

MIT — see LICENSE.
