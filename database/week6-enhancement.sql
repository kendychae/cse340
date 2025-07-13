-- Week 6 Enhancement: Customer Reviews & Ratings System
-- This script creates the reviews table and related functionality
-- Create reviews table
CREATE TABLE IF NOT EXISTS public.review (
    review_id SERIAL PRIMARY KEY,
    review_rating INTEGER NOT NULL CHECK (
        review_rating >= 1
        AND review_rating <= 5
    ),
    review_title VARCHAR(100) NOT NULL,
    review_text TEXT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    account_id INTEGER NOT NULL REFERENCES public.account(account_id) ON DELETE CASCADE,
    inv_id INTEGER NOT NULL REFERENCES public.inventory(inv_id) ON DELETE CASCADE,
    review_approved BOOLEAN DEFAULT false
);
-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_review_inv_id ON public.review(inv_id);
CREATE INDEX IF NOT EXISTS idx_review_account_id ON public.review(account_id);
CREATE INDEX IF NOT EXISTS idx_review_approved ON public.review(review_approved);
-- Insert sample reviews for testing
INSERT INTO public.review (
        review_rating,
        review_title,
        review_text,
        account_id,
        inv_id,
        review_approved
    )
VALUES (
        5,
        'Amazing Sports Car!',
        'This Lamborghini Aventador exceeded all my expectations. The performance is incredible and the styling is gorgeous. Worth every penny!',
        1,
        1,
        true
    ),
    (
        4,
        'Great Family SUV',
        'The Escalade is perfect for our family trips. Spacious, comfortable, and reliable. Only minor issue is the fuel economy.',
        2,
        2,
        true
    ),
    (
        5,
        'Classic Beauty',
        'The Model T is a piece of history. Restoration was excellent and it runs like a dream. Amazing experience owning this classic.',
        3,
        3,
        true
    ),
    (
        3,
        'Good but has issues',
        'The Hummer is powerful but drinks gas like crazy. Good for off-road adventures but not for daily commuting.',
        1,
        4,
        true
    ),
    (
        4,
        'Solid Truck',
        'The Fire Truck conversion is unique and fun. Great for events and parades. Quality work on the conversion.',
        2,
        5,
        true
    );
-- Add sample pending review for testing approval workflow
INSERT INTO public.review (
        review_rating,
        review_title,
        review_text,
        account_id,
        inv_id,
        review_approved
    )
VALUES (
        4,
        'Pending Review',
        'This is a pending review that needs admin approval before being displayed publicly.',
        3,
        1,
        false
    );