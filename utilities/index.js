const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    if (data && data.rows) {
      data.rows.forEach((row) => {
        list += "<li>"
        list +=
          '<a href="/inv/type/' +
          row.classification_id +
          '" title="See our inventory of ' +
          row.classification_name +
          ' vehicles">' +
          row.classification_name +
          "</a>"
        list += "</li>"
      })
    }
    list += "</ul>"
    return list
  } catch (error) {
    console.error("Error getting navigation:", error)
    // Return basic navigation if database fails
    return '<ul><li><a href="/" title="Home page">Home</a></li></ul>'
  }
}

/* ************************
 * Build classification list for select dropdown
 ************************** */
Util.buildClassificationList = async function (classification_id = null) {
  try {
    let data = await invModel.getClassifications()
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    if (data && data.rows) {
      data.rows.forEach((row) => {
        classificationList += '<option value="' + row.classification_id + '"'
        if (
          classification_id != null &&
          row.classification_id == classification_id
        ) {
          classificationList += " selected "
        }
        classificationList += ">" + row.classification_name + "</option>"
      })
    }
    classificationList += "</select>"
    return classificationList
  } catch (error) {
    console.error("Error building classification list:", error)
    // Return basic select if database fails
    return '<select name="classification_id" id="classificationList" required><option value="">Choose a Classification</option></select>'
  }
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the inventory detail view HTML
* ************************************ */
Util.buildInventoryDetailView = async function(data){
  let detailView
  if(data){
    detailView = '<div class="vehicle-detail">'
    detailView += '<div class="vehicle-image">'
    detailView += '<img src="' + data.inv_image + '" alt="' + data.inv_make + ' ' + data.inv_model + '">'
    detailView += '</div>'
    detailView += '<div class="vehicle-info">'
    detailView += '<h2>' + data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model + '</h2>'
    detailView += '<p class="vehicle-price">Price: $' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</p>'
    detailView += '<p class="vehicle-description"><strong>Description:</strong> ' + data.inv_description + '</p>'
    detailView += '<p class="vehicle-color"><strong>Color:</strong> ' + data.inv_color + '</p>'
    detailView += '<p class="vehicle-mileage"><strong>Mileage:</strong> ' + new Intl.NumberFormat('en-US').format(data.inv_miles) + ' miles</p>'
    detailView += '</div>'
    detailView += '</div>'
  } else { 
    detailView = '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  }
  return detailView
}

/* ****************************************
 * Middleware to check token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("notice", "Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    next()
  }
}

/* ****************************************
 * Check Login
 **************************************** */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
 * Middleware to check account type for inventory management
 **************************************** */
Util.checkAccountType = (req, res, next) => {
  if (res.locals.loggedin && res.locals.accountData) {
    const accountType = res.locals.accountData.account_type
    if (accountType === 'Employee' || accountType === 'Admin') {
      next()
    } else {
      req.flash("notice", "You do not have permission to access this area.")
      return res.redirect("/account/login")
    }
  } else {
    req.flash("notice", "Please log in with an Employee or Admin account.")
    return res.redirect("/account/login")
  }
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
