const express = require("express")
const router = new express.Router() 
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/")
const validate = require("../utilities/validate")

// Route to build add review view (requires login)
router.get("/add/:inventoryId", 
  utilities.checkJWTToken, 
  utilities.checkLogin, 
  utilities.handleErrors(reviewController.buildAddReview)
)

// Route to process add review (requires login)
router.post("/add",
  utilities.checkJWTToken,
  utilities.checkLogin,
  validate.reviewRules(),
  validate.checkReviewData,
  utilities.handleErrors(reviewController.addReview)
)

// Route to build review management view (Admin only)
router.get("/management",
  utilities.checkJWTToken,
  utilities.checkAccountType,
  utilities.handleErrors(reviewController.buildReviewManagement)
)

// Route to approve review (Admin only)
router.post("/approve/:reviewId",
  utilities.checkJWTToken,
  utilities.checkAccountType,
  utilities.handleErrors(reviewController.approveReview)
)

// Route to delete review (Admin only)
router.post("/delete/:reviewId",
  utilities.checkJWTToken,
  utilities.checkAccountType,
  utilities.handleErrors(reviewController.deleteReview)
)

module.exports = router
