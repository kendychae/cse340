const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")

// Basic account routes - these would be expanded later
router.get("/", utilities.handleErrors(async (req, res, next) => {
  let nav = await utilities.getNav()
  res.render("account/account", {
    title: "Account Management",
    nav,
    errors: null,
  })
}))

router.get("/login", utilities.handleErrors(async (req, res, next) => {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}))

router.get("/register", utilities.handleErrors(async (req, res, next) => {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}))

module.exports = router
