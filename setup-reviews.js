/* ******************************************
 * Week 6 Enhancement Setup Script
 * This script sets up the Customer Reviews & Ratings System
 * Run this script to initialize the review table and sample data
 *******************************************/

const pool = require('./database/')
require('dotenv').config()

async function setupReviewSystem() {
  try {
    console.log('Setting up Customer Reviews & Ratings System...')
    
    // Create review table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.review (
        review_id SERIAL PRIMARY KEY,
        inventory_id INTEGER NOT NULL REFERENCES public.inventory(inv_id) ON DELETE CASCADE,
        account_id INTEGER NOT NULL REFERENCES public.account(account_id) ON DELETE CASCADE,
        review_title VARCHAR(100) NOT NULL,
        review_text TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_approved BOOLEAN DEFAULT FALSE,
        UNIQUE(inventory_id, account_id)
      );
    `)
    console.log('✓ Review table created successfully')
    
    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_review_inventory ON public.review(inventory_id);
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_review_approved ON public.review(is_approved);
    `)
    console.log('✓ Database indexes created successfully')
    
    // Insert sample data
    await pool.query(`
      INSERT INTO public.review (inventory_id, account_id, review_title, review_text, rating, is_approved) VALUES
      (1, 1, 'Amazing Performance!', 'This Lamborghini Aventador exceeded all my expectations. The acceleration is incredible and the handling is superb. Definitely worth every penny!', 5, true),
      (2, 2, 'Classic Beauty', 'The Aerocar is a unique piece of automotive history. Love the vintage feel and the engineering is remarkable for its time.', 4, true),
      (3, 1, 'Iconic and Fun', 'Who doesn''t want to drive the Batmobile? It''s exactly what you''d expect - powerful, stylish, and turns heads everywhere.', 5, true),
      (4, 2, 'Muscle Car Dream', 'This Camaro is a true muscle car. The sound of the engine is music to my ears. Great restoration work!', 4, true),
      (5, 1, 'Reliable Workhorse', 'The Crown Victoria is dependable and comfortable. Perfect for long drives and daily commuting.', 3, true),
      (6, 2, 'Time Travel Ready', 'The DeLorean is in excellent condition. Even without the flux capacitor, it''s an amazing ride!', 4, false)
      ON CONFLICT (inventory_id, account_id) DO NOTHING;
    `)
    console.log('✓ Sample review data inserted successfully')
    
    console.log('🎉 Customer Reviews & Ratings System setup complete!')
    console.log('📝 Features available:')
    console.log('  - Customer review submission with 1-5 star ratings')
    console.log('  - Admin approval workflow for review moderation')
    console.log('  - Average rating display on vehicle details')
    console.log('  - One review per customer per vehicle restriction')
    console.log('  - Comprehensive review management interface')
    
  } catch (error) {
    console.error('❌ Error setting up review system:', error)
  } finally {
    process.exit()
  }
}

// Run the setup
setupReviewSystem()
