const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***************************
 *  Build add review view
 * ************************** */
reviewCont.buildAddReview = async function (req, res, next) {
  const inv_id = parseInt(req.params.inventoryId)
  const accountData = res.locals.accountData
  
  // Check if user has already reviewed this vehicle
  const hasReviewed = await reviewModel.hasUserReviewed(accountData.account_id, inv_id)
  
  if (hasReviewed) {
    req.flash("notice", "You have already reviewed this vehicle.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
  
  // Get vehicle data for display
  const vehicleData = await invModel.getInventoryByInventoryId(inv_id)
  let nav = await utilities.getNav()
  
  res.render("reviews/add-review", {
    title: `Review ${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`,
    nav,
    errors: null,
    vehicleData,
    inv_id
  })
}

/* ***************************
 *  Process add review
 * ************************** */
reviewCont.addReview = async function (req, res, next) {
  const { review_rating, review_title, review_text, inv_id } = req.body
  const accountData = res.locals.accountData
  
  // Check if user has already reviewed this vehicle
  const hasReviewed = await reviewModel.hasUserReviewed(accountData.account_id, inv_id)
  
  if (hasReviewed) {
    req.flash("notice", "You have already reviewed this vehicle.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
  
  const addResult = await reviewModel.addReview(
    review_rating,
    review_title,
    review_text,
    accountData.account_id,
    inv_id
  )
  
  if (addResult) {
    req.flash("notice", "Your review has been submitted and is pending approval. Thank you!")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    const vehicleData = await invModel.getInventoryByInventoryId(inv_id)
    let nav = await utilities.getNav()
    req.flash("notice", "Sorry, there was an error submitting your review.")
    res.status(501).render("reviews/add-review", {
      title: `Review ${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      errors: null,
      vehicleData,
      inv_id,
      review_rating,
      review_title,
      review_text
    })
  }
}

/* ***************************
 *  Build review management view (Admin only)
 * ************************** */
reviewCont.buildReviewManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  const pendingReviews = await reviewModel.getPendingReviews()
  
  res.render("reviews/management", {
    title: "Review Management",
    nav,
    errors: null,
    pendingReviews: pendingReviews.rows
  })
}

/* ***************************
 *  Approve review
 * ************************** */
reviewCont.approveReview = async function (req, res, next) {
  const review_id = parseInt(req.params.reviewId)
  
  const approveResult = await reviewModel.approveReview(review_id)
  
  if (approveResult) {
    req.flash("notice", "Review approved successfully.")
  } else {
    req.flash("notice", "Error approving review.")
  }
  
  res.redirect("/reviews/management")
}

/* ***************************
 *  Delete review
 * ************************** */
reviewCont.deleteReview = async function (req, res, next) {
  const review_id = parseInt(req.params.reviewId)
  
  const deleteResult = await reviewModel.deleteReview(review_id)
  
  if (deleteResult) {
    req.flash("notice", "Review deleted successfully.")
  } else {
    req.flash("notice", "Error deleting review.")
  }
  
  res.redirect("/reviews/management")
}

module.exports = reviewCont
