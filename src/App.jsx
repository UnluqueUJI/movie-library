import './App.css'
import { useMovies } from './hooks/useMovies';
import Movies from './components/movies';
import { useSearch } from './hooks/useSearch';
import { useCallback, useState } from 'react';
import debounce from 'just-debounce-it';

function App() {
  
  const {search, setSearch, error} = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies( {search, sort} );
  

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies(search);
    }, 300), [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies(search);
  }

  const handleChange = (event) => {
    const search = event.target.value;
    if (search.startsWith(' ')) return;
    setSearch(search);
    debouncedGetMovies(search);
  }

  const handleSort = () => {
    setSort(!sort);
  }

  return (
   <div className='page'>
    <header>
      <h1>Movie Library</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={search} name="query" placeholder='Star Wars, Harry Potter...'></input>
        <input type='checkbox' onChange={handleSort} checked={sort}></input>
        <button type='submit' disabled={error!=null}>Search</button>
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
