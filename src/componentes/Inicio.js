import React from 'react'
import  Ahorcado  from '../assets/kisspng-gibbeting-computer-icons-gallows-clip-art-5b1f4efa1835e7.8029924415287784900992.png'

export const Inicio = ({setInicio}) => {

    const handleClick=()=>{setInicio(false)}

  return (
    <>
    
    <div className='principal'>

        <h1>Juego del Ahorcado</h1>

        <img src={Ahorcado} alt='ahorcado'/>

        <button className='btn-inicio' onClick={handleClick}>Jugar</button>
        

    </div>

        
    </>
  )
}
