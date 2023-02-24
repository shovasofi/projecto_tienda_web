
// Expresión regular solo números
/** fuente: http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/ */

//validacion
function validaNum(checkNumero) {
    const EXP_REG_NUMEROS = /^[0-9]+$/;
    var checkNumero = document.getElementById("stock").value;// Números recibidos del formulario

    // Evaluamos números 
    if (checkNumero.match(EXP_REG_NUMEROS) != null) {
        console.log("Numero válido.")
        return true;
    } else {

        console.log("Numero inválido. Por favor, introduzca de nuevo.");
        return false;
    }

}


//aqui vamos buacr en el json y ofrecerá las opciones de seleccion
function call_ajax() {
    let promesa1 = new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "productos.json", true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    //buscar dentro del archivo json productos 
                    var jsonResponse = xhttp.responseText;
                    //pasarlo a objeto
                    var objeto_json = JSON.parse(jsonResponse);
                    //acceder a las propiedades
                    objeto_json.codigo_producto
                    resolve(objeto_json);
                } else {
                    reject();
                }
            }

        }

    });
    return promesa1;
};


//promise all
Promise.all(call_ajax())
    .then(e => console.log("todo ok "))
    .catch(e => console.log("error"));

console.log("hola")

//----------------------------------

const buscarInput = document.querySelector('#descripcion');
const listaSugerencias = document.querySelector('#sugerencias');

buscarInput.addEventListener('input', descripcion);

function descripcion() {
    const textoBuscado = buscarInput.value;
    if (textoBuscado.trim().length > 0) {
        getSugerencias(textoBuscado)
            .then(mostrarSugerencias)
            .catch(gestionarError);
    } else {
        limpiarSugerencias();
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
                    var objeto_json = JSON.parse(jsonResponse);
                    //acceder a las propiedades
                    var sugerencias = objeto_json.descripcion;


                    const sugerenciasFiltradas = sugerencias.filter(sugerencia =>
                        sugerencia.toLowerCase().startsWith(textoBuscado.toLowerCase()));
                    resolve(sugerenciasFiltradas);
                } else {
                    reject();
                }
            }

        }

        
    });

}

Promise.all(getSugerencias())
    .then(e => console.log("todo ok "))
    .catch(e => console.log("error"));

function mostrarSugerencias(sugerencias) {
    listaSugerencias.innerHTML = '';
    sugerencias.forEach(sugerencia => {
        const li = document.createElement('li');
        li.textContent = sugerencia;
        listaSugerencias.appendChild(li);
    });
}

function gestionarError(error) {
    console.error(error);
}

function limpiarSugerencias() {
    listaSugerencias.innerHTML = '';
}