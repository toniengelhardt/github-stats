const express = require('express')
const path = require('path')
const request = require('request')

const app = express()
const port = process.env.PORT || 8080

function redirectRoute(req, res, next) {
  // Send event to Plausible
  if (!['localhost', '127.0.0.1'].includes(request.hostname)) {
    request.post({
      url:'https://plausible.io/api/event',
      json: {
        name: 'pageview',
        domain: 'github-stats.com',
        url: `https://github-stats.com${req.url}`,
        // screen_width: ...
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': request.ip,
      }
   })
  }
  // Redirect
  res.redirect(`https://repo-tracker.com/r/gh${req.url}`)
}

// Landing page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})
// Redirects
app.get("/*", redirectRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
