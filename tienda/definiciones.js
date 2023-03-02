//acceder al json

const xhttp = new XMLHttpRequest();
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
            console.log(objeto_json);

            crearLista(objeto_json);
            /* var btn = document.getElementById("btn");
             btn.addEventListener("click", crearLista);*/
        }

    }
}

function crearLista(json) {

    var productos = json;
    var tabla = document.getElementById("tabla");


    for (let i = 0; i < productos.length; i++) {
        var productos = document.getElementById("productos");
        var codigo = document.getElementById("c");
        var descripcion = document.getElementById("d");
        var cantidad = document.getElementById("cantidad");
        var precio = document.getElementById("pre");


        for (let j = 0; j < productos.length; j++) {
            codigo.textContent = productos[i].codigo_producto;
            descripcion.textContent = productos[i].descripcion;
            cantidad.textContent = productos[i].precio;
            precio.textContent = productos[i].stock;
            
           // productos.appendChild(codigo);
        }

        tabla.appendChild(productos);


    }
}