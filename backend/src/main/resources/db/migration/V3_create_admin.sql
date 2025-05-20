INSERT INTO users (
    id,
    created_at,
    email,
    username,
    password,
    account_non_expired,
    account_non_locked,
    credentials_non_expired,
    is_enabled,
    uuid
) VALUES (
             100,
             now(),
             'admin@admin.com',
             'admin',
             '$2a$10$DTgFpm42KnrjocGGCPEDe/WqMX1j6jNyq7s6.lzhHH4JKW5HcD2xO',
             true,
             true,
             true,
             true,
             '7bcee7b4-0a8c-46dc-91bc-8f632eaf8b8f'
         );

INSERT INTO user_authorities (user_id, authorities)
VALUES (100, 'ROLE_ADMIN');
