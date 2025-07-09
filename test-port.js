const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Test server running!')
})

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`)
})
