-- Update account_type enum to support Employee
-- First, add the new value to the enum
ALTER TYPE account_type
ADD VALUE 'Employee';
-- Check current account types
SELECT DISTINCT account_type
FROM account;
-- Insert a test employee user for testing
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Happy',
        'Employee',
        'happy@example.com',
        '$2a$10$cvfzKnz8JOjLXmYz9wMWeO0.dN9/1YJ5c7.i.Z5yGrLDGXXNwJyaG',
        -- hashed 'password123'
        'Employee'
    );
-- Insert another admin user for testing
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Admin',
        'User',
        'admin@example.com',
        '$2a$10$cvfzKnz8JOjLXmYz9wMWeO0.dN9/1YJ5c7.i.Z5yGrLDGXXNwJyaG',
        -- hashed 'password123'
        'Admin'
    );
-- Insert a basic client user for testing
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Basic',
        'Client',
        'basic@example.com',
        '$2a$10$cvfzKnz8JOjLXmYz9wMWeO0.dN9/1YJ5c7.i.Z5yGrLDGXXNwJyaG',
        -- hashed 'password123'
        'Client'
    );
-- Show all accounts
SELECT account_id,
    account_firstname,
    account_lastname,
    account_email,
    account_type
FROM account;