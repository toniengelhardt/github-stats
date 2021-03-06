const express = require('express')
const path = require('path')
const request = require('request')

const app = express()
const port = process.env.PORT || 8080

function redirectRoute(req, res, next) {
  // Send event to Plausible
  if (
    !['localhost', '127.0.0.1'].includes(request.hostname) &&
    req.url !== '/favicon.ico'
  ) {
    request.post({
      url:'https://plausible.io/api/event',
      json: {
        name: 'pageview',
        domain: 'github-stats.com',
        url: `https://github-stats.com${req.url}`,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': request.ip,
      }
   })
  }
  // Redirect
  res.redirect(`https://repo-tracker.com/r/gh${req.url}?utm_source=github-stats`)
}

// Serve landing page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
// Serve robots.txt
app.get('/robots.txt', function(req, res) {
  res.sendFile(path.join(__dirname, '/robots.txt'))
})
// Wildcard redirects
app.get("/*", redirectRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
