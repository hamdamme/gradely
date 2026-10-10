CREATE UNIQUE INDEX idx_users_email_lower ON users (lower(email));
