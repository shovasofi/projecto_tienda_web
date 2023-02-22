
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
                    resolve(this.codigo)
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



