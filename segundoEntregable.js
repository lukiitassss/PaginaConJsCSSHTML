//document.getElementById(id).style.visibility = "visible"; // show
//document.getElementById(id).style.visibility = "hidden"; // hide


const productos =[
                {id:1, nombre:"Procesador Ryzen 3" ,precio:10000, stock:10, categoria:"PROCESADOR", marca:"AMD" ,imagen: `imagenes/1.webp`},
                {id:2,nombre:"Procesador Ryzen 5" ,precio:16000, stock:10, categoria:"PROCESADOR", marca:"AMD" ,imagen: `imagenes/2.webp`},
                {id:3,nombre:"Procesador Intel i3 7ma" ,precio:14000, stock:10, categoria:"PROCESADOR", marca:"INTEL" ,imagen: `imagenes/3.webp`},
                {id:4,nombre:"Procesador Intel i5 10ma" ,precio:15000, stock:10, categoria:"PROCESADOR", marca:"INTEL" ,imagen: `imagenes/4.webp`},
                {id:5,nombre:"ram 8gb",precio:11000, stock:10, categoria:"MEMORIA RAM", marca:"KINGTON" ,imagen: `imagenes/5.webp`} ,
                {id:6,nombre:"ram 4gb",precio:8000, stock:10, categoria:"MEMORIA RAM", marca:"CRUSIAL" ,imagen: `imagenes/6.webp`} ,
                {id:7,nombre:"ssd 1tb" ,precio:12000, stock:10, categoria:"DISCO", marca:"KINGTON" ,imagen: `imagenes/7.webp`},
                {id:8,nombre:"ssd 240gb" ,precio:6000, stock:10, categoria:"DISCO", marca:"WD" ,imagen: `imagenes/8.webp`},
                {id:9,nombre:"hdd 1tb" ,precio:7000, stock:10, categoria:"DISCO", marca:"TOSHIBA" ,imagen: `imagenes/9.webp`},
                {id:10,nombre:"hdd 500gb" ,precio:4000, stock:10, categoria:"DISCO", marca:"CRUCIAL",imagen: `imagenes/10.webp`},
                {id:11,nombre:"gtx 3080" ,precio:130000, stock:10, categoria:"PLACA VIDEO", marca:"NVIDIA" ,imagen: `imagenes/11.webp`},
                {id:12,nombre:"gtx 2070" ,precio:100000, stock:10, categoria:"PLACA VIDEO", marca:"NVIDIA" ,imagen: `imagenes/12.webp`},
                {id:13,nombre:"rx 6700 xt" ,precio:11000, stock:10, categoria:"PLACA VIDEO", marca:"AMD" ,imagen: `imagenes/13.webp`}];

const maximo = document.getElementById("textoMaximo");
const minimo = document.getElementById("textoMinimo");
const mainPrincipal= document.getElementById("mainPrincipal");
const categorias=document.getElementById("categorias");
const categoria = document.getElementById("categoria");
const marca = document.getElementById("marca");
const marcas = document.getElementById("marcas");
const precio = document.getElementById("precio");
const borrarFiltroPrecio = document.getElementById("articuloFiltroPrecio");
const borrarFiltroCategoria = document.getElementById("articuloFiltroCategoria");
const borrarFiltroMarca = document.getElementById("articuloFiltroMarca");
let arregloCategorias=[];
let indiceCategoria=null;
let indiceMarca=null;
let arregloMarcas=[];
let filtrados=[];
let filtrosAplicados=[];
let filtroMarca=[];
let filtroCategoria=[];
let filtroPrecio=[];
let precios=null;
let formularioPrecio=null;
let formularioCategoria=null;
let formularioMarca=null;












//CARGAMOS LO NECESARIO AL PRINCIPIO
window.addEventListener('load', function() {
    texto="";
    for (let i = 0; i < productos.length; i++) {
               texto +=             `    <div class="card">
               <img class="card-img" src="${productos[i].imagen}" alt="">
               <div class="card-info">
                 <p class="text-title">${productos[i].nombre} </p>
               </div>
               <div class="card-footer">
               <span class="text-title">$ ${productos[i].precio}</span>
               <div class="card-button">
                 <svg class="svg-icon" viewBox="0 0 20 20">
                   <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                   <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                   <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                 </svg>
               </div>
             </div></div>`;
    }
    mainPrincipal.innerHTML=texto;
});

















