// De aquí en adelante estaremos viendo una serie de métodos de arreglos

const carrito = [
    { nombre: 'Monitor 20 Pulgadas', precio: 500},
    { nombre: 'Televisión 50 Pulgadas', precio: 700},
    { nombre: 'Tablet ', precio: 300},
    { nombre: 'Audifonos', precio: 200},
    { nombre: 'Teclado', precio: 50},
    { nombre: 'Celular', precio: 500},
]

// Recorrer un arreglo de la forma tradicional y mostrar su contenido...
for (let variable = 0 ; variable < carrito.length; variable ++){
    console.log (carrito[variable].nombre)

};

console.log (carrito[1].nombre);



