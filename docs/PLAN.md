# Planned sessions

Updated October 4, 2026 (America/Chicago). Eight sessions are a working plan, not a guarantee; sandbox and security integration may require additional time.

1. **Complete:** repository, approved UI prototype, React/TypeScript, frontend tests and public GitHub repository.
2. **Complete locally:** infrastructure, backend configuration/health, migrations, 17 backend tests and backend CI definition. Review and push the feature branch next.
3. **Next:** entities/repositories, registration/login/refresh, role and cohort access tests.
4. Teacher workflows: cohort membership and assignment/rubric management.
5. Real submissions: archive validation, storage, queue and status lifecycle.
6. Isolated grading: sandbox constraints, timeouts, results, coverage and scoring.
7. Security scans and AI guidance: findings, severity mapping, hints and caching.
8. Integration/release preparation: dashboards, overrides, end-to-end tests, CI and reproducible setup.

## Current stop point

Session 2 ends here. Do not add authentication or real student-code execution in this session. Backend tests and live service checks must pass before handoff. Remote backend CI is unverified until the feature branch is pushed.

## Commit discipline

One coherent change per commit, real timestamps, no artificial revisions or backdating. User-requested milestones supersede the source spec's strict backend-first order. Production tasks T01–T32 remain subject to their actual acceptance criteria; frontend sample flows do not count as real integrations.
