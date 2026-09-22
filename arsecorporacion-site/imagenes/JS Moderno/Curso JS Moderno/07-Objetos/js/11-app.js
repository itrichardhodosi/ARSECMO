const producto = {
    nombre: 'Monitor de 24 pulgadas',
    precio: 300,
    disponible: true
}


function Producto (nombre, precio) {
    this.nombre = nombre,
    this.precio = precio,
    this.disponible = true 
}

const producto2 = new Producto ('Monitor de 19 pulgadas', 500);
console.log(producto2);

const producto3 = new Producto ('Televisor', 400 );
console.log(producto3)