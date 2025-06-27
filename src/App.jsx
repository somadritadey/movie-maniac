import './App.css'
import MovieList from './components/MovieList/MovieList'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <div className='app'>
        <Navbar />

        <main>
          <MovieList type="popular" title="Popular" />
          <MovieList type="top_rated" title="Top Rated" />
          <MovieList type="upcoming" title="Upcoming" />
        </main>
      </div>
    </>
  )
}

export default App
