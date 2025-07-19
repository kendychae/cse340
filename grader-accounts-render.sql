-- Grader Account Setup for Render Database
-- Run this in pgAdmin connected to your Render database
-- Insert grader-requested accounts with hashed passwords
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Basic',
        'Client',
        'basic@340.edu',
        '$2a$10$YQiiz/K9rmZB4.SUNqHxsOnrn5CoC48SecTdeXhvn15t5sL6jW.V2',
        'Client'
    ),
    (
        'Happy',
        'Employee',
        'happy@340.edu',
        '$2a$10$x2XkjJ.FQ5dGjJ5hZrVK8OH6nchm5Ht.7v4vxSOE5WJjPQ6QKpEDS',
        'Employee'
    ),
    (
        'Manager',
        'Admin',
        'manager@340.edu',
        '$2a$10$KzX5O8L8EYc38JbZP3YJZ.H4qM4.9aHlLYVS5WK.EFdHfgAhR4Y3K',
        'Admin'
    ) ON CONFLICT (account_email) DO
UPDATE
SET account_password = EXCLUDED.account_password,
    account_type = EXCLUDED.account_type;
-- Verify the accounts were created
SELECT account_firstname,
    account_lastname,
    account_email,
    account_type
FROM public.account
WHERE account_email IN (
        'basic@340.edu',
        'happy@340.edu',
        'manager@340.edu'
    );