import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Session from "../Session"
import styled from "styled-components"
import Footer from "../Footer"

function Sessions() {
  const {sessionId} = useParams()
  const [movieInfo, setMovieInfo] = useState("")
  const [sessions, setSession] = useState([])

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${sessionId}/showtimes`)

    promise.then((response) => {
      setMovieInfo(response.data)
      setSession(response.data.days)
    })
  }, [])
  
  console.log(movieInfo) 
  return(
    <SessionsPage>
      <div className="select-text">Selecione o horário</div>
      <div className="sessions-list">
        {(sessions.map((session) => (
          <Session {...session} key={session.id}/>
        )))}
      </div>

      <Footer movieInfo={movieInfo}/>
    </SessionsPage>)
}

export default Sessions



const SessionsPage = styled.div`
  width: 100vw;
  height: 100vh;

  margin: 67px 0 130px 0;

  overflow-y: scroll;
`