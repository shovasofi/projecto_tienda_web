
// Expresión regular solo números
// getElements

//validacion
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
                    var objeto_json = JSON.parse(jsonResponse);
                    //acceder a las propiedades


                    var sugerencias = objeto_json;
                    console.log(cantidad);
                   // console.log(objeto_json);
                    var sugerenciasFiltradas = sugerencias.filter((sugerencia) => 

                       sugerencia.descripcion.toLowerCase().startsWith(textoBuscado.toLowerCase())
        
                     );
                     
                     if (sugerencias.filter(e=> e.stock > 0)) {
                      //  validaNum(cantidad);
                       // sugerencias.filter(e => e.precio)
                      //var prcioCantidad = sugerencias.filter(e => e.precio * cantidad )
                     resolve(sugerenciasFiltradas.filter(e=> e.stock > 0)
                     .map( e=> ` producto: ${e.descripcion} precio: ${ e.precio}€   precio total por ${cantidad.value}: ${ e.precio * cantidad.value}€  `))
                        

                    }
                   

                   // resolve(sugerenciasFiltradas.filter((e=> e.stock > 0).map( e=> e.descripcion)))

                    }
                
            }
        }

    }
       
    );

}


btn.addEventListener("submit", descripcion);

function carritoCompra(){
   
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
function  mostrarImg(){

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
    sugerencias.forEach(sugerencia => {
        const li = document.createElement('li');
        li.className ="producto";
        li.textContent = sugerencia;
        listaSugerencias.appendChild(li);
        li.addEventListener("mouseover", mostrarImg );
        li.addEventListener("mouseout", limpiarSugerencias);

    });
}

function gestionarError(error) {
    console.error(error);
}

function limpiarSugerencias() {
    img.src = '';
}






