const shopContent = document.getElementById("shopContent");
const productos = [
    {id: 1, nombre: "Geranio", precio: 500, img: "/media/Geranio.jpg", cantidad: 1},
    {id: 2, nombre: "Jazmín", precio: 3500, img: "/media/Jazmin.jpg", cantidad: 1},
    {id: 3, nombre: "Dólar", precio: 600, img: "/media/Dolar.jpg", cantidad: 1},
    {id: 4, nombre: "Potus", precio: 850, img: "/media/potus.jpg", cantidad: 1},
];

const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");


let carrito = []; 
productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="precio">${product.precio} $</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Añadir al carrito"
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () =>{
        
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
        if (repeat === true){
            carrito.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        carritoCounter();
    })
});

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement ("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito</h2>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h2");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    
    modalHeader.append(modalButton);
    
    
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p> $ ${product.precio}</p>
            <p>Cantidad: ${product.cantidad}</p>
            <p>Total: $ ${product.cantidad * product.precio}</p>
        `;
        
        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌"; 
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: $ ${total}`;
    modalContainer.append(totalBuying);
};
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
};