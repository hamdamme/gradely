# Gradely

Automated grading and security feedback for Java test-automation students.

## Status
Day 1: repository foundation and local interaction prototype. No backend, authentication, code execution, or real scanning is implemented yet.

## Run the prototype
Requires Python 3. From the repository root:

```sh
python3 -m http.server 5173 --directory frontend
```

Open http://localhost:5173. All records are fictional demonstration data.

## License
MIT — see LICENSE.

## Repository layout

```text
frontend/       Local browser prototype (HTML, CSS, JavaScript)
docs/BUILD_SPEC.md  Original requirements, preserved as reference
docs/PLAN.md     Four-day working plan and stop point
docs/HANDOFF.md  Completed checks and next session
DECISIONS.md     Scope and architecture decisions
```

## Development workflow
Work in short-lived feature branches once the initial foundation is reviewed. Keep commits focused on a coherent change; document why a revision is needed. Never commit credentials, node_modules, build output, or student submissions.

Check JavaScript syntax with `node --check frontend/app.js`. Open the prototype in a browser to verify behavior. No package installation is required to run it. The prototype does not implement the production React or Spring Boot stack yet.

## GitHub repository

Target: https://github.com/hamdamme/gradely (public). Publication status is recorded in docs/HANDOFF.md.

The project was renamed from Grader to Gradely on October 3, 2026. The original requirements remain unmodified in docs/BUILD_SPEC.md for traceability.
