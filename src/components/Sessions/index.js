import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Footer from "../Footer"
import "./style.css"
import Loading from "../Loading"

function Sessions({movieInfo, setMovieInfo}) {
  const {movieId} = useParams()
  const [sessions, setSession] = useState([])

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${movieId}/showtimes`)

    promise.then((response) => {
      setMovieInfo(response.data)
      setSession(response.data.days)
    })
  }, [])

  if(sessions.length === 0)
    return<Loading/>
  
  return(
    <div className="sessions-page">
      <div className="select-text">Selecione o horário</div>
      <div className="sessions-list">
        {(sessions.map((session) => (
          <div className="session" key={session.id}>
            <span className="date">{session.weekday} - {session.date}</span>
            <div>
            {session.showtimes.map((time) => (
              <Link to={`/assentos/${time.id}`} key={time.id}>
                <div className="session-time" ><p>{time.name}</p></div>
              </Link>
            ))}
            </div>
          </div>
        )))}
      </div>

      <Footer posterURL={movieInfo.posterURL} title={movieInfo.title}/>
    </div>
  )
}

export default Sessions