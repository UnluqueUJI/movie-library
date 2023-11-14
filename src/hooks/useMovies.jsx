import { useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search }){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const movies = await searchMovies({ search });
            setMovies(movies);
            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }



    return {movies, getMovies, loading}
  }