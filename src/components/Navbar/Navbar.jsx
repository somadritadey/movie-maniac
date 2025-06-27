import './Navbar.css'

function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <h1>MovieManiac</h1>

        <div className='navbar-links'>
            <a href="#popular">Popular</a>
            <a href="#top_rated">Top Rated</a>
            <a href="#upcoming">Upcoming</a>
        </div>
      </nav>
    </>
  )
}

export default Navbar
