import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { search } from '../../../api/movie.api'
import AsyncSelect from 'react-select/async'
import { Grid } from '@material-ui/core'

const NavBar = ({ movie, tmdbConfigIsloading, tmdbConfig, classes }) => {
  const loadOptions = (inputValue, callback) => {
    if (inputValue) {
      search(inputValue).then(results => {
        callback(results.map(movieObj => {
          return {
            value: movieObj,
            label: (
              <Link to={`/movie/details/${movieObj.id}`} className={classes.optionLink}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item><img src={`${tmdbConfig.images.base_url}w92${movieObj.poster_path}`} alt={movieObj.title} height='50px' width='30px' /></Grid>
                  <Grid item><Typography>{movieObj.title}</Typography></Grid>
                </Grid>
              </Link>
            )
          }
        }))
      })
    }
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%'
    }),
    container: (provided, state) => ({
      ...provided
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
      ...provided,
      color: '#0D0D0D',
      backgroundColor: isFocused && '#D9D9D9'
    })
  }

  return (
    <AppBar position='fixed' className={classes.root}>
      <Toolbar>
        <Link
          to='/'
          className={classes.link}
        >
          <Typography className={classes.title} variant='h6' noWrap>
            TMDb
          </Typography>
        </Link>
        <div className={classes.searchContainer}>
          {!tmdbConfigIsloading &&
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              styles={customStyles}
            />}
        </div>
        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
