/*
id 
Nombre
Suplidor
Categoria
CANTIDAD
Precio
UDM
 */

//Obtener los valores de los elementos visuales de la pagina.
const producto = document.getElementById("producto--input");
const anadir = document.getElementById("btn-anadir-producto");
const tabla = document.getElementById("tabla-principal");
const categoria = document.getElementById("listado-categoria");
const cantidad = document.getElementById("cantidad--input");
const suplidor = document.getElementById("listado-suplidores");
const UDM = document.getElementById("listado-udm");
const precio = document.getElementById("precio--input");

const borrarElemento = (id) => {
  const elementosActuales = JSON.parse(localStorage.getItem("producto"));
  if (elementosActuales.length === 1) {
    localStorage.setItem("producto", []);
    location.reload();
    return null;
  }
  elementosActuales.splice(id, 1);

  localStorage.setItem("producto", JSON.stringify(elementosActuales));
  location.reload();
};

const obtenerInfo = () => {
  try {
    if (localStorage.hasOwnProperty("producto")) {
      let categoriaActual = JSON.parse(localStorage.getItem("producto"));

      categoriaActual.forEach((element) => {
        $("#tabla-principal > tbody:last-child").append(`
          <tr>
          <td>${element.id}</td>
          <td>${element.nombre}</td>
          <td>${element.categoria}</td>
          <td>${element.suplidor}</td>
          <td>${element.precio}</td>
          <td>${element.cantidad}</td>
          <td>${element.fecha}</td>
          <td><img src="./trash-bin.png" onclick="borrarElemento(${element.id})" class="borrar"></td>
          </tr>`);
      });
    }
  } catch (e) {}
};

obtenerInfo();

const generarCodigo = (listadoDeElementos) => {
  debugger
  let conteo = 0;   
  listadoDeElementos.forEach(function (elemento) {
 
    if (conteo > elemento.id) {
      return conteo;
    } else {
      conteo++;
    }

    return conteo;
  });

  return conteo;
};

const cargarCategorias = () => {
  const listadoCategoria = JSON.parse(localStorage.getItem("categoria"));
  listadoCategoria.forEach((elemento) => {
    $("#listado-categoria").append(
      `<option>${elemento.nombre} - ${elemento.id} </option>`
    );
  });
};

const cargarSuplidores = () => {
  const listadoSuplidor = JSON.parse(localStorage.getItem("suplidor"));
  listadoSuplidor.forEach((elemento) => {
    $("#listado-suplidores").append(
      `<option>${elemento.nombre} - ${elemento.id} </option>`
    );
  });
};

const cargarUDM = () => {
  const listadoUDM = JSON.parse(localStorage.getItem("udm"));
  listadoUDM.forEach((elemento) => {
    $("#listado-udm").append(
      `<option>${elemento.nombre} - ${elemento.id} </option>`
    );
  });
};

//Para cargar los elementos de los listbox

cargarUDM();
cargarSuplidores();
cargarCategorias();

anadir.onclick = () => {
  let productoActual = null;

  //determinar si los valores existen
  if (!localStorage.hasOwnProperty("producto")) {
    localStorage.setItem("producto", JSON.stringify([]));
    //Tomar los valores de almacenados actualmente.
    productoActual = localStorage.getItem("producto");
  } else {
    productoActual = localStorage.getItem("producto");
  }

  console.log(productoActual);
  //Tomar los valores del formuarlo

  const nombreProducto = producto.value;
  const precioActual = precio.value;
  const hoy = new Date();
  const fechaActual =
    hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
  const idNuevo = generarCodigo(JSON.parse(productoActual));
  const categoriaActual = categoria.value;
  const suplidorActual = suplidor.value; 
  const cantidadActual = cantidad.value; 
  const udmActual = UDM.value;


  //Validar campos
  if (nombreProducto === "" || categoriaActual === "" || suplidorActual === "" || udmActual === "") {
    alert("Porfavor coloque la informacion en el cuadro de texto.");
    return null;
  }

  //Encapsular los valores del formulario
  const productoObjeto = {
    nombre: nombreProducto,
    fecha: fechaActual,
    categoria: categoriaActual,
    suplidor: suplidorActual,
    udm: udmActual, 
    cantidad: cantidadActual,
    precio: precioActual,
    id: idNuevo,
  };

  console.log(productoObjeto);

  //Crear un nuevo arreglo de categorias con la información que tenía el otro.
  const arregloProductos = JSON.parse(productoActual);
  //Añadir la informacion recopilada del formulario
  arregloProductos.push(productoObjeto);
  //Alamacenar esa información en el local storage proximo a todo el proceso
  localStorage.setItem("producto", JSON.stringify(arregloProductos));
  location.reload();
};
