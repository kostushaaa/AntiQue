CREATE TABLE cars
(
    id            SERIAL PRIMARY KEY,
    brand         VARCHAR(100)   NOT NULL,
    model_name    VARCHAR(100)   NOT NULL,
    price_per_day NUMERIC(10, 2) NOT NULL,
    price_per_km  NUMERIC(10, 2) NOT NULL,
    currency      VARCHAR(3)     NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cars (brand, model_name, price_per_day, price_per_km, currency)
VALUES ('Audi', '80', 24.00, 0.48, 'EUR'),
       ('Audi', '100', 50.00, 1.00, 'EUR'),
       ('Audi', 'Coupe S', 82.00, 1.64, 'EUR'),
       ('BMW', '2800 GTS', 55.00, 1.10, 'EUR'),
       ('BMW', '507', 65.00, 1.30, 'EUR'),
       ('Fiat', '600 D', 5.00, 0.22, 'EUR'),
       ('DeLorean', 'DMC-12', 105.00, 6.54, 'EUR'),
       ('Mazda', '626 V', 35.00, 0.70, 'EUR'),
       ('Mazda', 'R360', 40.00, 0.80, 'EUR'),
       ('Mazda', 'MX 81', 60.00, 1.20, 'EUR'),
       ('Mercedes', '190', 75.00, 1.50, 'EUR'),
       ('Mercedes', '230', 80.00, 1.60, 'EUR'),
       ('VW', 'Golf I', 40.00, 0.80, 'EUR'),
       ('VW', 'Passat 35i', 65.00, 1.30, 'EUR');
