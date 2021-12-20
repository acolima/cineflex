import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import Header from "./components/Header"
import Movies from "./components/Movies"
import Seats from "./components/Seats"
import Sessions from "./components/Sessions"
import Success from "./components/Success"


export default function App(){

  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Movies/>}></Route>
        <Route path="/sessoes/:movieId" element={<Sessions/>}></Route>
        <Route path="/assentos/:sessionId" element={<Seats />}></Route>
        <Route path="/sucesso" element={<Success/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
