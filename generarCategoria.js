//Obtener los valores de los elementos visuales de la pagina.
const categoria = document.getElementById("categorias--input");
const anadir = document.getElementById("btn-añadir-categoria");
const tabla = document.getElementById("tabla-principal");

const borrarElemento = (id) => {

    
  const elementosActuales = JSON.parse(localStorage.getItem("categoria"));
  if(elementosActuales.length === 1)
  {
    localStorage.setItem('categoria', JSON.stringify([]));
    location.reload();
    return null;
  }
  elementosActuales.splice(id, 1);

  localStorage.setItem("categoria", JSON.stringify(elementosActuales));
    location.reload();
};

const obtenerInfo = () => {
   try{
    if (localStorage.hasOwnProperty("categoria")) {
    let categoriaActual = JSON.parse(localStorage.getItem("categoria"));

    categoriaActual.forEach((element) => {
      $("#tabla-principal > tbody:last-child").append(`
        <tr>
        <td>${element.id}</td>
        <td>${element.nombre}</td>
        <td>${element.fecha}</td>
        <td><img src="./trash-bin.png" onclick="borrarElemento(${element.id})" class="borrar"></td>
        </tr>`);
    });
  }
}
catch(e){}
};
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

anadir.onclick = () => {
  let categoriaActual = null;

  //determinar si los valores existen
  if (localStorage.length === 0 ||JSON.parse(localStorage.getItem(categoriaActual)) === []) {
    localStorage.setItem("categoria", JSON.stringify([]));
    //Tomar los valores de almacenados actualmente.
    categoriaActual = localStorage.getItem("categoria");
  } else {
    categoriaActual = localStorage.getItem("categoria");
  }
console.log(categoriaActual)
  //Tomar los valores del formuarlo

  const valor = categoria.value;
  if (valor === "") {
    alert("Porfavor coloque la informacion en el cuadro de texto.");
    return null;
  }
  const hoy = new Date();
  const fechaActual = hoy.getFullYear()+'/'+(hoy.getMonth()+1)+'/'+hoy.getDate();


  const idNuevo = generarCodigo(JSON.parse(categoriaActual));

  //Encapsular los valores del formulario
  const categoriaObjeto = {
    nombre: valor,
    fecha: fechaActual,
    id: idNuevo,
  };

  //Crear un nuevo arreglo de categorias con la información que tenía el otro.
  const arregloDeCategorias = JSON.parse(categoriaActual);

  //Añadir la informacion recopilada del formulario
  arregloDeCategorias.push(categoriaObjeto);

  //Alamacenar esa información en el local storage proximo a todo el proceso
  localStorage.setItem("categoria", JSON.stringify(arregloDeCategorias));
  location.reload();
};
