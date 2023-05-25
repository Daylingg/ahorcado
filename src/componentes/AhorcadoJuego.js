import React, { useEffect, useRef, useState } from 'react'
import { obtPalabraFetch } from '../helper/obtPalabraFetch'
import { useNavigate} from 'react-router-dom'
import { canvasCreator } from '../helper/canvasCreator'
import { blocker, removeAccents } from '../helper/funciones'


export const AhorcadoJuego = () => {

    
    const [palabraEscondida, setPalabraEscondida] = useState('')
    const [palabra, setPalabra] = useState('')
    const [contG, setContG] = useState(0)
    const [contP, setContP] = useState(0)
    const [error, setError] = useState('')
    const canvasR=useRef(null)
    const navigate=useNavigate()

    let winCount=contG,
          count=contP,
          palabraSpan='',
          palabraAdivinar=''

    let $button=document.getElementsByClassName('botLet')
    const $resultText = document.getElementById("texto-resultante");
    const $contenedorNuevoJuego = document.getElementById("contenedor-nuevo-juego");
    let dashes = document.getElementsByClassName("dashes")
    
   useEffect(() => {

    obtPalabraFetch()
    .then(resp=>{
      
      //setPalabraMostrar(resp.toUpperCase().split(''))
      setPalabraEscondida(resp.split('').fill('_'))
      setPalabra(resp.toUpperCase())
    })
    .catch(err=>{
       setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion")
     }
     )

   }, [])

    useEffect(() => {
      
      let { initialDrawing } = canvasCreator(canvasR);
      initialDrawing();
    }, [])
    

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator(canvasR);
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

  const inicio=()=>{
    $contenedorNuevoJuego.classList.add("hide");
    navigate('/',{replace:true})
  }

  const reiniciar=()=>{
    $contenedorNuevoJuego.classList.add("hide");

    for (let i = 0; i < $button.length; i++) {
        $button[i].disabled=false
    }

    let { initialDrawing } = canvasCreator(canvasR)
    initialDrawing();

    setContG(0)
    setContP(0)
    setPalabra('')
    setPalabraEscondida('')
    setError('')
    

    obtPalabraFetch()
    .then(resp=>{
      
      setPalabraEscondida(resp.split('').fill('_'))
      setPalabra(resp.toUpperCase())
      setError('')
    })
    .catch(err=> setError(err.statusText||"Ocurrio un error inesperado. Revise la conexion") )
   
  }
    
  const handleGame=({target})=>{
    target.disabled=true

    let letra =target.value
    palabraSpan=palabra
    
    palabraAdivinar=removeAccents(palabraSpan)
    palabraAdivinar= palabraAdivinar.split('')

    if(palabraAdivinar.includes(letra)){
      
      palabraAdivinar.forEach((char, index) => {
              if (char === letra) {
                dashes[index].innerText = char;
                
                winCount += 1;
                
                if (winCount === palabraAdivinar.length) {
                  $resultText.innerHTML = `<h2 class='win-msg'>Has Ganado 🤩 !!!</h2><p>La palabra era: <span>${palabraSpan}</span></p>`;
                  
                  blocker($contenedorNuevoJuego);
                }
              }            
            })
    }else{
      
      count +=1; 
      
          drawMan(count);
          
          if (count === 6) {
            $resultText.innerHTML = `<h2 class='lose-msg'>Has Perdido 😢 !!!</h2><p>La palabra era: <span>${palabraSpan}</span></p>`;
            
            blocker($contenedorNuevoJuego);
          }
    }
  }

  return (
    <>
    
    {error ? <div id='error'><p className='lose-msg'>{error}</p></div>
      :<div className="container">      
      
      {!palabraEscondida?<div id='cargando'>Cargando....</div>:<div id="user-input-section">{
      palabraEscondida.map((value,i)=>(<span className="dashes" key={i}>{value}</span>))
      }</div>}
       
      <canvas ref={canvasR} id="canvas"></canvas>

      {palabraEscondida && <div className="letter-container" id="bot">
        <table className='table' >
        <tbody>
            <tr>
                <td><input className="botLet" type='button' name='botA' value="A" onClick={handleGame} /></td>
                <td> <input className="botLet" type='button' name='botB' value="B" onClick={handleGame}/></td>
                <td>  <input className="botLet" type='button' name='botC' value="C" onClick={handleGame} /></td>
                <td> <input className="botLet" type='button' name='botD' value="D" onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botE' value="E" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botF' value="F"  onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botG' value="G" onClick={handleGame}/></td>
            </tr>
            <tr>
                
                <td><input className="botLet" type='button' name='botH' value="H" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botI' value="I" onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botJ' value="J" onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botK' value="K" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botL' value="L" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botM' value="M" onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botN' value="N" onClick={handleGame}/></td>
            </tr>
            <tr>
                <td><input className="botLet" type='button' name='botÑ' value="Ñ" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botO' value="O" onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botP' value="P" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botQ' value="Q" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botR' value="R" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botS' value="S" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botT' value="T" onClick={handleGame} /></td>
                
            </tr>
            <tr>
                <td><input className="botLet" type='button' name='botU' value="U" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botV' value="V" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botW' value="W" onClick={handleGame}/></td>
                <td> <input className="botLet" type='button' name='botX' value="X" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botY' value="Y" onClick={handleGame}/></td>
                <td><input className="botLet" type='button' name='botZ' value="Z" onClick={handleGame}/></td>
            
            </tr>
                        
        </tbody>
            
        </table>
    </div>}
            
      <div id="contenedor-nuevo-juego" className="new-game-popup hide">
        <div id="texto-resultante"></div>
        <div id='container-button'>
          <button id="new-game-button" onClick={inicio}>Inicio</button>
        <button id="game-button" onClick={reiniciar}>Reiniciar Juego</button>
        </div>
        
      </div>
      
    </div>}
    </>
    
  )
}
