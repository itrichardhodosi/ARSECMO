const momenttz = require('moment-timezone')

/**
 * Función que, dado un texto, quita los caracteres especiales de HTML
 * 
 * @param {string} text Texto al que se le quitarán los caracteres especiales de HTML
 * @returns Nuevo texto con los caracteres cambiados
 */
const escapeHTML = text => {
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;")
}

/**
 * Función que, dado un RUN, indica si el dígito verificador corresponde o no al ingresado
 * 
 * @param {number} run Parte numérica del RUN
 * @param {string} dv Dígito Verificador
 * @returns true o false que indica que el RUN es válido o no
 */
const validaRUN = (run, dv) => {
  try {
    const runDigits  = run.toString().split('').reverse()
    const scalars = [2,3,4,5,6,7,2,3]
  
    const mod = runDigits.map( (digit, index) => {
      return parseInt(digit) * scalars[index]
    }).reduce( (total, value) => total + value, 0 ) % 11
  
    let calculatedDv = null
  
    if ( 11 - mod === 11) {
      calculatedDv = '0'
    } else if ( 11 - mod === 10 ) {
      calculatedDv = 'K'
    } else {
      calculatedDv = (11 - mod).toString()
    }
    
    return calculatedDv === dv
  } catch (error) {
    return false
  }
}

/**
 * Devuelve un string con un código único dentro de la base de datos.
 * Se basa en el timestamp para generar este código
 * 
 * @returns {String}
 */
const generateUniqueCode = () => momenttz(new Date()).utc()
                                  .format('YYMMDDhhmmss').split('').map(c => {
                                    const enc = ['6','F','B','2','8','X','H','Y','1','0']
                                    return enc[parseInt(c)]
                                  }).join('')

module.exports = {
  escapeHTML,
  validaRUN,
  generateUniqueCode,
}