/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")

const app = express()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Static Routing
 *************************/

// ✅ This line ensures your public/ folder (images, css, js) is served properly
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/
app.use(static)

// Inventory routes
app.use("/inv", utilities.handleErrors(inventoryRoute))

// Account routes
app.use("/account", utilities.handleErrors(accountRoute))

// Error routes
app.use("/error", utilities.handleErrors(errorRoute))

/* ***********************
 * Default Route
 *************************/
app.get("/", utilities.handleErrors(async (req, res, next) => {
  const nav = await utilities.getNav()
  res.render("index", { title: "Home", nav })
}))

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ 
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav,
    status: err.status || 500
  })
})

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
