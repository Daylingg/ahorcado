import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { AhorcadoInicio } from './AhorcadoInicio'
import { AhorcadoJuego } from './AhorcadoJuego'

export const Routers = () => {
  return (
    <>
        <Router>

            <Routes>

                <Route path='/juego' element={<AhorcadoJuego/>}/>

                <Route path='/' element={<AhorcadoInicio/>}/>

            </Routes>

        </Router>
    </>
  )
}
