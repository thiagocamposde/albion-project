import React from 'react'
import UpcomingMovies from '../UpcomingMovies'
import MovieDetails from '../MovieDetails'
import { Switch, Route } from 'react-router-dom'

const MainsScreen = ({ classes, tmdbConfigIsloading, tmdbConfig }) => {
  if (tmdbConfigIsloading) return null

  return (
    <div className={classes.root}>
      <Switch>
        <Route
          exact path='/' render={props => (
            <UpcomingMovies {...props} baseUrl={tmdbConfig.images.base_url} />
          )}
        />
        <Route
          path='/movie/details/:id?' render={props => (
            <MovieDetails {...props} baseUrl={tmdbConfig.images.base_url} />
          )}
        />
        )}
      />
      </Switch>
    </div>
  )
}

export default MainsScreen
