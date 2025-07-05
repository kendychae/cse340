-- Task 1: SQL Queries for Assignment 2
-- 1. Insert new record to the account table
INSERT INTO account (first_name, last_name, email, password)
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- 2. Update Tony Stark record to change account_type to 'Admin'
UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';
-- 3. Delete Tony Stark record from the database
DELETE FROM account
WHERE email = 'tony@starkent.com';
-- 4. Modify the "GM Hummer" record description using PostgreSQL REPLACE
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- 5. Inner join to select make, model, classification_name for 'Sport' category
SELECT inventory.inv_make,
    inventory.inv_model,
    classification.classification_name
FROM inventory
    INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';
-- 6. Update all records in inventory to add "/vehicles" to file paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');