/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/")

const app = express()

/* ***********************
 * Session Configuration
 *************************/
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}))

// Flash messages middleware
app.use(flash())

// Cookie parser middleware
app.use(cookieParser())

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* ***********************
 * Express Messages Middleware
 *************************/
app.use(function(req, res, next){
  res.locals.notice = req.flash('notice')
  next()
})

/* ***********************
 * JWT Token Middleware
 *************************/
app.use(utilities.checkJWTToken)

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
  try {
    const nav = await utilities.getNav()
    res.render("index", { title: "Home", nav })
  } catch (error) {
    console.error("Error in home route:", error.message)
    // Fallback if database is not available
    const nav = "<ul><li><a href='/'>Home</a></li></ul>"
    res.render("index", { title: "Home", nav })
  }
}))

/* ***********************
 * Favicon Route - Handle favicon requests
 *************************/
app.get('/favicon.ico', (req, res) => {
  res.status(204).end() // No Content response
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3001
const host = process.env.HOST || "localhost"

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

app.use(async (err, req, res, next) => {
  let nav = "<ul><li><a href='/'>Home</a></li></ul>" // Fallback nav
  try {
    nav = await utilities.getNav()
  } catch (navError) {
    console.error("Error getting navigation:", navError.message)
  }
  
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  let message
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
