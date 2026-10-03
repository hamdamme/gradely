# Decisions

## 2026-10-03: prototype before implementation
The owner requested a visual prototype and a multi-day delivery pace. Today's implementation is a dependency-free browser prototype; the target application stack remains Java 17 / Spring Boot and React / TypeScript from the source specification. No production acceptance test is claimed by this milestone.

## Local preview
Keep the prototype in frontend/ with no credentials or services. Use in-memory sample data, clearly marked, and discard changes on reload. A chosen ZIP is validated by filename and size only; bytes are never read or uploaded.

## Repository
Default to a private GitHub repository named grader. Use the existing Git identity, Hamdam, and its configured GitHub no-reply email. GitHub authentication and Desktop filesystem permission are external setup prerequisites.

## Resolve before worker implementation
- An offline Maven container needs dependencies preloaded or an explicitly controlled provisioning stage.
- Copying output after exit conflicts with --rm and tmpfs; define a tested output collection lifecycle.
- JaCoCo prepare-agent alone does not produce an XML report; invoke report explicitly.
- gVisor requires a compatible Linux execution host; do not silently substitute weaker isolation on macOS.
- Self-registration is STUDENT-only despite the broader API example.
- Security findings cannot satisfy T17 until the later security tasks are implemented; separate those assertions.
