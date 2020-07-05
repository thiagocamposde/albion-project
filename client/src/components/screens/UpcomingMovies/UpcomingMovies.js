import React, { useEffect, useState } from 'react'
import Movie from '../../base/Movie'
import { Grid, Typography } from '@material-ui/core'
import ReactPaginate from 'react-paginate'
import { getUpcomingMovies } from '../../../api/movie.api'
import { Link } from 'react-router-dom'

const UpcomingMovies = ({ baseUrl, classes }) => {
  const [upcomingMoviesData, setUpcomingMovies] = useState(null)
  const [currentPage, setPage] = useState(1)

  useEffect(() => {
    fetchUpcomingMovies(currentPage)
  }, [currentPage])

  const fetchUpcomingMovies = async (page) => {
    const response = await getUpcomingMovies(page)
    setUpcomingMovies(response.data)
  }

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1)
    fetchUpcomingMovies(selectedPage.selected + 1)
  }

  return (
    upcomingMoviesData &&
    (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
          className={classes.listContainer}
        >
          <Grid item xs={12}>
            <Typography align='start' color='textPrimary' variant='h2' className={classes.pageTitle}>
              Upcoming movies
            </Typography>
          </Grid>
          {upcomingMoviesData.results.map((movie) =>
            <Grid item key={movie.id} xs={12} sm={3}>
              <Link
                to={`/movie/details/${movie.id}`}
                className={classes.link}
              >
                <Movie movie={movie} baseUrl={baseUrl} />
              </Link>
            </Grid>
          )}
          <Grid item xs={12}>
            <ReactPaginate
              previousLabel={currentPage > 1 ? 'previous' : null}
              nextLabel={currentPage < upcomingMoviesData.total_pages ? 'next' : null}
              breakLabel='...'
              breakClassName='break-me'
              pageCount={upcomingMoviesData.total_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={classes.pagination}
              pageClassName={classes.subContainerPagination}
              activeClassName='active'
              previousClassName={classes.previousClassName}
              nextClassName={classes.nextClassName}
              pageLinkClassName={classes.pageLinkClassName}
            />
          </Grid>
        </Grid>

      </div>
    )
  )
}

export default UpcomingMovies
