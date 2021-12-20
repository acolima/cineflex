import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Footer from "../Footer"
import Loading from "../Loading"
import "./style.css"

export default function Sessions() {
  const {movieId} = useParams()
  const [sessions, setSession] = useState([])
  const [movieInfo, setMovieInfo] = useState("")

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
    <div className="page">
      <h1>Selecione o horário</h1>
      <div className="sessions-list">
        {(sessions.map((session) => (
          <div className="session" key={session.id}>
            <span className="date">{session.weekday} - {session.date}</span>
            <div>
            {session.showtimes.map((time) => (
              <Link to={`/assentos/${time.id}`} key={time.id}>
                <p className="session-time">{time.name}</p>
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
