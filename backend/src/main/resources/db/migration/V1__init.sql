CREATE TABLE users (
    id              BIGSERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(100) NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    role            VARCHAR(20)  NOT NULL CHECK (role IN ('STUDENT','INSTRUCTOR','ADMIN')),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE cohorts (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    instructor_id   BIGINT NOT NULL REFERENCES users(id),
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cohort_members (
    cohort_id   BIGINT NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    student_id  BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (cohort_id, student_id)
);

CREATE TABLE assignments (
    id              BIGSERIAL PRIMARY KEY,
    cohort_id       BIGINT NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    rubric_json     JSONB NOT NULL,          -- see §5.1
    due_date        TIMESTAMPTZ,
    max_attempts    INT NOT NULL DEFAULT 3,
    build_command   VARCHAR(255) NOT NULL DEFAULT 'mvn -B test',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE submissions (
    id              BIGSERIAL PRIMARY KEY,
    assignment_id   BIGINT NOT NULL REFERENCES assignments(id),
    student_id      BIGINT NOT NULL REFERENCES users(id),
    attempt_number  INT NOT NULL,
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    status          VARCHAR(20) NOT NULL DEFAULT 'QUEUED'
                    CHECK (status IN ('QUEUED','RUNNING','GRADED','FAILED','TIMEOUT')),
    storage_path    VARCHAR(512) NOT NULL,   -- MinIO object key of zip
    commit_hash     VARCHAR(64),
    UNIQUE (assignment_id, student_id, attempt_number)
);

CREATE TABLE grading_results (
    id                  BIGSERIAL PRIMARY KEY,
    submission_id       BIGINT NOT NULL UNIQUE REFERENCES submissions(id),
    build_success       BOOLEAN NOT NULL,
    build_log_path      VARCHAR(512),
    tests_total         INT NOT NULL DEFAULT 0,
    tests_passed        INT NOT NULL DEFAULT 0,
    tests_failed        INT NOT NULL DEFAULT 0,
    tests_flaky         INT NOT NULL DEFAULT 0,
    coverage_line_pct   NUMERIC(5,2),
    coverage_branch_pct NUMERIC(5,2),
    score               NUMERIC(5,2),
    rubric_breakdown    JSONB,               -- per-criterion scores
    graded_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE test_case_results (
    id              BIGSERIAL PRIMARY KEY,
    grading_result_id BIGINT NOT NULL REFERENCES grading_results(id) ON DELETE CASCADE,
    test_name       VARCHAR(512) NOT NULL,
    status          VARCHAR(10) NOT NULL CHECK (status IN ('PASSED','FAILED','FLAKY','SKIPPED')),
    duration_ms     BIGINT,
    error_message   TEXT,
    stack_trace     TEXT
);

CREATE TABLE security_findings (
    id              BIGSERIAL PRIMARY KEY,
    submission_id   BIGINT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    source          VARCHAR(20) NOT NULL CHECK (source IN ('SEMGREP','DEPENDENCY_CHECK')),
    rule_id         VARCHAR(255),
    cwe_id          VARCHAR(20),
    severity        VARCHAR(10) NOT NULL CHECK (severity IN ('CRITICAL','HIGH','MEDIUM','LOW')),
    file_path       VARCHAR(512),
    line_number     INT,
    message         TEXT,
    fix_guidance    TEXT,
    dependency_name VARCHAR(255),            -- only for DEPENDENCY_CHECK
    current_version VARCHAR(50),
    fixed_version   VARCHAR(50),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE hints (
    id              BIGSERIAL PRIMARY KEY,
    submission_id   BIGINT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    content         TEXT NOT NULL,
    model           VARCHAR(100),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE instructor_overrides (
    id              BIGSERIAL PRIMARY KEY,
    grading_result_id BIGINT NOT NULL REFERENCES grading_results(id),
    original_score  NUMERIC(5,2) NOT NULL,
    new_score       NUMERIC(5,2) NOT NULL,
    reason          TEXT NOT NULL,
    instructor_id   BIGINT NOT NULL REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_submissions_assignment_student ON submissions(assignment_id, student_id);
CREATE INDEX idx_security_findings_submission ON security_findings(submission_id);
CREATE INDEX idx_test_case_results_grading ON test_case_results(grading_result_id);
CREATE INDEX idx_cohort_members_student ON cohort_members(student_id);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
