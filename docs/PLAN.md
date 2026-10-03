# Four-day working plan

Target dates use America/Chicago. This is a working estimate, not a promise that all 32 production acceptance tests fit four days.

## October 3 — foundation and prototype
- [x] Initialize Git, MIT license, ignore rules, and preserve the source spec.
- [x] Build student prototype; validate filtering, feedback, hints and missing-file state.
- [x] Verify ZIP validation and complete simulated grading lifecycle in component tests.
- [ ] Complete native browser file-chooser verification.
- [x] Review prototype with the project owner; light developer-workspace direction selected.
- [x] Move repository to Desktop/gradely.
- [ ] Publish a public GitHub repository after CLI authentication.

Stop after prototype validation and handoff. Do not begin backend implementation today.

## October 4 — application foundation
React/TypeScript port completed early at the owner's request on October 3. Bootstrap Spring Boot, database migrations, role-based auth, cohorts and assignments. Add meaningful tests and CI. Validate authorization across cohort boundaries.

## October 5 — submission and grading
Add storage, queue, and isolated worker. Prove offline Maven dependencies, output extraction, timeout cleanup, and gVisor availability before executing untrusted submissions. Add grading and scanning incrementally.

## October 6 — integration and release candidate
Wire results, hints and instructor workflows. Run end-to-end checks, document setup and unresolved issues. Defer features that do not meet acceptance criteria; do not call a prototype production-ready.

## Commit discipline
One coherent change per commit, with real timestamps and truthful messages. Revise code when requirements or validation justify it. Never add artificial churn or backdate commits. User-requested prototype work supersedes the spec's backend-first task order; T01–T32 remain uncompleted until their actual acceptance tests pass.
