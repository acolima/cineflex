import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
import Loading from "../Loading";
import "./style.css"

export default function Seats() {
  const {sessionId} = useParams()
  const [sessionInfo, setSessionInfo] = useState([])
  const [seats, setSeats] = useState([])
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")

  // const [buttonStatus, setButtonStatus] = useState("")

  let navigate = useNavigate()

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${sessionId}/seats`)
    promise.then((response) => {
      setSessionInfo(response.data)
      setSeats(response.data.seats)
    })
  }, [])

  function handleSeatClick(id, isAvailable){
    const selectedSeats = [...seats]

    if(isAvailable){
      const seat = selectedSeats.find((chair) => chair.id === id)
      seat.isSelected = !seat.isSelected
      setSeats([...selectedSeats])
    }
    else alert("Esse assento não está disponível")
  }

  // function handleButton(){
  //   if(name !== "" && cpf !== "") setButtonStatus("active")
  // }

  function handleReservation(){
    const seatsId = []
    const seatNumber = []

    seats
      .filter((seat) => (seat.isSelected === true))
      .map((seat) => {
        seatsId.push(seat.id)
        seatNumber.push(seat.name)
      }
    )

    const infos = {
      title: sessionInfo.movie.title,
      date: sessionInfo.day.date,
      time: sessionInfo.name,
      seats: seatNumber,
      name: name,
      cpf: cpf
    }

    // navigate("/sucesso", {state: infos})

    const promise = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, {ids: seatsId, name, cpf})
    
    promise.then((response) => navigate("/sucesso", {state: infos}))
    promise.catch((error) => console.log(error.data))
  }

  if(seats.length === 0)
    return<Loading/>

  return (
    <>
      <div className="page">
        <h1>Selecione o(s) assento(s)</h1>
        <div className="seats">
          {seats.map((seat) => (
            <div
              className={`seat ${(!seat.isAvailable) ? "unavailable" : ""} ${(seat.isSelected) ? "selected" : ""}`}
              onClick={() => handleSeatClick(seat.id, seat.isAvailable)}
              key={seat.id}
            >{seat.name}</div>
          ))}
        </div>

        <div className="caption">
          <div className="seat-caption">
            <div className="seat selected"></div>
            <p>Selecionado</p>
          </div>
          <div className="seat-caption">
            <div className="seat"></div>
            <p>Disponível</p>
          </div>
          <div className="seat-caption">
            <div className="seat unavailable"></div>
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

        <button className={`btn-reserve-seats`} onClick={() => handleReservation()}>
          <p>Reservar assento(s)</p>
        </button>
      </div>
      <Footer type={"seat"} weekday={sessionInfo.day.weekday} time={sessionInfo.name} posterURL={sessionInfo.movie.posterURL} title={sessionInfo.movie.title}/>
    </>
  )
}