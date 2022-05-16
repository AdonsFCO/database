//Se encarga de inicializar todos los valores en caso de no existir 
//Esto para evitar errores
const inciializar = ()=> {
if(localStorage.length = 0)
{
    localStorage.clear();
    localStorage.setItem("categoria", JSON.stringify([]));
    localStorage.setItem("suplidor", JSON.stringify([]));
    localStorage.setItem("producto", JSON.stringify([]));
    localStorage.setItem("udm", JSON.stringify([]));

    console.log(`Inicializados los elementos de la tabla
    Categorias
    Suplidores
    UDM
    Productos`);

}

}
inciializar();