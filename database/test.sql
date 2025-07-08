-- Test queries to verify data
SELECT *
FROM account;
SELECT *
FROM inventory;
SELECT *
FROM classification;
-- Test inventory by classification
SELECT *
FROM inventory i
    JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
-- Test inventory by specific ID
SELECT *
FROM inventory i
    JOIN classification c ON i.classification_id = c.classification_id
WHERE i.inv_id = 1;