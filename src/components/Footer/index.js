import "./style.css"

function Footer({type, posterURL, title, weekday, time}) {
  return (
    <footer>
      <div className="movie-poster">
        <img src={posterURL} alt={title}/>
      </div>
      <div>
        <div className="movie-title">{title}</div>
        {type && <div className="movie-title">{weekday} - {time}</div>}
      </div>
    </footer>
  )
}

export default Footer;