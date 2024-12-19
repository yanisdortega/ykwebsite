// Función para mostrar en consola el JSON
function logProductArrayAsJSON() {
    fetch('../datos/productos.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
      })
      .then(data => {
        const productArray = data.map(product => {
          return {
            id: product.id,
            name: product.nombre,
            price: product.precio,
            description: product.detalles,
            stock: product.stock
          };
        });
  
        console.log(JSON.stringify(productArray, null, 2));
      })
      .catch(error => console.error('Error:', error));
  }
  
  logProductArrayAsJSON();
// Funcion para el carrito