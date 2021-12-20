import { Link } from "react-router-dom"
import styled from "styled-components"

export default function Button({from, handleReservation}){
  if(from === "success")
    return (
      <Btn>
        <Link to="/">
          <p>Voltar para home</p>
        </Link>
      </Btn> 
    )

  return (
    <Btn onClick={handleReservation}>
      <p>Reservar assento(s)</p>
    </Btn>
  )
}

const Btn = styled.div`
  height: 42px;
  width: 70%;

  border-radius: 3px;
  margin: 0 auto 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #e8833a;
  cursor: pointer;

  p{
    font: 400 18px/21px "Roboto";
    color: #fff;
  }
`