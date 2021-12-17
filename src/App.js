import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Movies from "./components/Movies"
import Sessions from "./components/Sessions"


export default function App(){
  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Movies/>}></Route>
        <Route path="/sessoes/:sessionId" element={<Sessions/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
