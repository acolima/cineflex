import "./style.css"

function Session({id, weekday, date, showtimes}) {
  return (
    <div className="session">
      <span className="date">{weekday} - {date}</span>
      <div>
        {showtimes.map((time) => (
          <div className="session-time" key={time.id}><p>{time.name}</p></div>
        ))}
      </div>
    </div>
  )
}

export default Session