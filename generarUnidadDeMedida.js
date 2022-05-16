//Obtener los valores de los elementos visuales de la pagina.
const udm = document.getElementById("udm--input");
const anadir = document.getElementById("btn-añadir-udm");
const tabla = document.getElementById("tabla-principal");
const borrarElemento = (id) => {

    
  const elementosActuales = JSON.parse(localStorage.getItem("udm"));
  if(elementosActuales.length === 1)
  {
    localStorage.setItem('udm', JSON.stringify([]));
    location.reload();
    return null;
  }
  elementosActuales.splice(id, 1);

  localStorage.setItem("udm", JSON.stringify(elementosActuales));
    location.reload();
};

const obtenerInfo = () => {
   try{
    if (localStorage.hasOwnProperty("udm")) {
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
  let udmActual = null;

  //determinar si los valores existen
  if (localStorage.length === 0 ||JSON.parse(localStorage.getItem(udmActual)) === []) {
    localStorage.setItem("udm", JSON.stringify([]));
    //Tomar los valores de almacenados actualmente.
    udmActual = localStorage.getItem("udm");
  } else {
    udmActual = localStorage.getItem("udm");
  }
console.log(udmActual)
  //Tomar los valores del formuarlo

  const valor = udm.value;
  if (valor === "") {
    alert("Porfavor coloque la informacion en el cuadro de texto.");
    return null;
  }
  const hoy = new Date();
  const fechaActual = hoy.getFullYear()+'/'+(hoy.getMonth()+1)+'/'+hoy.getDate();


  const idNuevo = generarCodigo(JSON.parse(udmActual));

  //Encapsular los valores del formulario
  const udmObjeto = {
    nombre: valor,
    fecha: fechaActual, 
    id: idNuevo,
  };

  //Crear un nuevo arreglo de categorias con la información que tenía el otro.
  const arregloDeudms = JSON.parse(udmActual);

  //Añadir la informacion recopilada del formulario
  arregloDeudms.push(udmObjeto);

  //Alamacenar esa información en el local storage proximo a todo el proceso
  localStorage.setItem("udm", JSON.stringify(arregloDeudms));
  location.reload();
};
