CREATE TABLE IF NOT EXISTS cars (
                                    id SERIAL PRIMARY KEY,
                                    brand VARCHAR(100) NOT NULL,
                                    model_name VARCHAR(100) NOT NULL,
                                    price_per_day NUMERIC(10, 2) NOT NULL,
                                    price_per_km NUMERIC(10, 2) NOT NULL,
                                    currency VARCHAR(3) NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    available BOOLEAN NOT NULL DEFAULT TRUE
);

-- nur wenn noch keine Autos vorhanden sind:
DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM cars) THEN
            INSERT INTO cars (brand, model_name, price_per_day, price_per_km, currency, available)
            VALUES
                ('Audi', '80', 24.00, 0.48, 'EUR', true),
                ('Audi', '100', 50.00, 1.00, 'EUR', true),
                ('Audi', 'Coupe S', 82.00, 1.64, 'EUR', true),
                ('BMW', '2800 GTS', 55.00, 1.10, 'EUR', true),
                ('BMW', '507', 65.00, 1.30, 'EUR', true),
                ('Fiat', '600 D', 5.00, 0.22, 'EUR', true),
                ('DeLorean', 'DMC-12', 105.00, 6.54, 'EUR', true),
                ('Mazda', '626 V', 35.00, 0.70, 'EUR', true),
                ('Mazda', 'R360', 40.00, 0.80, 'EUR', true),
                ('Mazda', 'MX 81', 60.00, 1.20, 'EUR', true),
                ('Mercedes', '190', 75.00, 1.50, 'EUR', true),
                ('Mercedes', '230', 80.00, 1.60, 'EUR', true),
                ('VW', 'Golf I', 40.00, 0.80, 'EUR', true),
                ('VW', 'Passat 35i', 65.00, 1.30, 'EUR', true);
        END IF;
    END $$;
