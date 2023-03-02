
// Expresión regular solo números
// getElements

//validacion

window.onload= function(){

    let stringp=localStorage.getItem('guardado');
    productos = JSON.parse(stringp);




}


function validaNum(numeroStock) {
    const EXP_REG_NUMEROS = /^[1-9]\d*$/;
    // var numeroStock = document.getElementById("stock").value;// Números recibidos del formulario


    // Evaluamos números 
    if (numeroStock.match(EXP_REG_NUMEROS) != null) {
        //alert("Numero válido.")
        return true;
    } else {
        // alert("Numero inválido. Por favor, introduzca de nuevo.");
        return false;
    }

}


//aqui vamos buacr en el json y ofrecerá las opciones de seleccion



//----------------------------------

const buscarInput = document.querySelector('#descripcion');
const listaSugerencias = document.querySelector('#sugerencias');
const cantidad = document.getElementById("stock");
const btn = document.getElementById("submit");

buscarInput.addEventListener('input', descripcion);

function descripcion() {
    var textoBuscado = buscarInput.value;
    if (textoBuscado.trim().length > 0) {
        getSugerencias(textoBuscado)
            .then(mostrarSugerencias)
            .catch(gestionarError);
    }
}

function getSugerencias(textoBuscado) {
    return new Promise((resolve, reject) => {
        // Peticion asincrona para obtener sugerencias y resolver la promesa con
        // los resultados. Aqui se devuelven sugerencias estáticas.
        //const sugerencias = ['Prod1', 'Prrod2', 'Pprod3', 'Clara', 'IES'];
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "productos.json", true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    //buscar dentro del archivo json productos 
                    var jsonResponse = xhttp.responseText;
                    //pasarlo a objeto
                    var objeto_json = productos;
                    //acceder a las propiedades


                    var sugerencias = objeto_json;
                    console.log(cantidad);
                    // console.log(objeto_json);
                    var sugerenciasFiltradas = sugerencias.filter((sugerencia) =>

                        sugerencia.descripcion.toLowerCase().startsWith(textoBuscado.toLowerCase())

                    );

                    if (sugerencias.filter(e => e.stock > 0)) {
                        //  validaNum(cantidad);
                        // sugerencias.filter(e => e.precio)
                        //var prcioCantidad = sugerencias.filter(e => e.precio * cantidad )
                        resolve(sugerenciasFiltradas.filter(e => e.stock > 0)
                            .map(e => ` producto: ${e.descripcion} precio: ${e.precio}€   precio total por ${cantidad.value}: ${e.precio * cantidad.value}€  `))


                    }


                    // resolve(sugerenciasFiltradas.filter((e=> e.stock > 0).map( e=> e.descripcion)))

                }

            }
        }

    }

    );

}

//btn.addEventListener("submit", descripcion);

function carritoCompra() {

    let texto = document.getElementById("texto").value;
    let div = document.createElement("div");
    let text = document.createTextNode(texto);
    let eliminar_bt = document.createElement("button");
    div.className = "task";
    eliminar_bt.className = "delete";
    eliminar_bt.textContent = "eliminar ";

    div.appendChild(text);

    block.append(div);
    div.appendChild(eliminar_bt);

}

var img;
function mostrarImg() {

    img = document.createElement("img");
    img.src = "índice.jpeg";
    window.document.body.appendChild(img);

}
/*
Promise.all(getSugerencias())
    .then(e => console.log("todo ok "))
    .catch(e => console.log("error"));
    */

function mostrarSugerencias(sugerencias) {
    listaSugerencias.innerHTML = '';
    var li = document.createElement('li');
    var boton_anadir = document.createElement('input');
    boton_anadir.addEventListener("click", crearCarrito);

    sugerencias.forEach(sugerencia => {

        li.setAttribute("id", "producto");
        li.textContent = sugerencia;
        listaSugerencias.appendChild(li);

        boton_anadir.setAttribute("id", "submit_anadir_carrito");
        boton_anadir.setAttribute("type", "button");
        boton_anadir.setAttribute("value", "Añadir");

        //boton_anadir.textContent = " Añadir";
        li.appendChild(boton_anadir);

        li.addEventListener("mouseover", mostrarImg);
        li.addEventListener("mouseout", limpiarSugerencias);

    });

}

function gestionarError(error) {
    console.error(error);
}

function limpiarSugerencias() {
    img.src = '';
}


/***** PARTE DEL CARRITO F) */

function crearCarrito() {
    let lista_carrito = document.getElementById("carrito_lista");
    let div_carrito = document.getElementById("carrito");
    let valor = document.getElementById("producto").textContent; // pone el texto

    let li = document.createElement("li");
    let text = document.createTextNode(valor);
    // boton eliminar producto
    let eliminar_boton = document.createElement("button");
    eliminar_boton.className = "delete";
    eliminar_boton.textContent = "eliminar ";

    //funcionalidad boton eliminar
    eliminar_boton.onclick = function () {
        this.parentNode.remove();
    }

    div_carrito.append(li)
    li.append(eliminar_boton);
    li.append(text);
    lista_carrito.appendChild(li);


}

function calculaCarrito() {


}





// REDIRIGE A DESCRIPCIÓN DE PRODUCTOS CON EL ATAJO
document.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === " ") {
        window.open("definiciones.html")
        event.preventDefault();
    }

});

function calcular_carrito(){
    var calculoTotal = lista_carrito.reduce((a, b) => a + (Number(b[1]) * Number(b[2])), 0);

    document.getElementById("cantidad_total").textContent = parseFloat(calculoTotal.toFixed(2));
}