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

const app = express()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Static Routing
 *************************/
app.use(express.static("public"))

/* ***********************
 * Basic Routes (No Database)
 *************************/
app.get("/", (req, res) => {
  const nav = "<ul><li><a href='/'>Home</a></li></ul>"
  res.render("index", { title: "Home", nav })
})

/* ***********************
 * Error Handler
 *************************/
app.use((req, res) => {
  res.status(404).send("Page not found")
})

/* ***********************
 * Start Server
 *************************/
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
  console.log(`Visit: http://localhost:${port}`)
})
