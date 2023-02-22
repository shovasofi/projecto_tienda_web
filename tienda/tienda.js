
// Expresión regular solo números
/** fuente: http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/ */
const EXP_REG_NUMEROS= /^[0-9]+$/;
var checkNumero= document.getElementById("stock").value;// Números recibidos del formulario

function validaNum (checkNumero) { 
    // Evaluamos números 
    if (checkNumero.match(EXP_REG_NUMEROS) != null) {
        console.log("Numero válido.")
    }
    if (checkNumero.match(EXP_REG_NUMEROS) == null) {
        console.log("Numero inválido. Por favor, introduzca de nuevo.");
    }
}
 