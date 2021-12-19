import { Link } from "react-router-dom";
import "./style.css"

export default function Success({sessionInfo, infosBuyer}) {  
  const tickets = [...sessionInfo.seats.filter((seat) => 
    seat.isSelected === true
  )]

  return (
    <div className="success-page">
      <h1>Pedido feito com sucesso!</h1>
      <div>
        <h2>Filme e sessão</h2>
        <p>{sessionInfo.movie.title}</p>
        <p>{sessionInfo.day.date} {sessionInfo.name}</p>
      </div>
      <div>
      <h2>Ingressos</h2>
        {tickets.map((ticket) => (
          <p key={ticket.id}>Ingresso {ticket.name}</p>
        ))}
      </div>
      <div>
        <h2>Comprador</h2>
        <p>{infosBuyer.name}</p>
        <p>{infosBuyer.cpf}</p>
      </div>

      <Link to="/" className={"btnHome"}>
        <p>Voltar para home</p>
      </Link>
    </div>
  )
}

