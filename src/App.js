import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import Header from "./components/Header"
import Movies from "./components/Movies"
import Seats from "./components/Seats"
import Sessions from "./components/Sessions"


export default function App(){
  const [movieInfo, setMovieInfo] = useState("")

  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Movies/>}></Route>
        <Route path="/sessoes/:movieId" element={<Sessions movieInfo={movieInfo} setMovieInfo={setMovieInfo}/>}></Route>
        <Route path="/assentos/:sessionId" element={<Seats movieInfo={movieInfo}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
