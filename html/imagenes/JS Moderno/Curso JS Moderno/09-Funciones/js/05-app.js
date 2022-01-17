prompt('Cual es tu edad?');
// Funciones que toman parametros y argumentos...

// Nuestra primera función no tiene nada de emocionante, es demasiado simple, para que tus funciones puedan ser más versatiles e inteligentes deberán utilizar parametros y argumentos


function saludar(nombre, edad) { // nombre y apellido son parametros, son valores que se le pueden pasar a la función... Los valores digamos no son reales, pues son variables...
    nombre = prompt('cual es tu nombre')
    edad = prompt('cual es tu edad')
    console.log( `Hola ${nombre}  ${edad} ` );
}


saludar();