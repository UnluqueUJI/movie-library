import './App.css'
import { useMovies } from './hooks/useMovies';
import Movies from './components/movies';
import { useSearch } from './hooks/useSearch';

function App() {
  
  const {search, setSearch, error} = useSearch();
  const { movies, getMovies, loading } = useMovies( {search} );


  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  }

  const handleChange = (event) => {
    const search = event.target.value;
    if (search.startsWith(' ')) return;
    setSearch(event.target.value);
  }

  return (
   <div className='page'>
    <header>
      <h1>Movie Library</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={search} name="query" placeholder='Star Wars, Harry Potter...'></input>
        <button type='submit'>Search</button>
      </form>
      {error && <p className='error'>{error}</p>}
    </header>

    <main>
      {loading ? <p>Loading...</p> : <Movies movies={movies}/>}
    </main>

   </div>
  )
}

export default App