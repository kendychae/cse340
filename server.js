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

app.use(static)

/* ***********************
 * Default Route
 *************************/
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`)
})
