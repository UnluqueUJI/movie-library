import { useState, useEffect, useRef } from "react";

export function useSearch(){
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);
  
    useEffect(() => {

        if (isFirstInput.current){
            isFirstInput.current = search === '';
            setError("");
            return;
        }

      if (search === ''){
        setError('Empty search is not allowed');
        return;
      }
  
      if (search.match(/^\d+$/)){
        setError('Numerical searching is not allowed');
        return
      }
  
      if (search.length < 3){
        setError('Search must contain at least three characters');
        return
      }
  
      setError(null);
  
    }, [search])
  
    return {search, setSearch, error}
  }