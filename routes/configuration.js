const express = require('express')
const axios = require('axios')
const config = require('../config/tmdb')

/* const productsController = require('../controllers/products')
 */
const router = express.Router()

router.get('/tmbd/configuration', async (req, res) => {
  const response = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${config.apiKey}`)
  res.send(response.data)
})

module.exports = router
