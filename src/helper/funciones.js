

export const removeAccents = (str) => {
    return str.normalize('NFD')
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
    .normalize()
    //normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

export const blocker = (bloqueFinal) => {
    
  bloqueFinal.classList.remove("hide");
};  

export const resultado=(cont, palabra)=>{

  if(cont===6 || (!palabra.includes('_') && palabra.length>0)){
    return true}
    else { return false
  }
}
