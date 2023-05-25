import React, { useState } from 'react'
import { obtPalabraFetch } from '../helper/obtPalabraFetch'


export const ResultadoFinal = ({palabra,setInicio,contP,setContP,palabraEscondida,setPalabra,setPalabraEscondida,setError}) => {

  const [cargando, setCargando] = useState(false)

    const inicio=()=>{
      setInicio(true)
      setCargando(true)
      setContP(0)
      setPalabra('')
      setPalabraEscondida('')
      setError('')

      obtPalabraFetch()
        .then(resp=>{
            setPalabraEscondida(resp.split('').fill('_'))
            setPalabra(resp.toUpperCase())
        })
        .catch(err=>{ setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")})

    }


    const reiniciar=()=>{
      setCargando(true)
      setInicio(false)      
      setContP(0)
      setPalabra('')
      setPalabraEscondida('')
      setError('')
      
      obtPalabraFetch()
        .then(resp=>{
            setPalabraEscondida(resp.split('').fill('_'))
            setPalabra(resp.toUpperCase())
        })
        .catch(err=>{ setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")})

    }

  
      if(contP===6){
        
        return (
          <>
            { !cargando ? 
            <div id=" contenedor-nuevo-juego" className=" new-game">
        <div id="texto-resultante">
        <h2 className='lose-msg'>Has Perdido 😢 !!!</h2><p>La palabra era: <span>{palabra}</span></p>
        </div>
        <div id='container-button'>
          <button id="new-game-button" onClick={inicio}>Inicio</button>
        <button id="game-button" onClick={reiniciar}>Reiniciar Juego</button>
        </div>
        
      </div>:<div className=" new-game cargando">Cargando...</div> 
          }
          </>
          
         
    
  )
      }else{
        if(!palabraEscondida.includes('_')){
          
            return (
              <>
                { !cargando ? <div id=" contenedor-nuevo-juego" className=" new-game-popup">
            <div id="texto-resultante">
            <h2 className='win-msg'>Has Ganado 🤩 !!!</h2><p>La palabra era: <span>{palabra}</span></p>
            </div>
            <div id='container-button'>
              <button id="new-game-button" onClick={inicio}>Inicio</button>
            <button id="game-button" onClick={reiniciar}>Reiniciar Juego</button>
            </div>
            
          </div>:<div className=" new-game-popup cargando">Cargando...</div> 
            }
              </>
              
        
      )
        }
      }
    }

  

