CREATE TABLE cars (
                                    id SERIAL PRIMARY KEY,
                                    brand VARCHAR(100) NOT NULL,
                                    model_name VARCHAR(100) NOT NULL,
                                    price_per_day NUMERIC(10, 2) NOT NULL,
                                    price_per_km NUMERIC(10, 2) NOT NULL,
                                    currency VARCHAR(3) NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    available BOOLEAN NOT NULL DEFAULT TRUE,
                                    photo_url VARCHAR(255) DEFAULT NULL
);

INSERT INTO cars (brand, model_name, price_per_day, price_per_km, currency, available, photo_url)
VALUES
    ('Audi', '80', 24.00, 0.48, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Audi80-1992.JPG'),
    ('Audi', '100', 50.00, 1.00, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/d/d5/1992_Audi_100_%284A%29_2.8_quattro_sedan_%282015-08-07%29_01.jpg'),
    ('Audi', 'Coupe S', 82.00, 1.64, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Audi_100_Coup%C3%A9_S_%28C1%29_%E2%80%93_Frontansicht%2C_27._April_2011%2C_Velbert.jpg'),
    ('BMW', '2800 GTS', 55.00, 1.10, 'EUR', true, 'https://cdn.bmwblog.com/wp-content/uploads/2020/03/BMW-2800-GTS-4.jpeg'),
    ('BMW', '507', 65.00, 1.30, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/3/35/BMW_507.jpg'),
    ('Fiat', '600 D', 5.00, 0.22, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/8/83/Fiat600.jpg'),
    ('DeLorean', 'DMC-12', 105.00, 6.54, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Delorean_DMC-12_side.jpg/640px-Delorean_DMC-12_side.jpg'),
    ('Mazda', '626 V', 35.00, 0.70, 'EUR', true, 'https://www.automoli.com/common/vehicles/_assets/img/gallery/f64/mazda-626-v-gf.jpg'),
    ('Mazda', 'R360', 40.00, 0.80, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/3/37/Mazda_R360_Coupe_Classic-Gala_2022_1X7A0180.jpg'),
    ('Mazda', 'MX 81', 60.00, 1.20, 'EUR', true, 'https://www.motortrend.com/uploads/sites/5/2021/05/Mazda-MX-81-Aria-concept-08.jpg'),
    ('Mercedes', '190', 75.00, 1.50, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/a/a9/1993_Mercedes-Benz_180_E_%28W_201%29_Limited_Edition_sedan_%282015-06-25%29_01.jpg'),
    ('Mercedes', '230', 80.00, 1.60, 'EUR', true, 'https://cdn.dealeraccelerate.com/itsalive/1/49/2788/1920x1440/1970-mercedes-benz-230'),
    ('VW', 'Golf I', 40.00, 0.80, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Volkswagen_Golf_1-2_%28cropped%29.jpg'),
    ('VW', 'Passat 35i', 65.00, 1.30, 'EUR', true, 'https://upload.wikimedia.org/wikipedia/commons/e/e9/VW_Passat_B3_front_20071205.jpg');
