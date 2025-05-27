CREATE TABLE audit_logs (
                            id SERIAL PRIMARY KEY,
                            actor VARCHAR(255) NOT NULL,
                            action VARCHAR(255) NOT NULL,
                            target VARCHAR(255),
                            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
