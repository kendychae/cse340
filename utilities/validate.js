const { body, validationResult } = require("express-validator")
const accountModel = require("../models/account-model")
const utilities = {}

/* **********************************
 *  Registration Data Validation Rules
 * ********************************* */
utilities.registrationRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),

    // valid email is required and cannot already exist in the database
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (account_email) => {
        const emailExists = await accountModel.checkExistingEmail(account_email)
        if (emailExists){
          throw new Error("Email exists. Please log in or use different email")
        }
      }),

    // password is required and must be strong password
    body("account_password")
      .trim()
      .notEmpty()
      .isLength({ min: 12 })
      .withMessage("Password must be at least 12 characters.")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage("Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character."),
  ]
}

/* **********************************
 *  Login Data Validation Rules
 * ********************************* */
utilities.loginRules = () => {
  return [
    // valid email is required
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),

    // password is required
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required."),
  ]
}

/* **********************************
 *  Account Update Data Validation Rules
 * ********************************* */
utilities.accountUpdateRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),

    // valid email is required and cannot already exist in the database (unless it's the same user)
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (account_email, { req }) => {
        const emailExists = await accountModel.checkExistingEmail(account_email)
        const currentAccount = await accountModel.getAccountById(req.body.account_id)
        if (emailExists && currentAccount.account_email !== account_email){
          throw new Error("Email exists. Please use a different email")
        }
      }),
  ]
}

/* **********************************
 *  Password Update Data Validation Rules
 * ********************************* */
utilities.passwordUpdateRules = () => {
  return [
    // password is required and must be strong password
    body("account_password")
      .trim()
      .notEmpty()
      .isLength({ min: 12 })
      .withMessage("Password must be at least 12 characters.")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage("Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character."),
  ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
utilities.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    let nav = await utilIndex.getNav()
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
utilities.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    let nav = await utilIndex.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to account update
 * ***************************** */
utilities.checkAccountUpdateData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    let nav = await utilIndex.getNav()
    res.render("account/update", {
      errors,
      title: "Update Account",
      nav,
      account_firstname,
      account_lastname,
      account_email,
      account_id,
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to password update
 * ***************************** */
utilities.checkPasswordUpdateData = async (req, res, next) => {
  const { account_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    let nav = await utilIndex.getNav()
    const accountData = await accountModel.getAccountById(account_id)
    res.render("account/update", {
      errors,
      title: "Update Account",
      nav,
      account_firstname: accountData.account_firstname,
      account_lastname: accountData.account_lastname,
      account_email: accountData.account_email,
      account_id,
    })
    return
  }
  next()
}

/* **********************
 *  Classification Data Validation Rules
 *********************** */
utilities.classificationRules = () => {
  return [
    // classification name is required and must not contain spaces or special characters
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters."),
  ]
}

/* **********************
 *  Inventory Data Validation Rules
 *********************** */
utilities.inventoryRules = () => {
  return [
    // Make is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid make (minimum 3 characters)."),

    // Model is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid model (minimum 3 characters)."),

    // Year is required and must be 4 digits
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .isNumeric()
      .withMessage("Please provide a valid 4-digit year."),

    // Description is required
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),

    // Image path is required
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path."),

    // Thumbnail path is required
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."),

    // Price is required and must be decimal
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isNumeric()
      .withMessage("Please provide a valid price."),

    // Miles is required and must be numeric
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .isNumeric()
      .withMessage("Please provide valid mileage."),

    // Color is required
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),

    // Classification ID is required
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isNumeric()
      .withMessage("Please choose a classification."),
  ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
utilities.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    let nav = await utilIndex.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

/* ******************************
 * Check inventory data and return errors or continue
 * ***************************** */
utilities.checkInventoryData = async (req, res, next) => {
  const { 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id 
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    let nav = await utilIndex.getNav()
    let classificationList = await utilIndex.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

/* **********************
 *  Review Data Validation Rules
 *********************** */
utilities.reviewRules = () => {
  return [
    // Rating is required and must be 1-5
    body("review_rating")
      .trim()
      .notEmpty()
      .isInt({ min: 1, max: 5 })
      .withMessage("Please provide a rating between 1 and 5 stars."),

    // Title is required
    body("review_title")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3, max: 100 })
      .withMessage("Please provide a review title (3-100 characters)."),

    // Review text is required
    body("review_text")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Please provide a review (10-1000 characters)."),

    // Inventory ID is required
    body("inv_id")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("Invalid vehicle selection."),
  ]
}

/* ******************************
 * Check review data and return errors or continue
 * ***************************** */
utilities.checkReviewData = async (req, res, next) => {
  const { review_rating, review_title, review_text, inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilIndex = require("./index")
    const invModel = require("../models/inventory-model")
    let nav = await utilIndex.getNav()
    const vehicleData = await invModel.getInventoryByInventoryId(inv_id)
    res.render("reviews/add-review", {
      errors,
      title: `Review ${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleData,
      inv_id,
      review_rating,
      review_title,
      review_text
    })
    return
  }
  next()
}

module.exports = utilities
