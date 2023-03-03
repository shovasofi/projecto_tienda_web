window.onload = function () {
    // esta mini función carga el json y lo transforma a array de obj durante la carga de la página para ver el total con local storage
    let total = Number(JSON.parse(localStorage.getItem('total')))

    document.getElementById("agradecer").textContent = "Gracias por su compra. Ha pagado en total " + total;

}