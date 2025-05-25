CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       uuid VARCHAR(255) UNIQUE NOT NULL,
                       username VARCHAR(255) UNIQUE NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password TEXT NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       account_non_expired BOOLEAN DEFAULT TRUE,
                       is_enabled BOOLEAN DEFAULT TRUE,
                       account_non_locked BOOLEAN DEFAULT TRUE,
                       credentials_non_expired BOOLEAN DEFAULT TRUE
);

CREATE TABLE user_authorities (
                                  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                  authorities VARCHAR(50) NOT NULL
);
