import "./style.css"

function Footer({movieInfo}) {
  return (
    <footer>
      <div className="movie-poster">
        <img src={movieInfo.posterURL} alt={movieInfo.ttle}/>
      </div>
      <div className="movie-title">{movieInfo.title}</div>
    </footer>
  )
}

export default Footer;