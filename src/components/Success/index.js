import {useLocation } from "react-router-dom";
import Button from "../Button";
import "./style.css"

export default function Success() {  
  const {state} = useLocation();

  let cpf = state.cpf

  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

  return (
    <div className="page success">
      <h1>Pedido feito com sucesso!</h1>
      <div className="info-sucess">
        <h2>Filme e sessão</h2>
        <p>{state.title}</p>
        <p>{state.date} {state.time}</p>
      </div>
      <div className="info-sucess">
        <h2>Ingressos</h2>
        {state.seats.map((seat) => (
          <p>Assento {seat}</p>
        ))}
      </div>
      <div className="info-sucess">
        <h2>Comprador</h2>
        <p>Nome: {state.name}</p>
        <p>CPF: {cpf}</p>
      </div>

      <Button from={"success"}/>
    </div>
  )
}

