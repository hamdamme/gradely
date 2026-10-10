# Planned sessions

Updated October 9, 2026 (America/Chicago). Eight sessions are a working plan, not a guarantee; sandbox and security integration may require additional time.

1. **Complete:** repository, approved UI prototype, React/TypeScript, frontend tests and public GitHub repository.
2. **Complete and merged:** infrastructure, backend configuration/health, migrations, 17 backend tests and successful GitHub backend CI; PR #1 merged.
3. **Complete locally:** typed repositories, registration/login/refresh/logout, admin provisioning, role/cohort access; 45 total backend tests pass. Push and remote CI remain pending.
4. **Complete locally:** teacher cohort creation/enrollment/read APIs, validated assignments and Swagger documentation.
5. **Complete locally:** ZIP validation, MinIO uploads/downloads, durable RabbitMQ dispatch, attempt/deadline checks and status lifecycle; 62 backend tests pass.
6. **Next:** isolated grading: sandbox constraints, timeouts, results, coverage and scoring.
7. Security scans and AI guidance: findings, severity mapping, hints and caching.
8. Integration/release preparation: dashboards, overrides, end-to-end tests, CI and reproducible setup.

## Current stop point

Sessions 4 and 5 end here. Teacher and upload APIs are implemented and tested; the frontend remains a sample-data prototype. Session 6 adds sandboxed grading. Accepted submissions remain QUEUED until then. See SESSION_4_5.md for verification, delivery guarantees and limitations.

## Commit discipline

One coherent change per commit, real timestamps, no artificial revisions or backdating. User-requested milestones supersede the source spec's strict backend-first order. Production tasks T01–T32 remain subject to their actual acceptance criteria; frontend sample flows do not count as real integrations.
