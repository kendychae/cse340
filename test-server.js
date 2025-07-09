// Simple server test
const express = require("express")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Server is working! Database URL: " + (process.env.DATABASE_URL ? "Set" : "Not set"))
})

app.listen(port, () => {
  console.log(`Test server running on http://localhost:${port}`)
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set")
})
