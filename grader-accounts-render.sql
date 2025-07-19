-- Grader Account Setup for Render Database
-- Run this in pgAdmin connected to your Render database
-- Insert grader-requested accounts with NEW hashed passwords
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
        '$2b$10$RAkReB8VJn.EVCzFMDd17esTEtNfPcXbCD20XKF9AJVCeOBfSvqXO',
        'Client'
    ),
    (
        'Happy',
        'Employee',
        'happy@340.edu',
        '$2b$10$bo5Iy2eTYPsXtsD/fZSTtuRF19eu0RV0OvFlesbfnMkDP40s9txTO',
        'Employee'
    ),
    (
        'Manager',
        'Admin',
        'manager@340.edu',
        '$2b$10$nFVc.kDsi36Chubgk9I3HuEcdaDwIH4Pnu1kg9MqA/zRepykeFsoe',
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