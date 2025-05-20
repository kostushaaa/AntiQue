INSERT INTO users (
    created_at,
    email,
    username,
    uu_id,
    account_non_expired,
    account_non_locked,
    authorities,
    credentials_non_expired,
    is_enabled,
    password,
    uuid
) VALUES (
             NOW(),
             'ela@example.com',
             'ela',
             gen_random_uuid(),              -- falls `pgcrypto` aktiviert
             true,
             true,
             '{1}',                          -- ✔ Array aus smallint (Rolle USER)
             true,
             true,
             '$2a$10$J9R6UFkRkRC/YbkIdtbv8Ow9D0aLZ9DK95B8lWZs0guFyd6lz4e9i', -- Passwort: test123
             'ela-001'                       -- frei wählbarer UUID-String
         );

UPDATE users
SET password = '$2a$10$MDUaxslzpR89igFuMgs8U.xy338qETfZRkWJRANOGMFmkaiCnAVli'
WHERE username = 'ela';



