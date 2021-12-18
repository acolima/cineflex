import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import Loading from "../Loading";
import "./style.css"

function Seats({movieInfo}) {
  const {sessionId} = useParams()
  const [seats, setSeats] = useState([])
  const [sessionInfo, setSessionInfo] = useState()

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${sessionId}/seats`)
    promise.then((response) => {
      setSessionInfo(response.data)
      setSeats(response.data.seats)  
    })
  }, [])
  

  if(seats.length === 0)
    return<Loading/>
    
  return (
    <>
      <div className="seats-page">
        <div className="select-text">Selecione o(s) assento(s)</div>
        <div className="seats">
          {seats.map((seat) => (
            <Seat 
              color={(seat.isAvailable) ? "#c3cfd9" : "#fbe192"}  
              key={seat.id}
            >{seat.name}</Seat>
          ))}
        </div>
        
        <div className="seats-status">
          <div className="seat-type">
            <Seat color={"#8dd7cf"}></Seat>
            <p>Selecionado</p>
          </div>
          <div className="seat-type">
            <Seat color={"#c3cfd9"}></Seat>
            <p>Disponível</p>
          </div>
          <div className="seat-type">
            <Seat color={"#fbe192"}></Seat>
            <p>Indisponível</p>
          </div>
        </div>

        <div className="user-infos">
          <p>Nome do comprador:</p>
          <input className="input-infos" type="text" placeholder="Digite seu nome..." />
          <p>CPF do comprador:</p>
          <input className="input-infos"type="text" placeholder="Digite seu CPF..." />
        </div>
        
        <div className="reserve-seats">
          <button><p>Reservar assento(s)</p></button>
        </div>

      </div>
      <Footer type={"seat"} weekday={sessionInfo.day.weekday} time={sessionInfo.name} posterURL={movieInfo.posterURL} title={movieInfo.title}/>
    </>
  )
}

export default Seats;

const Seat = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 12px;

  background-color: ${(props) => props.color};
  margin-bottom: 10px;

  font: 400 11px/13px "Roboto";

  display: flex;
  justify-content: center;
  align-items: center;
`