import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import moment from 'moment'

const Movie = ({ movie, baseUrl, classes }) => {
  return (
    <Grid container justify='center' className={classes.root} key={movie.id}>
      <Grid item xs={12}>
        <img className={classes.poster} src={`${baseUrl}w500${movie.poster_path}`} alt={movie.title} />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title}>{movie.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom color='textPrimary' variant='body2'>
          {movie.genres.map((genre) => {
            return genre.name
          }).join(', ')}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.releaseDate}>
        <Typography>{moment(movie.release_date).format('MMMM Do YYYY')}</Typography>
      </Grid>
    </Grid>
  )
}

export default Movie
