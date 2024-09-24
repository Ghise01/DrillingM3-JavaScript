// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];  // Arreglo para almacenar los productos seleccionados
    }

    // Función para agregar productos al carrito
    agregarProducto(producto, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            this.productos.push(producto);
        }
        alert(`${cantidad} unidades de ${producto.nombre} agregadas al carrito.`);
    }

    // Función para calcular el total de la compra
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    // Función para mostrar detalles de la compra
    mostrarDetalles() {
        const detalles = this.productos.reduce((acc, producto) => {
            acc[producto.nombre] = (acc[producto.nombre] || 0) + 1;
            return acc;
        }, {});

        let mensaje = "Detalles de la compra:\n";
        for (const [nombre, cantidad] of Object.entries(detalles)) {
            mensaje += `${nombre}: ${cantidad} unidades\n`;
        }
        alert(mensaje);
    }

    // Función para finalizar la compra
    finalizarCompra() {
        const total = this.calcularTotal();
        this.mostrarDetalles();
        alert(`Total de la compra: $${total}`);
        this.productos = [];  // Vaciar el carrito
    }
}

// Productos disponibles
const productosDisponibles = [
    new Producto("Leche", 1000),
    new Producto("Pan de molde", 2000),
    new Producto("Queso", 1200),
    new Producto("Mermelada", 890),
    new Producto("Azúcar", 1300)
];

// Función para generar el mensaje con productos disponibles
function generarMensajeProductos() {
    let mensaje = "Productos disponibles:\n";
    productosDisponibles.forEach((producto, index) => {
        mensaje += `${index + 1}.- ${producto.nombre} $${producto.precio}\n`;
    });
    return mensaje;
}

// Función para seleccionar productos del usuario
function seleccionarProducto() {
    let carrito = new Carrito();
    let seguirComprando = true;

    while (seguirComprando) {
        // Mostrar productos disponibles en un prompt
        let mensajeProductos = generarMensajeProductos();
        let seleccion = parseInt(prompt(mensajeProductos + "\n Ingresa el número del producto que deseas agregar (o 0 para finalizar):"));

        if (seleccion === 0) break;

        if (seleccion > 0 && seleccion <= productosDisponibles.length) {
            let productoSeleccionado = productosDisponibles[seleccion - 1];
            let cantidad = parseInt(prompt(`¿Cuántas unidades de ${productoSeleccionado.nombre} deseas agregar?`));
            carrito.agregarProducto(productoSeleccionado, cantidad);

            // Mostrar detalles del carrito después de agregar productos
            carrito.mostrarDetalles();
        } else {
            alert("Selección no válida. Por favor, ingresa un número válido.");
        }

        seguirComprando = confirm("¿Deseas seguir agregando productos?");
    }

    if (carrito.productos.length > 0) {
        carrito.finalizarCompra();
    } else {
        alert("No agregaste productos al carrito.");
    }
}

// Iniciar proceso de compra
seleccionarProducto();
