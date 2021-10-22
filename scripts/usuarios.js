const usuariosHeader = document.querySelector('#usuarios-header');
const contenedorEditor = document.querySelector('.contenedor-editor')
const divEditor = document.querySelector('.div-editor')
const divEditorAbajo = document.querySelector('.div-editor-abajo')
const token = window.localStorage.getItem('token');
const main = document.querySelector('main');
const body = document.querySelector('body');
const btnNuevoUsuario = document.querySelector('.btn-agregar-usuario')
const inputPassword = document.querySelector('#repetirPass')
const usuarioEdicion = document.querySelector('#usuarioEd')
const nombreEdicion = document.querySelector('#nombreEd')
const apellidoEdicion = document.querySelector('#apellidoEd')
const emailEdicion = document.querySelector('#emailEd')
const perfilEdicion = document.querySelector('#perfilEd')
const passEdicion = document.querySelector('#passwordEd')
const idEdicion = document.querySelector('#idEd')
const usuarioExiste = document.querySelector('.error-usuario')
const parametroFaltante = document.querySelector('.parametro-inexistente')
const divCrearUsuario = document.querySelector('.div-crear-usuario')

const obtenerAdmin = async () => {
    if(token){
        const url = 'http://localhost:3000/usuarios'
        const response = await fetch(url, {
            method: 'GET',
            headers:({
                'Authorization': 'Bearer ' + token.replace(/["]+/g, '')
            })
        })
        const data = await response.json();
        
        return data
    }else{
        window.location.replace('http://127.0.0.1:5500/login.html')
    }
}
/* Traer todos los usuarios */
const traerDatos = (nombre, email, usuario, perfil) => {
    const contenedorTabla = document.querySelector('.usuarios-tabla');
    const filaUsuarios = document.createElement('div')
    filaUsuarios.classList.add('contenedor-usuarios')
    
    const divNombre = document.createElement('div');
    divNombre.classList.add('contactos-column')
    const avatar = document.createElement('img')
    avatar.setAttribute('src', "recursos/perfil.png")
    avatar.classList.add('perfil')
    const divNombreEmail = document.createElement('div');
    divNombreEmail.classList.add('usuario')
    const usuarioNombre = document.createElement('p')
    usuarioNombre.classList.add('nombre-usuario')
    usuarioNombre.textContent = nombre
    
    const usuarioEmail = document.createElement('p')
    usuarioEmail.classList.add('email-usuario')
    usuarioEmail.textContent = email
    
    const divNombreUsuario = document.createElement('div');
    divNombreUsuario.classList.add('usuario-column')
    const pUsuario = document.createElement('p')
    pUsuario.classList.add('usuario-p')
    pUsuario.textContent = usuario

    const divPerfil = document.createElement('div');
    divPerfil.classList.add('perfil-column')
    const usuarioPerfil = document.createElement('p')
    usuarioPerfil.classList.add ('titulo-cabecera')
    usuarioPerfil.textContent = perfil
    
    const divAcciones = document.createElement('div');
    divAcciones.classList.add('acciones-usuario')
    const borrarImg = document.createElement('img')
    borrarImg.classList.add('borrar-usuario')
    borrarImg.setAttribute('src', "recursos/svgs/trash.svg")
    
    const editarImg = document.createElement('img')
    editarImg.classList.add('editar-usuario')
    editarImg.setAttribute('src', "recursos/svgs/edit.svg")
    
    divNombreEmail.appendChild(usuarioNombre);
    divNombreEmail.appendChild(usuarioEmail);
    divNombre.appendChild(avatar)
    divNombre.appendChild(divNombreEmail)
    filaUsuarios.appendChild(divNombre)
    divNombreUsuario.appendChild(pUsuario)
    filaUsuarios.appendChild(divNombreUsuario)
    divPerfil.appendChild(usuarioPerfil)
    filaUsuarios.appendChild(divPerfil)
    divAcciones.appendChild(borrarImg)
    divAcciones.appendChild(editarImg)
    filaUsuarios.appendChild(divAcciones)

    
    contenedorTabla.appendChild(filaUsuarios)    
}
/* Cargar tabla de usuarios y sus datos*/
const traerDatosEdicion = async (nombre) => {
    const url = `http://localhost:3000/usuarios/${nombre}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const cargarDatosAdmin = async () => {
    const isAdmin = await obtenerAdmin()
    console.log(isAdmin)
    if(isAdmin.admin == 0){
        window.location.replace('http://127.0.0.1:5500/index.html')
    }else{
        isAdmin.forEach(datosUsuario => {
            const usuario = datosUsuario.usuario
            const nombre = datosUsuario.nombre + ' ' + datosUsuario.apellido
            const email = datosUsuario.email
            let perfil = datosUsuario.is_admin
            if(perfil != 1){
                perfil = 'Basico'
            }else{
                perfil = 'Admin'
            }      
            traerDatos(nombre, email, usuario, perfil)
        })
        
        /*Boton borrar usuario*/
        const botonesBorrar = document.getElementsByClassName('borrar-usuario')
        for(let i = 0; i < botonesBorrar.length; i++){
            botonesBorrar[i].addEventListener('click', () =>{
                const padreBoton = botonesBorrar[i].parentNode;
                const padreDelPadre = padreBoton.parentNode
                const usuario = padreDelPadre.childNodes[1].childNodes[0].textContent
                console.log(usuario)

                const nombreUsuario ={
                    usuario: usuario
                }
                fetch('http://localhost:3000/usuarios', {
                    method: 'DELETE',
                    body: JSON.stringify(nombreUsuario),
                    headers:({
                        'Content-Type': 'application/json',
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(JSON.stringify(data))
                    location.reload()
                })
            })
        }

        /*Boton editar usuario*/
        const botonesEditar = document.getElementsByClassName('editar-usuario')
        for(let i = 0; i < botonesEditar.length; i++){
            botonesEditar[i].addEventListener('click', () =>{
                contenedorEditor.style.display = 'inline-flex';
                const filtroEdicion = document.createElement('div')
                filtroEdicion.classList.add('filtro-edicion')
                main.appendChild(filtroEdicion)
                filtroEdicion.style.display = 'block';
                const padreEdicion = botonesEditar[i].parentNode;
                const padreDelPadre = padreEdicion.parentNode
                const usuario = padreDelPadre.childNodes[1].childNodes[0].textContent
        
        /*Traer datos del usuario para editar*/
                traerDatosEdicion(usuario)
                .then(json =>{
                    const usuario = json.datosUsuario[0]
                    
                    idEdicion.value = usuario.id_usuarios
                    usuarioEdicion.value = usuario.usuario
                    nombreEdicion.value = usuario.nombre
                    apellidoEdicion.value = usuario.apellido
                    emailEdicion.value = usuario.email
                    passEdicion.value = usuario.password
                    if(!usuario.is_admin){
                        perfilEdicion.value = 'Basico'
                    }else{
                        perfilEdicion.value = 'Admin'
                    }
                })
            })
            window.onclick = function(event) {
                const filtroEdicion = document.querySelector('.filtro-edicion')
                if (event.target == filtroEdicion) {
                  contenedorEditor.style.display = "none";
                  filtroEdicion.remove();
                }
            }    
        }

        const btnGuardarCambios = document.querySelector('.btn-edicion');
        btnGuardarCambios.addEventListener('click', () => {
            let inputCollection = document.querySelectorAll('.contenedor-datos-edicion input');
            let body = {}
            for(let i = 0; i < inputCollection.length; i++){
                let nombre = inputCollection[i].name
                let valor = inputCollection[i].value
                body[nombre] = valor;
            }
            console.log(body) 
            fetch('http://localhost:3000/usuarios', {  
                method: 'PUT',
                body: JSON.stringify(body),
                headers:({
                    'Content-Type': 'application/json',
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data))
                location.reload()
            })
        })
    }
}
cargarDatosAdmin()

/* Agregar nuevo usuario*/
inputPassword.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.querySelector(".btn-agregar-usuario").click();
    }
  });

btnNuevoUsuario.addEventListener('click', () =>{
    let inputCollection = document.querySelectorAll('.agregar-usuario-form input');
    let body = {}
    console.log(body)
    for(let i = 0; i < inputCollection.length; i++){
        let nombre = inputCollection[i].name
        let valor = inputCollection[i].value
        console.log('VALOR', valor)
        body[nombre] = valor;
    }
    console.log('BODY', body)

    fetch('http://localhost:3000/usuarios', {  
        method: 'POST',
        body: JSON.stringify(body),
        headers:({
            'Content-Type': 'application/json',
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data))
        if(data.error400){
            usuarioExiste.style.display = 'block'
            divCrearUsuario.style.margin = '10px 0px 3px'
        }else if(data.error400a){
            parametroFaltante.style.display = 'inline-flex'
            usuarioExiste.style.display = 'none'
        }
        else{
            location.reload()
        }
    })
});
