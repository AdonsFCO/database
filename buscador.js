const buscador = document.getElementById("buscador");
const lista = buscador.getAttribute("data-buscarEn");

const buscarEn = (lista) => {
  const elementos = JSON.parse(localStorage.getItem(lista));
  $("#tabla-principal tbody").empty();
  elementos.forEach((elemento) => {
    //Primero limpiar el contenido
    if (elemento.nombre.includes(buscador.value.toLowerCase())) {
      //generar plantilla de la tabla.
      switch (lista) {
        case "categoria":
          $("#tabla-principal > tbody:last-child").append(`
      <tr>
      <td>${elemento.id}</td>
      <td>${elemento.nombre}</td>
      <td>${elemento.fecha}</td>
      <td><img src="./trash-bin.png" onclick="borrarElemento(${elemento.id})" class="borrar"></td>
      </tr>`);

          break;
        case "suplidor":
          $("#tabla-principal > tbody:last-child").append(`
          <tr>
          <td>${elemento.id}</td>
          <td>${elemento.nombre}</td>
          <td>${elemento.tel}</td>
          <td>${elemento.direccion}</td>
          <td>${elemento.fecha}</td>
          <td><img src="./trash-bin.png" onclick="borrarElemento(${elemento.id})" class="borrar"></td>
          </tr>`);
          break;
        case "udm":
          $("#tabla-principal > tbody:last-child").append(`
      <tr>
      <td>${elemento.id}</td>
      <td>${elemento.nombre}</td>
      <td>${elemento.fecha}</td>
      <td><img src="./trash-bin.png" onclick="borrarElemento(${elemento.id})" class="borrar"></td>
      </tr>`);

          break;

        case "producto":
          $("#tabla-principal > tbody:last-child").append(`
      <tr>
      <td>${elemento.id}</td>
      <td>${elemento.nombre}</td>
      <td>${elemento.categoria}</td>
      <td>${elemento.suplidor}</td>
      <td>${elemento.precio}</td>
      <td>${elemento.cantidad}</td>
      <td>${elemento.fecha}</td>
      <td><img src="./trash-bin.png" onclick="borrarElemento(${elemento.id})" class="borrar"></td>
      </tr>`);
          break;
      }
    }
  });
};

buscador.oninput = () => {
  buscarEn(lista);
};
