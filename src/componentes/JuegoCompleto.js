import React, { useEffect,  useState } from 'react'
import { resultado } from '../helper/funciones'
import { obtPalabraFetch } from '../helper/obtPalabraFetch'
import { Inicio } from './Inicio'
import { Juego } from './Juego'
import { ResultadoFinal } from './ResultadoFinal'
import '../style.css'


export const JuegoCompleto = () => {

    const [palabraEscondida, setPalabraEscondida] = useState('')
    const [palabra, setPalabra] = useState('')
    const [error, setError] = useState('')
    const [inicio, setInicio] = useState(true)
    const [contP, setContP] = useState(0)
    
    let result=resultado(contP,palabraEscondida)

    useEffect(() => {

        obtPalabraFetch()
        .then(resp=>{
            setPalabraEscondida(resp.split('').fill('_'))
            setPalabra(resp.toUpperCase())
        })
        .catch(err=>{ 
          console.log(error)
          setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")})

        }, [])


return (
    <>

        {
            inicio? <Inicio setInicio={setInicio}/>
            :(result
            ? <ResultadoFinal 
            palabraEscondida={palabraEscondida}
            palabra={palabra}
            setInicio={setInicio}
            contP={contP}
            setContP={setContP}
            setPalabra={setPalabra}
            setPalabraEscondida={setPalabraEscondida}
            setError={setError}
            
            /> 
            :(error 
            ? <div id='error'><p className='lose-msg'>{error}</p></div>
            :<Juego 
            error={error}
            palabra={palabra}
            palabraEscondida={palabraEscondida}
            setPalabraEscondida={setPalabraEscondida}
            contP={contP}
            setContP={setContP}
            />
            )
            )
        }
        
    </>
    
  )
}
