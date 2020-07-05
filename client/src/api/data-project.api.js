import request from '../util/request'

export const getUpcomingMovies = async (page) => {
  try {
    return await request.get(`/tmbd/movie/upcoming?page=${page}`)
  } catch (err) {
    console.log(err.message)
  }
}
export const getMovie = async (movieId) => {
  try {
    const response = await request.get(`/tmbd/movie/${movieId}`)
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

export const search = async (query) => {
  try {
    const response = await request.get(`/tmbd/movie/search?query=${query}`)
    return response.data.results
  } catch (err) {
    console.log(err.message)
  }
}
