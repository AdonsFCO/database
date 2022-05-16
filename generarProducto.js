/*id 

Nombre
Categoria
Precio
 */

//Obtener los valores de los elementos visuales de la pagina.
const suplidor = document.getElementById("suplidor--input");
const anadir = document.getElementById("btn-añadir-suplidor");
const tabla = document.getElementById("tabla-principal");
const categoria = document.getElementById("listado-categoria");
const precio = document.getElementById("precio--input");


const borrarElemento = (id) => {

    
    const elementosActuales = JSON.parse(localStorage.getItem("suplidor"));
    if(elementosActuales.length === 1)
    {
      localStorage.setItem('suplidor', []);
      location.reload();
      return null;
    }
    elementosActuales.splice(id, 1);
  
    localStorage.setItem("suplidor", JSON.stringify(elementosActuales));
      location.reload();
  };
  

const obtenerInfo = () => {
    try
    {
    if (localStorage.hasOwnProperty("suplidor")) {
      let categoriaActual = JSON.parse(localStorage.getItem("suplidor"));
  
      categoriaActual.forEach((element) => {
        $("#tabla-principal > tbody:last-child").append(`
          <tr>
          <td>${element.id}</td>
          <td>${element.nombre}</td>
          <td>${element.categoria}</td>
          <td>${element.precio}</td>
          <td>${element.fecha}</td>
          <td><img src="./trash-bin.png" onclick="borrarElemento(${element.id})" class="borrar"></td>
          </tr>`);
      });
    }
  }
  catch(e){}
}

  obtenerInfo();



const generarCodigo = (listadoDeElementos) => {
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
  listadoCategoria = JSON.parse(localStorage.getItem("categoria"));
  listadoCategoria.forEach((elemento) => {
    $('#listado-categoria').append(`<option>${elemento.nombre} - ${elemento.id} </option>`);
  });
};



cargarCategorias();

anadir.onclick = () => {
  let suplidorActual = null;

  //determinar si los valores existen
  if (!localStorage.hasOwnProperty("suplidor")) {
    localStorage.setItem("suplidor", JSON.stringify([]));
    //Tomar los valores de almacenados actualmente.
    suplidorActual = localStorage.getItem("suplidor");
  } else {
    suplidorActual = localStorage.getItem("suplidor");
  }

  console.log(suplidorActual)
  //Tomar los valores del formuarlo

  const valor = suplidor.value;
  const precioActual = precio.value;
  const hoy = new Date();
  const fechaActual =
    hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
  const idNuevo = generarCodigo(JSON.parse(suplidorActual));
  const categoriaActual = categoria.value;

//Validar campos 
if (valor === "" || categoriaActual === "") {
    alert("Porfavor coloque la informacion en el cuadro de texto.");
    return null;
  }

  //Encapsular los valores del formulario
  const suplidorObjeto = {
    nombre: valor,
    fecha: fechaActual,
    categoria: categoriaActual,
    precio: precioActual,
    id: idNuevo
  };
  console.log(suplidorObjeto)
//Crear un nuevo arreglo de categorias con la información que tenía el otro.
  const arregloSuplidores = JSON.parse(suplidorActual);
   //Añadir la informacion recopilada del formulario
   arregloSuplidores.push(suplidorObjeto);
 //Alamacenar esa información en el local storage proximo a todo el proceso
 localStorage.setItem("suplidor", JSON.stringify(arregloSuplidores));
 location.reload();

};
