const token = window.localStorage.getItem('token');
const main = document.querySelector('main');
const usuariosHeader = document.querySelector('#usuarios-header');
const contenedorEditor = document.querySelector('.contenedor-editor');
const contenedorAgregar = document.querySelector('.contenedor-agregar');
const idCompania = document.querySelector('#idCompania');
const companiaNombre = document.querySelector('#companiaNombre');
const ciudadCompania = document.querySelector('#ciudadCompania');
const direccionCompania = document.querySelector('#direccionCompania');
const emailCompania = document.querySelector('#emailCompania');
const telefonoCompania = document.querySelector('#telefonoCompania');
const btnAgregarCompania = document.querySelector('.btn-agregar-compania')
const btnNuevaCompania = document.querySelector('.btn-nueva-compania')
const errorCiudad = document.querySelector('.error-ciudad')
const errorCiudadEditar = document.querySelector('.error-ciudad-editar')
const companiaExiste = document.querySelector('.error-compania')


/* Acceso a Usuarios solo Admin*/
const obtenerAdmin = async () => {
    if(token){
        const url = 'http://localhost:3000/companias/admin'
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

const evitarAccesoUsuarios = async () => {
    const isAdmin = await obtenerAdmin()
    if(isAdmin.message != 1){
        usuariosHeader.style.display = 'none';
    }else{
        usuariosHeader.style.display = 'block'
    }
}
evitarAccesoUsuarios();

/* Traer companias de la Base de Datos */
const obtenerCompanias = async () => {
     const url = 'http://localhost:3000/companias';
     const response = await fetch(url);
     const json = response.json();
     return json;
}

const obtenerNombreCiudad = async (id) => {
    const url = `http://localhost:3000/companias/ciudad/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}

const traerDatosEdicion = async (nombre) => {
    const url = `http://localhost:3000/companias/${nombre}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

const crearTablaCompanias = async (nombre, direccion, telefono, email, ciudad) => {
    const contenedorTabla = document.querySelector('.companias-tabla');
    const filaCompania = document.createElement('div')
    filaCompania.classList.add('contenedor-companias')
    
    const companiaNombre = document.createElement('div')
    companiaNombre.classList.add('compania-nombre')
    const companiaNombreP = document.createElement('p')
    companiaNombreP.classList.add('compania-p')
    companiaNombreP.textContent = nombre

    const companiaCiudad = document.createElement('div')
    companiaCiudad.classList.add('compania-ciudad')
    const companiaCiudadP = document.createElement('p')
    companiaCiudadP.classList.add('compania-p')
    companiaCiudadP.textContent = ciudad
    
    const companiaDireccion = document.createElement('div')
    companiaDireccion.classList.add('compania-direccion')
    const companiaDireccionP = document.createElement('p')
    companiaDireccionP.classList.add('compania-p')
    companiaDireccionP.textContent = direccion
    
    const companiaEmail = document.createElement('div')
    companiaEmail.classList.add('compania-email')
    const companiaEmailP = document.createElement('p')
    companiaEmailP.classList.add('compania-p')
    companiaEmailP.textContent = email

    const companiaTelefono = document.createElement('div')
    companiaTelefono.classList.add('compania-telefono')
    const companiaTelefonoP = document.createElement('p')
    companiaTelefonoP.classList.add('compania-p')
    companiaTelefonoP.textContent = telefono

    const companiaAcciones = document.createElement('div')
    companiaAcciones.classList.add('compania-acciones')
    
    const companiaAccionesEditar = document.createElement('img')
    companiaAccionesEditar.classList.add('btn-compania-editar')
    companiaAccionesEditar.setAttribute('src', "recursos/svgs/edit.svg")

    const companiaAccionesBorrar = document.createElement('img')
    companiaAccionesBorrar.classList.add('btn-compania-borrar')
    companiaAccionesBorrar.setAttribute('src', "recursos/svgs/cruz.svg")

    companiaNombre.appendChild(companiaNombreP)
    filaCompania.appendChild(companiaNombre)

    companiaCiudad.appendChild(companiaCiudadP)
    filaCompania.appendChild(companiaCiudad)
    
    companiaDireccion.appendChild(companiaDireccionP)
    filaCompania.appendChild(companiaDireccion)
    
    companiaEmail.appendChild(companiaEmailP)
    filaCompania.appendChild(companiaEmail)

    companiaTelefono.appendChild(companiaTelefonoP)
    filaCompania.appendChild(companiaTelefono)

    companiaAcciones.appendChild(companiaAccionesEditar)
    companiaAcciones.appendChild(companiaAccionesBorrar)
    filaCompania.appendChild(companiaAcciones)

    contenedorTabla.appendChild(filaCompania)
}

const traerDatosCompania = async () => {
    const datosCompania = await obtenerCompanias()
    for(let i = 0; i < datosCompania.length; i++){
        const nombreCiudad = await obtenerNombreCiudad(datosCompania[i].id_ciudades_companias)
        const nombre = datosCompania[i].nombre_compania
        const direccion = datosCompania[i].direccion_compania
        const telefono = datosCompania[i].telefono_compania
        const email = datosCompania[i].email_compania
        const ciudad = nombreCiudad[0].nombre_ciudades
        crearTablaCompanias(nombre, direccion, telefono, email, ciudad);
    }

     /*Boton borrar usuario*/
     const botonesBorrar = document.getElementsByClassName('btn-compania-borrar')
     for(let i = 0; i < botonesBorrar.length; i++){
         botonesBorrar[i].addEventListener('click', () =>{
            const padreBoton = botonesBorrar[i].parentNode;
            const padreDelPadre = padreBoton.parentNode
            const nombre = padreDelPadre.childNodes[0].childNodes[0].textContent
            const nombreCompania ={
                 compania: nombre
             }
             fetch('http://localhost:3000/companias', {
                 method: 'DELETE',
                 body: JSON.stringify(nombreCompania),
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
    
    const botonesEditar = document.getElementsByClassName('btn-compania-editar')
        for(let i = 0; i < botonesEditar.length; i++){
            botonesEditar[i].addEventListener('click', () =>{
                contenedorEditor.style.display = 'inline-flex';
                const filtroEdicion = document.createElement('div')
                filtroEdicion.classList.add('filtro-edicion')
                main.appendChild(filtroEdicion)
                filtroEdicion.style.display = 'block';
                const padreEdicion = botonesEditar[i].parentNode;
                const padreDelPadre = padreEdicion.parentNode
                const nombreCompania = padreDelPadre.childNodes[0].childNodes[0].textContent
        
        /*Traer datos del usuario para editar*/
                traerDatosEdicion(nombreCompania)
                .then(json =>{
                    console.log(json)
                    const compania = json[0]
                    idCompania.value = compania.id_compania
                    companiaNombre.value = compania.nombre_compania
                    direccionCompania.value = compania.direccion_compania
                    emailCompania.value = compania.email_compania
                    telefonoCompania.value = compania.telefono_compania
                    const idCiudad = json[0].id_ciudades_companias
                    obtenerNombreCiudad(idCiudad)
                    .then(ciudad =>{
                       ciudadCompania.value = ciudad[0].nombre_ciudades
                    })
                })
            })
            window.onclick = function(event) {
                const filtroEdicion = document.querySelector('.filtro-edicion')
                if (event.target == filtroEdicion) {
                    contenedorAgregar.style.display = "none";
                    contenedorEditor.style.display = "none";
                    errorCiudadEditar.style.display = "none";
                    companiaExiste.style.display = "none"
                    location.reload()
                    filtroEdicion.remove();
                }
            }    
        }

        const btnGuardarCambios = document.querySelector('.btn-edicion');
        btnGuardarCambios.addEventListener('click', () => {
            let inputCollection = document.querySelectorAll('.contenedor-compania-edicion input');
            let body = {}
            for(let i = 0; i < inputCollection.length; i++){
                let nombre = inputCollection[i].name
                let valor = inputCollection[i].value
                body[nombre] = valor;
            }
            console.log(body) 
            fetch('http://localhost:3000/companias', {  
                method: 'PUT',
                body: JSON.stringify(body),
                headers:({
                    'Content-Type': 'application/json',
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data))
                if(data.error404){
                    errorCiudadEditar.style.display = 'inline-flex'                    
                }else{
                    location.reload()
                }
            })
        })
    }
    

traerDatosCompania()

/* Agregar nueva compania*/
btnAgregarCompania.addEventListener('click', () => {
    contenedorAgregar.style.display = 'inline-flex';
    const filtroEdicion = document.createElement('div')
    filtroEdicion.classList.add('filtro-edicion')
    main.appendChild(filtroEdicion)
    filtroEdicion.style.display = 'block';
})

btnNuevaCompania.addEventListener('click', () => {
    let inputCollection = document.querySelectorAll('.contenedor-compania-agregar input');
    let body = {}
    console.log(body)
    for(let i = 0; i < inputCollection.length; i++){
        let nombre = inputCollection[i].name
        let valor = inputCollection[i].value
        console.log('VALOR', valor)
        body[nombre] = valor;
    }
    console.log(body)

    fetch('http://localhost:3000/companias', {  
        method: 'POST',
        body: JSON.stringify(body),
        headers:({
            'Content-Type': 'application/json',
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data))
        if(data.error404){
            companiaExiste.style.display = 'none'
            errorCiudad.style.display = 'inline-flex'
        }else if(data.error400){
            errorCiudad.style.display = 'none'
            companiaExiste.style.display = 'inline-flex'
        }
        else{
            location.reload()
        }
    })
});




