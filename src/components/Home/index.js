import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies")
  
    promise.then((response) => setMovies(response.data))
  }, [])
  
  return (
    <div className="page">
      <div className="select-text">Selecione o filme</div>
        <div className="movies-list">
          {movies.map((movie) => 
            <Link to={`/sessoes/${movie.id}`} key={movie.id} className="movie">
                <img className="movie-poster" src={movie.posterURL} alt={movie.title}/>
            </Link>
          )}
      </div>
    </div>
  )
}

export default Home;