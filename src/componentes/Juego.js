import React, { useEffect, useRef, useState } from 'react'
import { canvasCreator, drawMan } from '../helper/canvasCreator'
import { removeAccents } from '../helper/funciones'

export const Juego = ({error,palabra,palabraEscondida,setPalabraEscondida,setContP,contP}) => {

    const canvasR=useRef(null)
    const [alfabeto, setAlfabeto] = useState([
        { letra:'A', select:false}, { letra:'B', select:false}, { letra:'C', select:false}, { letra:'D', select:false},
        { letra:'E', select:false}, { letra:'F', select:false}, { letra:'G', select:false}, { letra:'H', select:false},
        { letra:'I', select:false}, { letra:'J', select:false}, { letra:'K', select:false}, { letra:'L', select:false},
        { letra:'M', select:false}, { letra:'N', select:false}, { letra:'Ñ', select:false}, { letra:'O', select:false},
        { letra:'P', select:false}, { letra:'Q', select:false}, { letra:'R', select:false}, { letra:'S', select:false},
        { letra:'T', select:false}, { letra:'U', select:false}, { letra:'V', select:false}, { letra:'W', select:false},
        { letra:'X', select:false}, { letra:'Y', select:false}, { letra:'Z', select:false},
    ])
    

    let count=contP

    let palabraAdivinar=''
    

useEffect(() => {
    let { initialDrawing } = canvasCreator(canvasR);
        initialDrawing();
    }, [])


    const handleGame=(value,i)=>{
        
        let letra =value, //target.lastChild.data,
        palabraSpan=palabra,
        letraPalabra=[...palabraEscondida],
        letraSelect=[...alfabeto]
   
        palabraAdivinar=removeAccents(palabraSpan)
        palabraAdivinar= palabraAdivinar.split('')

        if(alfabeto[i].select===false){
            
            if(palabraAdivinar.includes(letra)){

            palabraAdivinar.forEach((char, index) => {
                if (char === letra) {
                letraPalabra[index]=char
                setPalabraEscondida(letraPalabra)
                }            
            })
        }else{
            count+=1
            setContP(contP + 1)
        
            drawMan(count,canvasR);

        }
        }
        

        letraSelect[i].select=true
        setAlfabeto(letraSelect)
    }

    return (
    <>
    {error ? <div id='error'><p className='lose-msg'>{error}</p></div>
        :<div className="container">      
        
        {!palabraEscondida?<div id='cargando'>Cargando....</div>:<div id="user-input-section">{
        palabraEscondida.map((value,i)=>(<span className="dashes" key={i}>{value}</span>))
        }</div>}
        
        <canvas ref={canvasR} id="canvas"></canvas>

        {palabraEscondida && <div className="letter-container" id="bot">{
            alfabeto.map((value,i)=>(<div  className={'alfabeto ' + ((value.select)?'button':'')} key={i} onClick={()=>{handleGame(value.letra,i)}}>{value.letra}</div>))}</div>}

        </div>}
    </>
    )
}
/**alfabeto.map((value,i)=>(<div disabled={value.select}  className={'alfabeto ' )} key={i} onClick={()=>{handleGame(value.letra,i)}}>{value.letra}</div>))} */