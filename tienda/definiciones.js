//acceder al json

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "productos.json", true);
xhttp.send();

var productos;

xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            //buscar dentro del archivo json productos 
            var jsonResponse = xhttp.responseText;
            //pasarlo a objeto
            productos = JSON.parse(jsonResponse);
            //acceder a las propiedades
            console.log(productos);

            crearLista(productos);
            /* var btn = document.getElementById("btn");
             btn.addEventListener("click", crearLista);*/
        }

    }
}

function crearLista(productos) {

   
    var tabla = document.getElementById("tabla");


    for (let i = 0; i < productos.length; i++) {
        var product = document.createElement("tr");
       
        var col1= document.createElement("td");
        var col2=document.createElement("td");
        var col3= document.createElement("td");
        var col4= document.createElement("td");

        for (let j = 0; j < productos.length; j++) {
         
           
            col1.textContent  = productos[i].codigo_producto;
            col2.textContent = productos[i].descripcion;
            col3.textContent = productos[i].stock;
            col4.textContent = productos[i].precio;
            product.appendChild(col1);
            product.appendChild(col2);
            product.appendChild(col3);
            product.appendChild(col4);
           
           // productos.appendChild(codigo);
        }

        
        tabla.appendChild(product);


    }
}

function añadirProducto(){

    let codigo=document.getElementById("inputcodigo").value;    
    let nombre=document.getElementById("inputnombre").value;
    let stock=document.getElementById("inputStock").value;
    let precio=document.getElementById("inputPrecio").value;

   productos.push({

        codigo_producto: codigo,
        descripcion: nombre,
        cantidad: stock,
        precio: precio

    });

    console.log(productos[productos.length-1])    


    let stringp = JSON.stringify(productos);
    localStorage.setItem('guardado',stringp);



}

