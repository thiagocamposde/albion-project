const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

// enables cros-origin requests
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const movieRoutes = require('./routes/movie')
const configurationRoutes = require('./routes/configuration')

app.use(movieRoutes)
app.use(configurationRoutes)

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'))

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
