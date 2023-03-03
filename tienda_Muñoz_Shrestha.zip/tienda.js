// var global para manejar los objetos de la lista
var carrito = [];


window.onload = function () {

    if (localStorage.getItem('guardado') != undefined) {

        let stringp = localStorage.getItem('guardado');
        listado = JSON.parse(stringp);

    }

}


// Expresión regular solo números
//validacion

function validaNum(numeroStock) {
    const EXP_REG_NUMEROS = /^[1-9]\d*$/;
    // var numeroStock = document.getElementById("stock").value;// Números recibidos del formulario


    // Evaluamos números 
    if (numeroStock.match(EXP_REG_NUMEROS) != null) {
        alert("Numero válido.")
        return true;
    } else {
        alert("Numero inválido. Por favor, introduzca de nuevo.");
        return false;
    }

}


//aquí vamos buacr en el JSON y ofrecerá las opciones de seleccion

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
        var sugerencias = listado;

        // console.log(objeto_json);
        var sugerenciasFiltradas = sugerencias.filter((sugerencia) =>

            sugerencia.descripcion.toLowerCase().startsWith(textoBuscado.toLowerCase())

        );

        if (sugerencias.filter(e => e.stock > 0)) {
            //  validaNum(cantidad);
            // sugerencias.filter(e => e.precio)
            //var prcioCantidad = sugerencias.filter(e => e.precio * cantidad )
            resolve(sugerenciasFiltradas.filter(e => e.stock > 0)
                .map(e => e.descripcion))




        }


        // resolve(sugerenciasFiltradas.filter((e=> e.stock > 0).map( e=> e.descripcion)))

    }

    )
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
    // mostramos sugerencias generando listas
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
    // generamos tabla
    let fila = document.createElement("tr");
    let celda1 = document.createElement("td");
    let celda2 = document.createElement("td");
    let celda3 = document.createElement("td");
    let precio = listado.map(e => { if (e.descripción == celda1.textContent); return e.precio; })[0];
    celda1.textContent = document.getElementById("producto").textContent;
    celda2.textContent = document.getElementById("stock").value;
    celda3.textContent = Number(precio * document.getElementById("stock").value);

    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celda3);

    document.getElementById("carrito_lista").appendChild(fila);

    console.log("celda" + celda1.textContent);

    var arr = listado.map(e => e.descripcion).filter(e => e == celda1.textContent);

    carrito.push([arr[0], Number(celda2.textContent)]); //carrito es ahora un array de arrays [producto, cantidad]

}

function calculaCarrito() {
    console.log(carrito);
    var total = 0;

    carrito.forEach(producto => {
        listado.forEach(e => {
            // si es igual a la descripcion y conincide, restamos del stock y mostramos el total
            if (producto[0] == e.descripcion) {
                e.stock = e.stock - producto[1];
                total = total + (e.precio * producto[1]);

                alert("total->" + total + " precio->" + producto[1] + " cantidad->" + e.precio);

            }
        })
    })
    // vaciamos carrito []
    carrito = [];
    document.getElementById("carrito_lista").innerHTML = "";

    // transformamos a JSON para guardar en local storage
    let stringp = JSON.stringify(listado);
    localStorage.setItem('guardado', stringp);

    // localStorage.clear();


    agradecer(total) // redirige a la pag de agradecimiento yendo a la funcion
}

function agradecer(numero) {

    window.location.replace('agradecimientos.html');
    localStorage.setItem('total', JSON.stringify(numero));

}

// REDIRIGE A DESCRIPCIÓN DE PRODUCTOS CON EL ATAJO
document.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === " ") {
        window.open("definiciones.html")
        event.preventDefault();
    }

});