CREATE TABLE cars (
                      id            SERIAL PRIMARY KEY,
                      brand         VARCHAR(100)   NOT NULL,
                      model_name    VARCHAR(100)   NOT NULL,
                      price_per_day NUMERIC(10, 2) NOT NULL,
                      price_per_km  NUMERIC(10, 2) NOT NULL,
                      currency      VARCHAR(3)     NOT NULL CHECK (currency IN ('EUR', 'USD', 'UAH', 'RUB')),
                      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      available     BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO cars (brand, model_name, price_per_day, price_per_km, currency, available)
VALUES
    ('Audi', '80', 24.00, 0.48, 'EUR', TRUE),
    ('Audi', '100', 50.00, 1.00, 'EUR', TRUE),
    ('Audi', 'Coupe S', 82.00, 1.64, 'EUR', TRUE),
    ('BMW', '2800 GTS', 55.00, 1.10, 'EUR', TRUE),
    ('BMW', '507', 65.00, 1.30, 'EUR', TRUE),
    ('Fiat', '600 D', 5.00, 0.22, 'EUR', TRUE),
    ('DeLorean', 'DMC-12', 105.00, 6.54, 'EUR', TRUE),
    ('Mazda', '626 V', 35.00, 0.70, 'EUR', TRUE),
    ('Mazda', 'R360', 40.00, 0.80, 'EUR', TRUE),
    ('Mazda', 'MX 81', 60.00, 1.20, 'EUR', TRUE),
    ('Mercedes', '190', 75.00, 1.50, 'EUR', TRUE),
    ('Mercedes', '230', 80.00, 1.60, 'EUR', TRUE),
    ('VW', 'Golf I', 40.00, 0.80, 'EUR', TRUE),
    ('VW', 'Passat 35i', 65.00, 1.30, 'EUR', TRUE);
