//creo un nuevo objecto xmlhttp-request
let http = new XMLHttpRequest();

//y lo preparo con el metodo open()
http.open('get', '../datos/productos.json', true);

http.send();

http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let productos = JSON.parse(this.responseText);
        let output = `<div class="row gy-4">`; // Usamos Bootstrap para la grilla

        // Generar las tarjetas de productos
        for (let item of productos) {
            output += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3"> <!-- Tamaño adaptable -->
                <div class="card h-100">
                    <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${item.nombre}</h5>
                        <p class="card-text precio"><strong>$${item.precio}</strong></p>
                        <button class="btn btn-primary description-btn">+ info</button>
                        <p class="card-description mt-3" style="display: none; opacity: 0;">${item.detalles}</p>
                    </div>
                </div>
            </div>
            `;
        }

        output += `</div>`; // Cerrar la grilla de Bootstrap

        // Insertar el HTML generado en el DOM
        document.querySelector(".productos").innerHTML = output;

        // Asignar eventos a los botones después de que las tarjetas estén en el DOM
        const descr = document.querySelectorAll('.description-btn');

        descr.forEach(button => {
            button.addEventListener('click', () => {
                const cardDescription = button.closest('.card-body').querySelector('.card-description');

                if (cardDescription.style.display === 'none' || !cardDescription.style.display) {
                    cardDescription.style.display = 'block';
                    cardDescription.style.opacity = '1';
                    button.textContent = 'menos info';
                } else {
                    cardDescription.style.opacity = '0';
                    setTimeout(() => {
                        cardDescription.style.display = 'none';
                        button.textContent = '+ info';
                    }, 300);
                }
            });
        });
    }
};