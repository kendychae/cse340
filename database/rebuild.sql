-- DROP tables if they exist (optional cleanup during rebuild)
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS classification;
DROP TYPE IF EXISTS account_type;
-- 1. Create custom ENUM type for account_type
CREATE TYPE account_type AS ENUM ('Client', 'Admin');
-- 2. Create classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);
-- 3. Create account table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(100) NOT NULL UNIQUE,
    account_password VARCHAR(100) NOT NULL,
    account_type account_type DEFAULT 'Client'
);
-- 4. Create inventory table
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image VARCHAR(255) NOT NULL,
    inv_thumbnail VARCHAR(255) NOT NULL,
    inv_price NUMERIC(10, 2) NOT NULL,
    inv_year INT NOT NULL,
    inv_miles INT NOT NULL,
    inv_color VARCHAR(20) NOT NULL,
    classification_id INT NOT NULL REFERENCES classification(classification_id)
);
-- 5. Insert classification data
INSERT INTO classification (classification_name)
VALUES ('Sport'),
    ('SUV'),
    ('Truck'),
    ('Sedan');
-- 6. Insert inventory data
INSERT INTO inventory (
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    )
VALUES (
        'GM',
        'Hummer',
        'A rugged vehicle with small interiors.',
        '/images/hummer.jpg',
        '/images/hummer-thumb.jpg',
        52000,
        2021,
        12000,
        'Black',
        2
    ),
    (
        'Toyota',
        'Supra',
        'A fast sportscar.',
        '/images/supra.jpg',
        '/images/supra-thumb.jpg',
        48000,
        2022,
        8000,
        'Red',
        1
    ),
    (
        'Ford',
        'F-150',
        'A reliable truck for all purposes.',
        '/images/f150.jpg',
        '/images/f150-thumb.jpg',
        39000,
        2020,
        20000,
        'Blue',
        3
    ),
    (
        'Mazda',
        'MX-5',
        'Lightweight and sporty.',
        '/images/mx5.jpg',
        '/images/mx5-thumb.jpg',
        31000,
        2023,
        6000,
        'White',
        1
    ),
    (
        'Chevrolet',
        'Camaro',
        'Classic American muscle car with modern performance.',
        '/images/vehicles/camaro.jpg',
        '/images/vehicles/camaro-tn.jpg',
        45000,
        2023,
        5000,
        'Yellow',
        1
    ),
    (
        'Lamborghini',
        'Aventador',
        'Exotic supercar with breathtaking performance.',
        '/images/vehicles/adventador.jpg',
        '/images/vehicles/adventador-tn.jpg',
        500000,
        2022,
        2000,
        'Orange',
        1
    ),
    (
        'Chevrolet',
        'Tahoe',
        'Spacious SUV perfect for families.',
        '/images/vehicles/escalade.jpg',
        '/images/vehicles/escalade-tn.jpg',
        65000,
        2023,
        8000,
        'Black',
        2
    ),
    (
        'Jeep',
        'Wrangler',
        'Off-road capable SUV for adventure seekers.',
        '/images/vehicles/wrangler.jpg',
        '/images/vehicles/wrangler-tn.jpg',
        42000,
        2023,
        12000,
        'Green',
        2
    ),
    (
        'Ford',
        'Model T',
        'Classic vintage automobile, fully restored.',
        '/images/vehicles/model-t.jpg',
        '/images/vehicles/model-t-tn.jpg',
        25000,
        1925,
        85000,
        'Black',
        4
    ),
    (
        'Ford',
        'Crown Victoria',
        'Reliable sedan with police heritage.',
        '/images/vehicles/crwn-vic.jpg',
        '/images/vehicles/crwn-vic-tn.jpg',
        15000,
        2008,
        120000,
        'White',
        4
    ),
    (
        'Mystery',
        'Machine',
        'Groovy van perfect for solving mysteries.',
        '/images/vehicles/mystery-van.jpg',
        '/images/vehicles/mystery-van-tn.jpg',
        18000,
        1972,
        200000,
        'Green',
        2
    ),
    (
        'Batmobile',
        'Custom',
        'The ultimate crime-fighting vehicle.',
        '/images/vehicles/batmobile.jpg',
        '/images/vehicles/batmobile-tn.jpg',
        1000000,
        1989,
        50000,
        'Black',
        1
    ),
    (
        'DeLorean',
        'DMC-12',
        'Time machine capable of 88 mph.',
        '/images/vehicles/delorean.jpg',
        '/images/vehicles/delorean-tn.jpg',
        65000,
        1985,
        35000,
        'Silver',
        1
    );
-- 7. TASK 1 - QUERY 4: Replace "small interiors" in GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- 8. TASK 1 - QUERY 6: Add "/vehicles" to image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');