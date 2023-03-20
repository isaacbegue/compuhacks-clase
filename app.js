/* Cargando header y footer */

    // Crear dos objetos XMLHttpRequest para cargar los archivos HTML

    let headerRequest = new XMLHttpRequest();
    let footerRequest = new XMLHttpRequest();

    // Cargar los archivos HTML de manera asíncrona
    headerRequest.open('GET', 'layout-header.html', true);
    footerRequest.open('GET', 'layout-footer.html', true);

    // Asignar una función que maneje el evento de carga para cada objeto XMLHttpRequest
    headerRequest.onload = function() {
        if (headerRequest.status >= 200 && headerRequest.status < 400) {
            // Inyectar el contenido del archivo en la etiqueta con id "header"
            document.getElementById('header').innerHTML = headerRequest.responseText;
        }
    };
    footerRequest.onload = function() {
        if (footerRequest.status >= 200 && footerRequest.status < 400) {
            // Inyectar el contenido del archivo en la etiqueta con id "footer"
            document.getElementById('footer').innerHTML = footerRequest.responseText;
        }
    };

    // Enviar la solicitud de carga para cada objeto XMLHttpRequest
    headerRequest.send();
    footerRequest.send();

/* Mostrar elementos según url */    

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // si hay variabla cat, entonces cambiamos el título y mostramos lo correspondiente
    if (urlParams.has('cat')) {
        let categoria = urlParams.get('cat');

        // cambiamos título
        document.getElementById('titulo').textContent = categoria.toUpperCase();

        //mostramos sección según corresponda
        
        // Obtenemos la referencia a las secciones que queremos ocultar o mostrar
        var seccionIngresar = document.getElementById("seccion-ingresar");
        var seccionRegistrarse = document.getElementById("seccion-registrarse");
    
        // Comprobamos el valor de la variable y cambiamos el valor de display
        if (categoria == "ingresar") {
            seccionIngresar.style.display = "block"; // Mostramos la sección ingresar
            seccionRegistrarse.style.display = "none"; // Ocultamos la sección registrarse
        } else if (categoria == "registrarse") {
            seccionIngresar.style.display = "none"; // Ocultamos la sección ingresar
            seccionRegistrarse.style.display = "block"; // Mostramos la sección registrarse
        } else {
            consultar_productos_json(categoria.toLowerCase());
        }

        
    }


function consultar_productos_json(categoria) {
        // Crear un objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Abrir una solicitud al servidor con el método GET y el nombre del archivo JSON
    xhr.open("GET", "productos.json");

    // Especificar el tipo de respuesta como JSON
    xhr.responseType = "json";

    // Definir una función que se ejecute cuando la solicitud se complete
    xhr.onload = function() {
        // Si el estado de la solicitud es exitoso
        if (xhr.status == 200) {
          // Obtener el objeto JavaScript a partir del archivo JSON
          var productos = xhr.response;
      
          // Obtener el elemento <section> del HTML
          var section = document.getElementById("productos");
      
              // Recorrer las categorías de productos
    for (var mostrarCategoria in productos) {
        // Verificar si el nombre de la categoría coincide con el de la variable
        if (mostrarCategoria.toLowerCase() == categoria.toLowerCase()) {
  
          // Crear un elemento <ul> para la categoría
          var ul = document.createElement("ul");
  
          // Recorrer los productos de la categoría
          for (var i = 0; i < productos[mostrarCategoria].length; i++) {
            // Obtener el producto actual
            var producto = productos[mostrarCategoria][i];
  
            // Crear un elemento <li> para el producto
            var li = document.createElement("li");
  
            // Crear un elemento <img> con la ruta de la imagen del producto
            var img = document.createElement("img");
            img.src = producto.imagen;
  
            // Crear un elemento <p> con el nombre del producto
            var p1 = document.createElement("p");
            p1.innerText = producto.nombre;
            p1.classList.add("nombre-producto")
  
            // Crear un elemento <p> con el precio del producto
            var p2 = document.createElement("p");
            p2.innerText = "$" + producto.precio;
            p2.classList.add("precio")
  
            // Crear un elemento <p> con la descripción del producto
            var p3 = document.createElement("p");
            p3.innerText = producto.descripcion;
            p3.classList.add("descripcion")
  
            // Agregar los elementos <img> y <p> al <li>
            li.appendChild(img);
            li.appendChild(p1);
            li.appendChild(p2);
            li.appendChild(p3);
  
            // Agregar el elemento <li> al <ul>
            ul.appendChild(li);
          }
  
          // Agregar el elemento <ul> al <section>
          section.appendChild(ul);
        }
      }
    }
  };
  
  // Enviar la solicitud al servidor
  xhr.send();
}