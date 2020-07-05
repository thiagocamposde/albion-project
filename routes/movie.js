const express = require('express')
const axios = require('axios')
const config = require('../config/tmdb')

const router = express.Router()

router.get('/tmbd/movie/upcoming', async (req, res) => {
  const page = req.query.page || 1
  const genres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${config.apiKey}&language=en-US`)
  const upcomingMovies = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${config.apiKey}&language=en-US&page=${page}&region=US`)

  upcomingMovies.data.results = upcomingMovies.data.results.map((movie) => {
    movie.genres = genres.data.genres.filter((item) => {
      return movie.genre_ids.includes(item.id)
    })
    return movie
  })
  res.send(upcomingMovies.data)
})

router.get('/tmbd/movie/search', async (req, res) => {
  const query = req.query.query || ''
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=en-US&query=${query}&page=1&include_adult=true`)
  res.send(response.data)
})

router.get('/tmbd/movie/:id', async (req, res) => {
  const movieId = req.params.id
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.apiKey}&language=en-US`)
  res.send(response.data)
})

module.exports = router
