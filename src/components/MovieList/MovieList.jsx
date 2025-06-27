import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import './MovieList.css'
import FilterGroup from './FilterGroup'
import _, { sortBy } from 'lodash'

function MovieList({type, title}) {
  const [movies, setMovies] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [filterMovies, setFilterMovies] = useState([])
  const [sort, setSort] = useState({
    by: "default",
    order: "asc"
  })

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    if(sort.by !== "default") {
      // order movies by rating + .by + .order
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order])
      setFilterMovies(sortedMovies)
    }
  }, [sort])

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=c7c90534543fc6fcf37ee036c75ac526`
    )
    const data = await response.json()
    setMovies(data.results)
    setFilterMovies(data.results)
  }

  const handleFilter = (rate) => {
    if(rate == minRating) {
      // if we clicked on same rate again, it will reload original list of movies
      setMinRating(0)
      setFilterMovies(movies)
    }
    else {
      setMinRating(rate)

      // array of movies filtered according to rating
      const filtered = movies.filter(movie => movie.vote_average >= rate)
      // set filtered movies to be displayed as above filtered ones
      setFilterMovies(filtered)
      // movies & filtered movies are the same list of movies from api originally, we introduce another state so that when we switch from one to another rating, it filters from original data
    }
  }

  const handleSort = e => {
    const {name, value} = e.target
    setSort(prev => ({...prev, [name]: value}))
  }

  return (
    <>
      <section className='movie-list' id={type}>
        <header className='movie-list-header'>
          <h2 className='movie-list-heading'>{title}</h2>

          <div className='movie-list-filter'>
            <FilterGroup 
            minRating={minRating} 
            onRatingClick={handleFilter} 
            ratings={[8, 7, 6]}
            />

            <select name="by" id="" onChange={handleSort} value={sort.by} className="movie-sorting">
              <option value="default">Sort By</option>
              <option value="release_date">Date</option>
              <option value="vote_average">Rating</option>
            </select>
            <select name="order" id="" onChange={handleSort} value={sort.order} className="movie-sorting">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </header>

        <div className="movie-cards">
          {
            filterMovies.map((movie) => 
              <MovieCard key={movie.id} movie={movie} />
            )
          }
        </div>
      </section>
    </>
  )
}

export default MovieList
