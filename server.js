const express = require('express');
const {promises: fs} = require('fs');
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
