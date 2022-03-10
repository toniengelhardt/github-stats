const express = require('express')
const path = require('path')

// import Plausible from 'plausible-tracker'

// const { trackPageview } = Plausible({
//   trackLocalhost: true,
// })

const app = express()
const port = process.env.PORT || 8080

function redirectRoute(req, res, next) {
  // trackPageview({
  //   url: req.originalUrl,
  // })
  res.redirect(`https://repo-tracker.com/r/gh${req.url}`)
}

// Landing page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
s
// Redirect
app.get("/*", redirectRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
