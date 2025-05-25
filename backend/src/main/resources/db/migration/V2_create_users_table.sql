

UPDATE users
SET password = '$2a$10$MDUaxslzpR89igFuMgs8U.xy338qETfZRkWJRANOGMFmkaiCnAVli'
WHERE username = 'ela';

ALTER TABLE users
    DROP COLUMN authorities;

-- Neue Spalte als TEXT-Array anlegen (oder JSONB, wenn du willst)
ALTER TABLE users
    ADD COLUMN authorities TEXT[];

DELETE FROM user_authorities
WHERE user_id IN (6);


DELETE FROM users
WHERE username IN ('ela2');

ALTER TABLE users DROP COLUMN authorities;

