// LOCAL STORAGE
window.onload = function () {

    if (localStorage.getItem('guardado') != undefined) {

        listado = JSON.parse(localStorage.getItem('guardado'))

    }
    document.getElementById("botonañadir").addEventListener("click", añadirProducto)
    document.getElementById("botoneliminar").addEventListener("click", eliminarProducto)

    crearLista();
}
// MOSTRAMOS LISTA
function crearLista() {

    var divlistado = document.getElementById("divlistado");

    for (let i = 0; i < listado.length; i++) {
        let liLista = document.createElement("li");
        let json_producto = JSON.stringify(listado[i]);
        liLista.innerHTML = json_producto;
        divlistado.append(liLista);
    }

}
// AÑADIMOS PRODUCTOS
function añadirProducto() {

    let codigo = document.getElementById("inputcodigo").value;
    let nombre = document.getElementById("inputnombre").value;
    let cantidad = document.getElementById("inputcantidad").value;
    let precio = document.getElementById("inputprecio").value;
    //metemos productos con push en el array de objetos
    listado.push({

        codigo_producto: codigo,
        descripcion: nombre,
        cantidad: cantidad,
        precio: precio

    });
    //convertimos a JSON
    let stringp = JSON.stringify(listado);
    localStorage.setItem('guardado', stringp); //guardamos en local storage
}

// ELIMINAMOS PRODUCTOS
function eliminarProducto() {

    let codigo = document.getElementById("inputcodigoelim").value;

    for (let i = 0; i < listado.length; i++) {
        if (codigo == listado[i].codigo_producto) {
            listado.splice(i, 1);
        }
    }
    // para eliminar un objeto hacemos lo mismo
    let stringp = JSON.stringify(listado);
    localStorage.setItem('guardado', stringp);
}
