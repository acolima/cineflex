import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import Loading from "../Loading";
import "./style.css"

export default function Seats({setSessionInfo, sessionInfo, setInfosBuyer}) {
  const {sessionId} = useParams()
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([seats])
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")

  // const [buttonStatus, setButtonStatus] = useState("")

  let navigate = useNavigate()

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${sessionId}/seats`)
    promise.then((response) => {
      setSessionInfo(response.data)
      setSeats(response.data.seats)
      seats.map((seat) => (seat.isSelected = false))
    })
  }, [])

  function handleSeatClick(id, isAvailable){
    if(isAvailable){
      const seat = seats.find((chair) => chair.id === id)
      seat.isSelected = !seat.isSelected
      setSelectedSeats([...selectedSeats])
    }
    else alert("Esse assento não está disponível")

  }

  // function handleButton(){
  //   if(name !== "" && cpf !== "") setButtonStatus("active")
  // }


  
  function handleReservation(){
    const seatsId = []
    const seatNumber = []
    sessionInfo.seats.filter((seat) =>
      seat.isSelected === true
    ).map((seat) => {
      seatsId.push(seat.id)
      seatNumber.push(seat.name)
    }
    )

    setInfosBuyer({name, cpf})

    const promise = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, {ids: seatsId, name, cpf})
    promise.then((response) => navigate("/sucesso"))
    promise.catch((error) => console.log(error.data))
  }


  if(seats.length === 0)
    return<Loading/>

  return (
    <>
      <div className="seats-page">
        <div className="select-text">Selecione o(s) assento(s)</div>
        <div className="seats">
          {seats.map((seat) => (
            <div
              className={`seat ${(!seat.isAvailable) ? "unavailable" : ""} ${(seat.isSelected) ? "selected" : ""}`}
              onClick={() => handleSeatClick(seat.id, seat.isAvailable)}
              key={seat.id}
            >{seat.name}</div>
          ))}
        </div>

        <div className="seats-status">
          <div className="seat-type">
            <SeatCaption color={"#8dd7cf"}></SeatCaption>
            <p>Selecionado</p>
          </div>
          <div className="seat-type">
            <SeatCaption color={"#c3cfd9"}></SeatCaption>
            <p>Disponível</p>
          </div>
          <div className="seat-type">
            <SeatCaption color={"#fbe192"}></SeatCaption>
            <p>Indisponível</p>
          </div>
        </div>

        <div className="user-infos">
          <p>Nome do comprador:</p>
          <input
            className="input-infos"
            type="text"
            placeholder="Digite seu nome..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p>CPF do comprador:</p>
          <input
            className="input-infos"
            type="text"
            placeholder="Digite seu CPF..."
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
          />
        </div>

        <button className={`reserve-seats`} onClick={() => handleReservation()}>
          <p>Reservar assento(s)</p>
        </button>

      </div>
      <Footer type={"seat"} weekday={sessionInfo.day.weekday} time={sessionInfo.name} posterURL={sessionInfo.movie.posterURL} title={sessionInfo.movie.title}/>
    </>
  )
}

const SeatCaption = styled.div`
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