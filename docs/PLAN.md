# Planned sessions

Updated October 9, 2026 (America/Chicago). Eight sessions are a working plan, not a guarantee; sandbox and security integration may require additional time.

1. **Complete:** repository, approved UI prototype, React/TypeScript, frontend tests and public GitHub repository.
2. **Complete and merged:** infrastructure, backend configuration/health, migrations, 17 backend tests and successful GitHub backend CI; PR #1 merged.
3. **Complete locally:** typed repositories, registration/login/refresh/logout, admin provisioning, role/cohort access; 45 total backend tests pass. Push and remote CI remain pending.
4. **Next:** teacher workflows: cohort membership and assignment/rubric management.
5. Real submissions: archive validation, storage, queue and status lifecycle.
6. Isolated grading: sandbox constraints, timeouts, results, coverage and scoring.
7. Security scans and AI guidance: findings, severity mapping, hints and caching.
8. Integration/release preparation: dashboards, overrides, end-to-end tests, CI and reproducible setup.

## Current stop point

Session 3 ends here. Authentication is implemented and tested at the API level; the frontend remains a sample-data prototype. Session 4 starts with teacher CRUD workflows. No real student-code execution has been added. See SESSION_3.md for setup and verification.

## Commit discipline

One coherent change per commit, real timestamps, no artificial revisions or backdating. User-requested milestones supersede the source spec's strict backend-first order. Production tasks T01–T32 remain subject to their actual acceptance criteria; frontend sample flows do not count as real integrations.
