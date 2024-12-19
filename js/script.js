//creo un nuevo objecto xmlhttp-request para la solicitud
let http = new XMLHttpRequest();

http.open('get', '../datos/productos.json', true);

http.send();

http.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
        let productos = JSON.parse(this.responseText);
        let output = `<div class="row gy-4">`; 

        //Generacion de las cards productos
        for (let item of productos) {
            output += `
            <div class="tarjeta col-12 col-sm-6 col-md-4 col-lg-3"> 
                <div class="card h-100">
                    <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                    <div class="card-body">
                        <h3 class="card-title">${item.nombre}</h3>
                        <p class="card-text"><strong class="precio">$${item.precio}</strong></p>
                        <button class="btn btn-primary description-btn" onclick="toggleDescription(this)">+ info</button>
                        <p class="card-description mt-3" style="display: none;">${item.detalles}</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-secondary w-100">Añadir al carrito</a>
                    </div>
                </div>
            </div>`;
        }

        output += `</div>`; 

        document.querySelector(".productos").innerHTML = output;
    }
};
//funcion para extender el detalle de cada producto con el boton + info
function toggleDescription(button) {
    const cardDescription = button.closest('.card-body').querySelector('.card-description');

    if (cardDescription.style.display === 'none' || !cardDescription.style.display) {
        cardDescription.style.display = 'block';
        button.textContent = '- info';
    } else {
        cardDescription.style.display = 'none';
        button.textContent = '+ info';
    }
}
