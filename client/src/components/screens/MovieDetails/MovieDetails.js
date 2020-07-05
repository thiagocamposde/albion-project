import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { getMovie } from '../../../api/movie.api'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

const MovieDetails = ({ baseUrl, match, classes }) => {
  const movieId = match.params.id

  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (movieId) {
      getMovie(movieId).then((result) => {
        setMovie(result)
      })
    }
  }, [movieId])

  if (!movieId) {
    return <Redirect to={{ pathname: '/' }} />
  }

  return movie && (
    <div className={classes.root}>
      <div className={classes.movieContainer}>
        <Grid container spacing={6}>
          <Grid item container justify='flex-end' sm={5}>
            <img className={classes.poster} src={`${baseUrl}w342${movie.poster_path}`} alt={movie.title} />
          </Grid>
          <Grid container direction='column' item sm={5} spacing={2}>
            <Grid item>
              <Typography className={classes.title} variant='h2' color='textPrimary'>
                <b>{movie.title} ({moment(movie.release_date).format('YYYY')})</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom color='textPrimary' variant='h4'>
                <b>Overview</b>
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                {movie.overview}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom color='textPrimary'>
                <b>Genres</b>
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                {movie.genres.map((genre) => {
                  return genre.name
                }).join(', ')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom color='textPrimary'>
                Release date: {moment(movie.release_date).format('MMMM Do YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default MovieDetails
