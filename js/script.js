const usuarios = [{
    nombre: "Emiliano",
    mail: "emilianito@hotmail.com",
    pass: "emiliano123"
},
{
    nombre: "Juana",
    mail: "juanita@gmail.com",
    pass: "juana456"
},
{
    nombre: "Valentin",
    mail: "valentin@outlook.com",
    pass: "valentin789"
}]

const funkos = [{
    nombre: "Black Adam",
    id: "1",
    categoria: "DC",
    precio: 8.500,
},
{
    nombre: "The Flash",
    id: "2",
    categoria: "DC",
    precio: 8.200
},
{
    nombre: "Harry Potter GF",
    id: "3",
    categoria: "Harry Potter",
    precio: 8.500
},
{
    nombre: "Harry Potter",
    id: "4",
    categoria: "Harry Potter",
    precio: 10.500
},
{
    nombre: "Scarlet Witch",
    id: "5",
    categoria: "Marvel",
    precio: 9.900
},
{
    nombre: "Luke Skywalker",
    id: "6",
    categoria: "Star Wars",
    precio: 10.900
}]

const mailLogin = document.getElementById("emailLogin"),
    passLogin = document.getElementById("passwordLogin"),
    recordar = document.getElementById("recordarme"),
    btnLogin = document.getElementById("login"),
    modalEl = document.getElementById("modalLogin"),
    modal = new bootstrap.Modal(modalEl),
    toggles = document.querySelectorAll(".toggles");

function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

    if (typeof encontrado === 'undefined') {
        return false;
    } else {

        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        "name": usuarioDB.nombre,
        "user": usuarioDB.mail,
        "pass": usuarioDB.pass
    }

    storage.setItem("usuario", JSON.stringify(usuario));
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Hola, ${usuario.name}!`
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
}

function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        presentarInfo(toggles, "d-none");
    }
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

    if (!data) {
        alert(`Usuario y/o contraseña incorrectos`);
    } else {

        if (recordar.checked) {
            guardarDatos(data, localStorage);
            saludar(recuperarUsuario(localStorage));
        } else {
            guardarDatos(data, sessionStorage);
            saludar(recuperarUsuario(sessionStorage));
        }

        modal.hide();
        presentarInfo(toggles, 'd-none');
    }
});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage)); 



// carrito

const carrito = document.querySelector('#carrito') 

const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//boton limpiar carrito.
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
//lista de funkos
const listaFunkos = document.querySelector('#lista-funkos');

//variables
let articuloCarrito = [];


cargarEventlistener();

function cargarEventlistener(){

    listaFunkos.addEventListener("click", agregarFunko);

    carrito.addEventListener("click" , eliminarFunko);

    vaciarCarritoBtn.addEventListener("click" , ()=> {
        console.log("Vaciando carrito...");
        articuloCarrito = [];
        limpiarHtml();
    })
}

//funciones:
function agregarFunko(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        console.log('Agregar Funko al carrito...');
        const funkoSeleccionado = (e.target.parentElement.parentElement);
        leerDatosFunko(funkoSeleccionado);
    }
    
}

function eliminarFunko(e){
    e.preventDefault();
    if (e.target.classList.contains('borrar-funko')) {
        const funkoId =e.target.getAttribute('data-id');
        articuloCarrito = articuloCarrito.filter( carrito => carrito.id !== funkoId); 
    }

    carritoHTML();
}

function leerDatosFunko(funkos){
const agregarAlCarrito = (prodNombre) => {
    const item = funkos.find( (prod) => prod.nombre === prodNombre)
    carrito.push(item)
    agregarFunko()
    console.log(agregarAlCarrito);
    console.log(articuloCarrito)
}
}


function carritoHTML(){

    limpiarHtml();

    articuloCarrito.forEach( (funkos)=> {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> ${funkos.nombre}</td>
            <td> ${funkos.precio}</td>
            <td> ${funkos.cantidad}</td>
            <td> <a href="#" class="borrar-funkos" data-id=${funkos.id} > X </div> </td>
        `;    
        contenedorCarrito.appendChild(row);
        
    } );

}

function limpiarHtml(){

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
    
}

console.log(articuloCarrito);