// Función para mostrar en consola el JSON
let productos = [];

// Cargar los productos desde el archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch('../datos/productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        
        productos = data.map(product => {
            return {
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                detalles: product.detalles,
                stock: product.stock
            };
        });

        console.log('Productos cargados:', productos);
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarProductos();


// Funcion para el carrito
// Constante para el IVA
const IVA = 0.21; 

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio, productoKey) {
    // Asegurarte de que 'productoKey' corresponde a un índice válido
    const producto = productos.find(product => product.id === productoKey);

    // Validar stock
    if (producto.stock <= 0) {
        alert('¡Producto agotado!');
        return;
    }

    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar nuevo producto
    carrito.push({ 
        nombre: producto.nombre, 
        precio: producto.precio,
        productoKey: producto.id
    });

    // Reducir stock
    producto.stock--;
    document.getElementById(`stock-${producto.id}`).textContent = producto.stock;

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar vista del carrito
    renderizarCarrito();
}



function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const subtotalCarrito = document.getElementById('subtotal-carrito');
    const ivaCarrito = document.getElementById('iva-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpiar lista anterior
    listaCarrito.innerHTML = '';
    
    // Totales iniciales
    let subtotal = 0;
    
    // Renderizar cada producto
    carrito.forEach((producto, index) => {
        const productoInfo = productos[producto.productoKey];
        const li = document.createElement('li');
        
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} 
        `;
        
        // Botón para eliminar producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
        
        // Sumar al subtotal 
        subtotal += producto.precio;
    });
    
    // Calcular IVA
    const ivaTotal = subtotal  * IVA;
    const total = subtotal + ivaTotal;
    
    // Actualizar totales
    subtotalCarrito.textContent = subtotal.toFixed(2);
    ivaCarrito.textContent = ivaTotal.toFixed(2);
    totalCarrito.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Recuperar el producto para devolver stock
    const producto = productos.find(p => p.id === carrito[index].productoKey);
    if (producto) {
        producto.stock++;
        document.getElementById(`stock-${producto.id}`).textContent = producto.stock;
    }
    
    // Eliminar producto por índice
    carrito.splice(index, 1);
    
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Renderizar de nuevo
    renderizarCarrito();
}

function vaciarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Restaurar stock de todos los productos en el carrito
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.productoKey);
        if (producto) {
            producto.stock += 1;
            document.getElementById(`stock-${producto.id}`).textContent = producto.stock;
        }
    });

    // Limpiar el carrito del localStorage
    localStorage.removeItem('carrito');
    
    // Renderizar carrito vacío
    renderizarCarrito();
}

function cargarCarrito() {
    // Cargar carrito al iniciar la página
    renderizarCarrito();
}

// checkout
function mostrarCheckout() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Validar que hay productos en el carrito
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'block';  

    const subtotal = parseFloat(document.getElementById('subtotal-carrito').textContent);
    const iva = parseFloat(document.getElementById('iva-carrito').textContent);
    const total = parseFloat(document.getElementById('total-carrito').textContent);
    
    document.getElementById('modal-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('modal-iva').textContent = iva.toFixed(2);
    document.getElementById('modal-total').textContent = total.toFixed(2);
}

function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';  // Ocultar el modal cuando se cancele
}



function realizarCompra() {
    // Simular compra
    alert('¡Compra realizada con éxito!');
    
    // Vaciar carrito
    localStorage.removeItem('carrito');
    
    // Cerrar modal
    cerrarCheckout();
    
    // Renderizar carrito vacío
    renderizarCarrito();
}

function cerrarCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}