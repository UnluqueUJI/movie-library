export function MovieList({movies}){
    return(
        <ul className="movies">
        {movies.map(movie => (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title}></img>
          </li>
        ))}
      </ul>
    );
}

export function NoMovies(){
    return(
        <p>No results found for this search</p>
    );
}

export default function Movies({ movies }){

    const hasMovies = movies?.length > 0;

    return(
        hasMovies ? <MovieList movies={movies}/>
        : <NoMovies/>
    );
}