/*VAMOS A EMPEZAR A PONER LOS RANGOS DEL PRECIO POR LOS CUALES SE PUEDEN FILTRAR */
function buscarMinimoYMaximo(productos) {
    let minimo=productos[0].precio;
    let maximo=0;
    for (const producto of productos) {
        if (producto.precio<minimo){
            minimo=producto.precio;
        }
        if (producto.precio>maximo) {
            maximo=producto.precio;
        }
    }
    return {minimo,maximo};
}

//ejecutamos la funcion para que nos quede en la variable precio, los precio maximos y minimos
precios=buscarMinimoYMaximo(productos);

//configuracion minimo
minimo.innerText=`Minimo: $${precios.minimo}`;
document.getElementById("minimo").setAttribute("min", precios.minimo);
document.getElementById("minimo").setAttribute("max", Math.floor((precios.maximo)/2));
document.getElementById('minimo').addEventListener('mousemove',cambioMinimo);
function cambioMinimo() {
    document.getElementById('textoMinimo').innerHTML=`Minimo: $${document.getElementById('minimo').value}`;
}

//configuracion maximo
maximo.innerText=`Maximo: $${precios.maximo}`;
document.getElementById("maximo").setAttribute("min", precios.minimo);
document.getElementById("maximo").setAttribute("max", precios.maximo);
document.getElementById("maximo").setAttribute("value", precios.maximo);
document.getElementById('maximo').addEventListener('mousemove',cambioMaximo);
function cambioMaximo() {
    document.getElementById('textoMaximo').innerHTML=`Maximo: $${document.getElementById('maximo').value}`;
}









//FUNCIONES GENERALES

document.getElementById("articuloFiltroPrecio").style.display = "flex"; // hide
document.getElementById("articuloFiltroMarca").style.display = "flex"; // hide
document.getElementById("articuloFiltroCategoria").style.display = "flex"; // hide

function ponerEnFiltrados(elemento){
    filtrosAplicados.push(elemento);
    document.getElementById(`articuloFiltro${elemento}`).style.display = "flex"; // hide  
    document.getElementById(`articuloFiltro${elemento}`).innerHTML=` <button name ="${elemento}"id ="${elemento.toString().toLowerCase()}Filtrado">x</button>
                                                                     <label for="precio">${elemento.toString().toUpperCase()}</label>`  
}


function aplicacionDeFiltro(filtroName){
    switch (filtroName) {
        case "Marca":
            filtrados=filtrados.filter((el)=>el.marca==formularioMarca.children[1].children[indiceMarca].children[0].id)
            break;
        case "Categoria":
            filtrados=filtrados.filter((el)=>el.categoria.toLowerCase().replace(" ","")==formularioCategoria.children[1].children[indiceCategoria].children[0].id)
            break;
        case "Precio":            
            let minimo=formularioPrecio.children[1].children[1].value; //rango minimo
            let maximo= formularioPrecio.children[2].children[1].value; //rango maximo
            filtrados= filtrados.filter((el)=>el.precio<=maximo && el.precio>=minimo);
            break;
    }
}

function reHacerFiltrados(){
    filtrados=JSON.parse(JSON.stringify(productos));
    if (filtrosAplicados.length==1){
        aplicacionDeFiltro(filtrosAplicados[0]);

    }
    else{
        for (let i = 0; i < filtrosAplicados.length; i++) {
            aplicacionDeFiltro(filtrosAplicados[i]);
        }
    }
}










/*VAMOS A PLASMAR EN EL DOM LAS DISTINTAS CATEGORIAS EXISTENTES */
function cargarCategorias(productos){
    arregloCategorias=productos.map((el) => el.categoria);
    for(var i = arregloCategorias.length -1; i >=0; i--){
        if(arregloCategorias.indexOf(arregloCategorias[i]) !== i) 
            arregloCategorias.splice(i,1);
    }
}
cargarCategorias(productos);
function ponerDomCategorias(arregloCategorias) {
    let texto="";
    for (const subCategoria of arregloCategorias) {
        texto +=`<article>
                    <input type="radio" id="${subCategoria.toLowerCase().replace(" ","")}" name="categoria">
                    <label for="${subCategoria.toLowerCase().replace(" ","")}">${subCategoria}</label>
                 </article>`
    }
    categorias.innerHTML=texto;
}
ponerDomCategorias(arregloCategorias);



/*VAMOS A PLASMAR EN EL DOM LAS DISTINTAS MARCAS EXISTENTES */
function cargarMarcas(productos){
    arregloMarcas=productos.map((el) => el.marca);
    for(var i = arregloMarcas.length -1; i >=0; i--){
        if(arregloMarcas.indexOf(arregloMarcas[i]) !== i) 
            arregloMarcas.splice(i,1);
    }
}
cargarMarcas(productos);

