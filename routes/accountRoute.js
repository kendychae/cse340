const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/validate')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route to build account management view (requires login)
router.get("/", utilities.checkJWTToken, utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

// Route to build account update view
router.get("/update/:account_id", utilities.checkJWTToken, utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))

// Process account update
router.post(
  "/update",
  utilities.checkJWTToken,
  utilities.checkLogin,
  regValidate.accountUpdateRules(),
  regValidate.checkAccountUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

// Process password update
router.post(
  "/update-password",
  utilities.checkJWTToken,
  utilities.checkLogin,
  regValidate.passwordUpdateRules(),
  regValidate.checkPasswordUpdateData,
  utilities.handleErrors(accountController.updatePassword)
)

// Process logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router
