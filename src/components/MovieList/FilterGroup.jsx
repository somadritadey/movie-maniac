import './MovieList.css'

function FilterGroup({minRating, onRatingClick, ratings}) {
  return (
    <>
      <ul className="movie-filter">
        {
            ratings.map((rate) => (
                <li 
                className={minRating === rate ? "movie-filter-item active" : "movie-filter-item"} 
                key={rate}
                onClick={() => onRatingClick(rate)}
                >
                    {rate}+ ⭐
                </li>
            ))
        }
      </ul>
    </>
  )
}

export default FilterGroup