function ponerDomMarcas(arregloMarcas) {
    let texto="";
    for (const subMarcas of arregloMarcas) {
        texto +=`<article>
                    <input type="radio" id="${subMarcas}" name="marcas">
                    <label for="${subMarcas}">${subMarcas}</label>
                 </article>`
    }
    marcas.innerHTML=texto;
}
ponerDomMarcas(arregloMarcas);
















//vamos con la funcionalidad del formulario de precios
precio.addEventListener("submit", filtrarPorPrecio);//le digo q cuando se envie vaya a la funcion
function filtrarPorPrecio(e){
    e.preventDefault();//Cancelamos el comportamiento del evento
    let formulario = e.target //Obtenemos el elemento desde el cual se disparó el evento
    formularioPrecio=formulario;
    if(!filtrados.length){
        filtrados = JSON.parse(JSON.stringify(productos));
        aplicacionDeFiltro("Precio");
    }else{
        aplicacionDeFiltro("Precio");
    }
    document.getElementById("precio").style.display = "none"; // hide
    ponerEnFiltrados("Precio");

    borrarFiltroPrecio.onclick=()=>{
        
        filtrosAplicados = filtrosAplicados.filter((item) => item != "Precio");
        if(!filtrosAplicados.length){
            filtrados = [];
        }
        else{
            reHacerFiltrados();
        }
        const item = document.querySelector('#articuloFiltroPrecio');
        item.innerHTML='';
        document.getElementById("precio").style.display = "flex"; // hide
    }
}





// VAMOS A EMPEZAR CON EL FILTRO DE CATEGORIAS
categoria.addEventListener("submit", filtrarPorCategoria);//le digo q cuando se envie vaya a la funcion

function filtrarPorCategoria(e){
    e.preventDefault();//Cancelamos el comportamiento del evento
    let formulario = e.target //Obtenemos el elemento desde el cual se disparó el evento
    formularioCategoria=formulario;
    //segundo campo es el que cambia de botones
    //formulario.children[1].children[0].children[1].checked
    for (let i = 0; i < arregloCategorias.length; i++) {
        if (formulario.children[1].children[i].children[0].checked) {
            algoChequeado=true;
            if (filtrados.length) {
                indiceCategoria=i;
                aplicacionDeFiltro("Categoria");
                
            } else {
                filtrados = JSON.parse(JSON.stringify(productos));
                indiceCategoria=i;
                aplicacionDeFiltro("Categoria");
                
            }
             ; 
        }
        
    }

    document.getElementById("categoria").style.display = "none"; // hide
    ponerEnFiltrados("Categoria");


}

borrarFiltroCategoria.onclick=()=>{
    
    filtrosAplicados = filtrosAplicados.filter((item) => item != "Categoria");
    if(!filtrosAplicados.length){
        filtrados = [];
    }
    else{
        reHacerFiltrados();
    }
    const item = document.querySelector('#articuloFiltroCategoria');
    item.innerHTML='';
    document.getElementById("categoria").style.display = "flex"; // hide
}



















//VAMOS A EMPEZAR CON EL FILTRO DE MARCA
marca.addEventListener("submit",filtrarPorMarca);
function filtrarPorMarca(e){
    e.preventDefault();//Cancelamos el comportamiento del evento
    let formulario = e.target //Obtenemos el elemento desde el cual se disparó el evento
    formularioMarca=formulario;
    //segundo campo es el que cambia de botones
    //formulario.children[1].children[0].children[1].checked
    for (let i = 0; i < arregloMarcas.length; i++) {
        if (formulario.children[1].children[i].children[0].checked) {
            algoChequeado=true;
            if (filtrados.length) {
                indiceMarca=i;
                aplicacionDeFiltro("Marca");
                
            } else {
                filtrados = JSON.parse(JSON.stringify(productos));
                indiceMarca=i;
                aplicacionDeFiltro("Marca");
                
            }
             ; 
        }
        
    }

    document.getElementById("marca").style.display = "none"; // hide
    ponerEnFiltrados("Marca");


}

borrarFiltroMarca.onclick=()=>{
    
    filtrosAplicados = filtrosAplicados.filter((item) => item != "Marca");
    if(!filtrosAplicados.length){
        filtrados = [];
    }
    else{
        
        reHacerFiltrados();
    }
    const item = document.querySelector('#articuloFiltroMarca');
    item.innerHTML='';
    document.getElementById("marca").style.display = "flex"; // hide
}

