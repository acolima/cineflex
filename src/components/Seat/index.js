import { useState } from "react/cjs/react.development"
import "./style.css"

function Seat(props){
  const {infos, seats} = props
  const {id, name, isAvailable, isSelected} = infos

  const [selectedSeats, setSelectedSeats] = useState([seats])

  function handleClick(id, isAvailable){
    if(isAvailable){
      const seat = seats.find((chair) => chair.id === id)
      
      seat.isSelected = !seat.isSelected
      
      setSelectedSeats([...selectedSeats])
    } else alert("Esse assento não está disponível")
  }


  return(
    <div
      className={`seat ${(!isAvailable) ? "unavailable" : ""} ${(!isSelected) ? "" : "selected"}`}
      onClick={() => handleClick(id, isAvailable)}
    >{name}</div>
  )
}

export default Seat;
