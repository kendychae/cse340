const db = require("../database/")

/* *****************************
 * Get all approved reviews for a specific vehicle
 * ***************************** */
async function getReviewsByInventoryId(inv_id) {
  try {
    const sql = `
      SELECT r.review_id, r.review_rating, r.review_title, r.review_text, r.review_date,
             a.account_firstname, a.account_lastname
      FROM public.review r
      JOIN public.account a ON r.account_id = a.account_id
      WHERE r.inv_id = $1 AND r.review_approved = true
      ORDER BY r.review_date DESC
    `
    return await db.query(sql, [inv_id])
  } catch (error) {
    console.error("getReviewsByInventoryId error: " + error)
    return { rows: [] }
  }
}

/* *****************************
 * Add a new review
 * ***************************** */
async function addReview(review_rating, review_title, review_text, account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO public.review (review_rating, review_title, review_text, account_id, inv_id, review_approved)
      VALUES ($1, $2, $3, $4, $5, false)
      RETURNING *
    `
    return await db.query(sql, [review_rating, review_title, review_text, account_id, inv_id])
  } catch (error) {
    console.error("addReview error: " + error)
    return null
  }
}

/* *****************************
 * Get average rating for a vehicle
 * ***************************** */
async function getAverageRating(inv_id) {
  try {
    const sql = `
      SELECT AVG(review_rating) as avg_rating, COUNT(*) as review_count
      FROM public.review
      WHERE inv_id = $1 AND review_approved = true
    `
    const result = await db.query(sql, [inv_id])
    return {
      average: result.rows[0].avg_rating ? parseFloat(result.rows[0].avg_rating).toFixed(1) : 0,
      count: parseInt(result.rows[0].review_count)
    }
  } catch (error) {
    console.error("getAverageRating error: " + error)
    return { average: 0, count: 0 }
  }
}

/* *****************************
 * Get all pending reviews (for admin approval)
 * ***************************** */
async function getPendingReviews() {
  try {
    const sql = `
      SELECT r.review_id, r.review_rating, r.review_title, r.review_text, r.review_date,
             a.account_firstname, a.account_lastname, a.account_email,
             i.inv_make, i.inv_model, i.inv_year
      FROM public.review r
      JOIN public.account a ON r.account_id = a.account_id
      JOIN public.inventory i ON r.inv_id = i.inv_id
      WHERE r.review_approved = false
      ORDER BY r.review_date ASC
    `
    return await db.query(sql)
  } catch (error) {
    console.error("getPendingReviews error: " + error)
    return { rows: [] }
  }
}

/* *****************************
 * Approve a review
 * ***************************** */
async function approveReview(review_id) {
  try {
    const sql = `
      UPDATE public.review
      SET review_approved = true
      WHERE review_id = $1
      RETURNING *
    `
    return await db.query(sql, [review_id])
  } catch (error) {
    console.error("approveReview error: " + error)
    return null
  }
}

/* *****************************
 * Delete a review
 * ***************************** */
async function deleteReview(review_id) {
  try {
    const sql = `DELETE FROM public.review WHERE review_id = $1`
    return await db.query(sql, [review_id])
  } catch (error) {
    console.error("deleteReview error: " + error)
    return null
  }
}

/* *****************************
 * Check if user has already reviewed this vehicle
 * ***************************** */
async function hasUserReviewed(account_id, inv_id) {
  try {
    const sql = `
      SELECT COUNT(*) as count
      FROM public.review
      WHERE account_id = $1 AND inv_id = $2
    `
    const result = await db.query(sql, [account_id, inv_id])
    return parseInt(result.rows[0].count) > 0
  } catch (error) {
    console.error("hasUserReviewed error: " + error)
    return false
  }
}

module.exports = {
  getReviewsByInventoryId,
  addReview,
  getAverageRating,
  getPendingReviews,
  approveReview,
  deleteReview,
  hasUserReviewed
}
