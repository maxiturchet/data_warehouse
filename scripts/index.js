const usuariosHeader = document.querySelector('#usuarios-header')
const main = document.querySelector('main')
const token = window.localStorage.getItem('token');
const contenedorCanalesHover = document.getElementsByClassName('contenedor-canal-hover')
const contenedorMain = document.querySelector('.contenedor-main')
const divSeleccionados = document.querySelector('.seleccionados')
const eliminarSeleccionados = document.querySelector('.eliminar-seleccionados')
const checkBox = document.getElementsByClassName('check-input')
const lastChild = document.querySelector('#last-child')
const contactosHover = document.getElementsByClassName('contenedor-contactos')
const btnPuntos = document.getElementsByClassName('puntos-img')
const btnAcciones = document.getElementsByClassName('acciones-puntos')
const accionesHover = document.getElementsByClassName('acciones-hover')
const canalColumn = document.getElementsByClassName('canal-column')
const divSeleccionadosP = document.createElement('p')
const exportarDesplegar = document.querySelector('.exportar-desplegado')
const contenedorSeleccion = document.querySelector('.contenedor-seleccionados')
const btnEliminarSeleccionados = document.querySelector('.eliminar-seleccionados')
const contenedorEditor = document.querySelector('.contenedor-editor')
const contenedorAgregar = document.querySelector('.contenedor-agregar');
const selectRegion = document.querySelector('#selectRegion')
const selectRegionAgregar = document.querySelector('#selectRegionAgregar')
const selectPais = document.querySelector('#selectPais')
const selectPaisAgregar = document.querySelector('#selectPaisAgregar')
const selectCiudad = document.querySelector('#selectCiudad')
const selectCiudadAgregar = document.querySelector('#selectCiudadAgregar')
const contactoDireccion = document.querySelector('#contactoDireccion')
const contactoDireccionAgregar = document.querySelector('#contactoDireccionAgregar')
const fotoPerfil = document.querySelector('.foto-perfil')
const idContacto = document.querySelector('#idContacto')
const contactoNombre = document.querySelector('#contactoNombre')
const contactoNombreA = document.querySelector('#contactoNombreA')
const contactoApellido = document.querySelector('#contactoApellido')
const contactoApellidoA = document.querySelector('#contactoApellidoA')
const cargoContacto = document.querySelector('#cargoContacto')
const cargoContactoA = document.querySelector('#cargoContactoA')
const emailContacto = document.querySelector('#emailContacto')
const emailContactoA = document.querySelector('#emailContactoA')
const contactoCompania = document.querySelector('#companiaContacto')
const contactoCompaniaA = document.querySelector('#companiaContactoA')
const interesContacto = document.querySelector('.barra-interes')
const selectInteres = document.querySelector('#porcentajeInteres')  
const selectInteresA = document.querySelector('#porcentajeInteresA')  
const circuloInteres = document.querySelector('#circulo-interes')
const circuloInteresA = document.querySelector('#circulo-interesA')
const ceroInteres = document.querySelector('#cero')
const ceroInteresA = document.querySelector('#ceroA')
const veinticincoInteres = document.querySelector('#veinticinco')
const veinticincoInteresA = document.querySelector('#veinticincoA')
const veinticincoInteres2 = document.querySelector('#veinticinco2')
const veinticincoInteres2A = document.querySelector('#veinticinco2A')
const cincuentaInteres = document.querySelector('#cincuenta')
const cincuentaInteresA = document.querySelector('#cincuentaA')
const cincuentaInteres2 = document.querySelector('#cincuenta2')
const cincuentaInteres2A = document.querySelector('#cincuenta2A')
const setentaYCincoInteres = document.querySelector('#setentaYCinco')
const setentaYCincoInteresA = document.querySelector('#setentaYCincoA')
const setentaYCincoInteres2 = document.querySelector('#setentaYCinco2')
const setentaYCincoInteres2A = document.querySelector('#setentaYCinco2A')
const cienInteres = document.querySelector('#cien')
const cienInteresA = document.querySelector('#cienA')
const selectCanalContacto = document.querySelector('#canalContacto0')
const canalInfo = document.querySelector('#canalInfo')
const selectPreferencia = document.querySelector('#canalPreferencia')
const contenedorSecundarios = document.querySelector('.contenedor-secundarios')
const companiasInput = document.querySelector('#companiaContacto')
const companiasInputA = document.querySelector('#companiaContactoA')
const listaCompanias = document.querySelector('.listaCompanias')
const listaCompaniasA = document.querySelector('.listaCompaniasA')
const interesBarraEdit = document.querySelector('.barra-interes')
const interesBarraAgregar = document.querySelector('.barra-interesA')
const btnEditarCanal = document.querySelector('.btnEditarCanal')
const btnBorrarCanal = document.querySelector('.btnBorrarCanal')
const btnAgregarCanal = document.querySelector('.btnAgregarCanal')
const btnEditarCanalA = document.querySelector('.btnEditarCanalA')
const btnBorrarCanalA = document.querySelector('.btnBorrarCanalA')
const btnAgregarCanalA = document.querySelector('.btnAgregarCanalA')
const agregarContacto = document.querySelector('.contenedor-agregar')
const canalContactoAgregar = document.querySelector('#canalContacto0')
const btnLupa = document.querySelector('.btn-lupa')
const busqueda = document.querySelector('#busqueda')


const checkBoxSelect = []
let arrayCheckBox = []

const obtenerAdmin = async () => {
    if(token){
        const url = 'http://localhost:3000/index/admin'
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

const obtenerContactos = async () => {
    const url = 'http://localhost:3000/index';
    const response = await fetch(url);
    const json = response.json();
    return json;
}

const obtenerContactosFiltrados = async (input) =>{
    const url = `http://localhost:3000/index/busqueda/${input}`;
    const response = await fetch(url);
    const json = response.json();
    return json
}

const ordenarAscendente = async (tabla) => {
    const url = `http://localhost:3000/index/ascendente/${tabla}`;
    const response = await fetch(url);
    const json = response.json();
    return json; 
}
const ordenarDescendente = async (tabla) => {
    const url = `http://localhost:3000/index/descendente/${tabla}`;
    const response = await fetch(url);
    const json = response.json();
    return json; 
}
const obtenerNombreRegion = async (id) => {
    const url = `http://localhost:3000/index/regiones/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerNombrePais = async (id) => {
    const url = `http://localhost:3000/index/paises/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerNombreCiudad  = async (id) => {
    const url = `http://localhost:3000/index/ciudades/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerRegionPorId = async (id) => {
    const url = `http://localhost:3000/index/regiones/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const traerCompanias = async () => {
    const url = `http://localhost:3000/companias`
    const response = await fetch(url)
    const json = response.json()
    return json
}
const obtenerNombreCompania = async (id) => {
    const url = `http://localhost:3000/index/companias/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerCanales = async () =>{
    const url = `http://localhost:3000/index/canales`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerCanalesPreferidos = async (id) =>{
    const url = `http://localhost:3000/index/canales/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerCanalesInfo = async (id) =>{
    const url = `http://localhost:3000/index/canales/info/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerCanalesNombre = async (id) =>{
    const url = `http://localhost:3000/index/canales/nombre/${id}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const traerDatosEdicion = async (name) =>{
    const url = `http://localhost:3000/index/nombre/${name}`;
    const response = await fetch(url);
    const json = response.json();
    return json;
}
const obtenerRegiones = async () => {
    const url = 'http://localhost:3000/regiones/'
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const obtenerPaises = async () => {
    const url = `http://localhost:3000/region/paises/`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const obtenerCiudades = async () => {
    const url = `http://localhost:3000/region/ciudades/`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const obtenerPaisesFiltrados = async (registro) => {
    const url = `http://localhost:3000/region/paisesPorRegion/${registro}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const obtenerCiudadesFiltradas = async (registro) => {
    const url = `http://localhost:3000/region/ciudadesPorPais/${registro}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const obtenerIdRegion = async (nombre) => {
    const url = `http://localhost:3000/region/${nombre}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const obtenerIdPais = async (nombre) => {
    const url = `http://localhost:3000/pais/${nombre}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const modalEliminar = (event) =>{
    const eventTarget = event.target
    
    const borrarEdit = document.querySelector('.borrar-contacto')
    const borrarIndex = document.querySelector('.acciones-borrar')
    const modalBorrar = document.querySelector('.modalBorrar')
    const filtroModal = document.querySelector('.filtro-modal')
    const borrarSeleccionados = document.querySelector('.etiqueta-eliminar')
    
    modalBorrar.style.display = 'inline-flex'
    filtroModal.style.display = 'block'
    
    
    window.onclick = function(event) {
        const filtroModal = document.querySelector('.filtro-modal')
        if (event.target == filtroModal) {
            modalBorrar.style.display = "none";
            filtroModal.style.display = 'none'
        }
    }   

    const modalCancelar = document.querySelector('.modal-cancelar')

    modalCancelar.addEventListener('click', () =>{
        modalBorrar.style.display = "none";
        filtroModal.style.display = 'none'
    })

    if(eventTarget == borrarEdit){
        const contactoEdit = eventTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[3].childNodes[3].value
        console.log(contactoEdit)
        deleteModalEdit(contactoEdit)
    }if(eventTarget == borrarIndex){
        const contactoIndex = eventTarget.parentElement.parentElement.parentElement.childNodes[0].childNodes[0].id
        deleteModal(contactoIndex)
    }if(eventTarget == borrarSeleccionados){
        let body = {contactos: []}
        for(let i = 0; i < checkBoxSelect.length; i++){
            body['contactos'].push(checkBoxSelect[i])
        }
        console.log(body)
        deleteModalSeleccionados(body)
    }
}

const deleteModal = (name) =>{
    console.log(name)
    const nombre = name
    const nombreContacto ={
        nombre: nombre
    }
    console.log(nombreContacto)
    fetch('http://localhost:3000/index', {
        method: 'DELETE',
        body: JSON.stringify(nombreContacto),
        headers:({
            'Content-Type': 'application/json',
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data))
        location.reload()
    })
}
const deleteModalEdit = (idContacto) =>{
    console.log(idContacto)
    const modalDelete = document.querySelector('.modal-borrar') 
    modalDelete.addEventListener('click', () =>{
        const id = idContacto
        const contactoId ={
            nombre: id
        }
        console.log(contactoId)
        fetch('http://localhost:3000/index/id', {
            method: 'DELETE',
            body: JSON.stringify(contactoId),
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

const deleteModalSeleccionados = (body) =>{
    const modalDelete = document.querySelector('.modal-borrar') 
    console.log(body)
    modalDelete.addEventListener('click', () =>{
        const eliminarSeleccion = document.querySelector('.etiqueta-eliminar')        
        fetch('http://localhost:3000/index/seleccionados', {  
            method: 'DELETE',
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


const crearTablaContactos = (nombre, email, pais, region, compania, cargo, canales, interes, checkId) => {
    const contenedorMain = document.querySelector('.contenedor-main')
    const filaContactos = document.createElement('div')
    filaContactos.classList.add('contenedor-contactos')

    /*Div CheckBox */

    const divCheck = document.createElement('div')
    divCheck.classList.add('check-cabecera')
    const inputCheck = document.createElement('input')
    inputCheck.classList.add('check-input')
    inputCheck.id = nombre
    inputCheck.setAttribute("type", "checkbox")
    inputCheck.setAttribute("name", "checkbox")
    inputCheck.setAttribute("name", "checkbox")

    /*Div contacto*/
    const divContacto = document.createElement('div')
    divContacto.classList.add('contactos-column')
    
    const imgContactos = document.createElement('img')
    imgContactos.classList.add('perfil')
    imgContactos.setAttribute('src', '/recursos/perfil.png')
    imgContactos.setAttribute('alt', 'foto-perfil')

    const divNombreEmail = document.createElement('div')
    divNombreEmail.classList.add('nombre-email')
    const nombreP = document.createElement('p')
    nombreP.classList.add('p-nombre')
    nombreP.textContent = nombre
    const emailP = document.createElement('p')
    emailP.classList.add('p-email')
    emailP.textContent = email

    /*Div Pais/Region */
    const divPaisRegion = document.createElement('div')
    divPaisRegion.classList.add('pais-column')
    const paisP = document.createElement('p')
    paisP.classList.add('p-pais')
    paisP.textContent = pais
    const regionP = document.createElement('p')
    regionP.classList.add('p-region')
    regionP.textContent = region

    /*Div Compania*/
    const divCompania = document.createElement('div')
    divCompania.classList.add('compania-column')
    const companiaP = document.createElement('p')
    companiaP.classList.add('p-compania')
    companiaP.textContent = compania

    /*Div Cargo */
    const divCargo = document.createElement('div')
    divCargo.classList.add('cargo-column')
    const cargoP = document.createElement('p')
    cargoP.classList.add('p-cargo')
    cargoP.textContent = cargo

    /*Div Canal */
    const divCanal = document.createElement('div')
    divCanal.classList.add('canal-column')
    const canalPuntos = document.createElement('div')
    canalPuntos.classList.add('canal-puntos')
    const divContCanales = document.createElement('div')
    divContCanales.classList.add('contenedor-canales')
    const canalPuntosImg = document.createElement('img')
    canalPuntosImg.classList.add('puntos-img')
    canalPuntosImg.setAttribute('src', 'recursos/svgs/dots.svg')
    canalPuntosImg.setAttribute('alt', 'more')
    divCanal.appendChild(divContCanales)
    const contCanalHover = document.createElement('div')
    contCanalHover.classList.add('contenedor-canal-hover')
    
    for(let i = 0; i < canales.length; i++){
        if(i < 2){
            canalPuntosImg.style.display = 'none'
            const divCanalP = document.createElement('div')
            divCanalP.classList.add('canal')
            const canalP = document.createElement('p')
            canalP.classList.add('canal-p')
            canalP.textContent = canales[i]
            divCanalP.appendChild(canalP)
            divContCanales.appendChild(divCanalP)
            canalPuntos.appendChild(canalPuntosImg)
            divCanal.appendChild(canalPuntos)
        }else{
            canalPuntosImg.style.display = 'inline-flex'
            const divCanalHover = document.createElement('div')
            divCanalHover.classList.add('div-canal-hover')
            const canalHoverP = document.createElement('p')
            canalHoverP.textContent = canales[i]
            divCanalHover.appendChild(canalHoverP)
            contCanalHover.appendChild(divCanalHover)
        }           
    }
    divCanal.appendChild(contCanalHover)       

    /* Div Interes */
    const divInteres = document.createElement('div')
    divInteres.classList.add('interes-column')
    const interesP = document.createElement('p')
    interesP.classList.add('p-interes')
    interesP.textContent = `${interes}%`
    const divBarraInteres = document.createElement('div')
    divBarraInteres.classList.add('contenedor-barra-interes')
    const divBarraFondo = document.createElement('div')
    divBarraFondo.classList.add('interes-barra-fondo')
    const divBarra = document.createElement('div')
    divBarra.classList.add('interes-barra')
    divBarra.style.width = `${interes}%`
    if(divBarra.style.width == '75%'){
        divBarra.style.background = '#FF6F00'
    }
    if(divBarra.style.width == '50%'){
        divBarra.style.background = '#FFC700'
    }
    if(divBarra.style.width == '25%'){
        divBarra.style.background = '#1CC1F5'
    }

    /*Div Acciones*/
    const divAcciones = document.createElement('div')
    divAcciones.classList.add('acciones-column')
    const divAccionesPuntos = document.createElement('div')
    divAccionesPuntos.classList.add('acciones-puntos')
    const imgPuntos = document.createElement('img')
    imgPuntos.classList.add('img-puntos')
    imgPuntos.setAttribute('src', 'recursos/svgs/dots.svg')
    imgPuntos.setAttribute('alt', 'more')
    const divAccionesHover = document.createElement('div')
    divAccionesHover.classList.add('acciones-hover')
    const imgAccionesBorrar = document.createElement('img')
    imgAccionesBorrar.classList.add('acciones-borrar')
    imgAccionesBorrar.setAttribute('src', 'recursos/svgs/trash.svg')
    imgAccionesBorrar.setAttribute('alt', 'borrar')
    const imgAccionesEditar = document.createElement('img')
    imgAccionesEditar.classList.add('acciones-editar')
    imgAccionesEditar.setAttribute('src', 'recursos/svgs/edit.svg')
    imgAccionesEditar.setAttribute('alt', 'editar')

    divCheck.appendChild(inputCheck)
    filaContactos.appendChild(divCheck)

    divNombreEmail.appendChild(nombreP)
    divNombreEmail.appendChild(emailP)
    divContacto.appendChild(imgContactos)
    divContacto.appendChild(divNombreEmail)
    filaContactos.appendChild(divContacto)

    divPaisRegion.appendChild(paisP)
    divPaisRegion.appendChild(regionP)
    filaContactos.appendChild(divPaisRegion)

    divCompania.appendChild(companiaP)
    filaContactos.appendChild(divCompania)

    divCargo.appendChild(cargoP)
    filaContactos.appendChild(divCargo)

    divCanal.appendChild(canalPuntos)
    filaContactos.appendChild(divCanal)

    divInteres.appendChild(interesP)
    divBarraInteres.appendChild(divBarraFondo)
    divBarraInteres.appendChild(divBarra)
    divInteres.appendChild(divBarraInteres)
    filaContactos.appendChild(divInteres)

    divAccionesPuntos.appendChild(imgPuntos)
    divAcciones.appendChild(divAccionesPuntos)
    divAccionesHover.appendChild(imgAccionesBorrar)
    divAccionesHover.appendChild(imgAccionesEditar)
    divAcciones.appendChild(divAccionesHover)
    filaContactos.appendChild(divAcciones)

    contenedorMain.appendChild(filaContactos)
}
const traerDatosContactos = async (callback, tabla) => {
    const datosContactos = await callback(tabla)
        
    for(let i = 0; i < datosContactos.length; i++){
        const nombrePais =  await obtenerNombrePais(datosContactos[i].id_pais)
        const nombreRegion =  await obtenerRegionPorId(datosContactos[i].id_region)
        const nombreCompania = await obtenerNombreCompania(datosContactos[i].id_compania)
        const canalesPreferidos = await obtenerCanalesPreferidos(datosContactos[i].id_contactos)
        const nombre = datosContactos[i].nombre_contacto
        const email = datosContactos[i].email_contacto
        const pais = nombrePais[0].nombre_paises
        const region = nombreRegion[0].nombre_regiones
        const compania = nombreCompania[0].nombre_compania
        const cargo = datosContactos[i].cargo_contacto
        const interes = datosContactos[i].interes_contacto
        const canales = []
        for(let j = 0; j < canalesPreferidos.length; j++){
            const canal = canalesPreferidos[j].nombre_canales
            canales.push(canal)
        }
        crearTablaContactos(nombre, email, pais, region, compania, cargo, canales, interes, i);
    }
    if(divSeleccionados.childNodes.length != 0){
        divSeleccionados.style.display ='none'
        eliminarSeleccionados.style.display = 'none'
        divSeleccionados.childNodes[0].remove()
    }
    if(checkBoxSelect.length >= 2){
        divSeleccionados.style.display = 'inline-flex'
        eliminarSeleccionados.style.display = 'inline-flex'
        divSeleccionadosP.textContent = `${checkBoxSelect.length} seleccionados`
        divSeleccionados.appendChild(divSeleccionadosP)
    }
    if(checkBoxSelect.length != 0){
        for(let y = 0; y < contactosHover.length; y++){
            const canalHover = btnPuntos[y].parentElement.parentElement.childNodes[1]
            const hijosCanal =  canalColumn[y].childNodes[0].childNodes        
            const checkBoxContacto = checkBox[y].parentElement.parentElement.childNodes[1].childNodes[1].childNodes[0].textContent

            const backgroundOver = () =>{
                contactosHover[y].style.background = 'rgb(0,0,0,0.05)'
                btnAcciones[y].style.display = 'none'
                accionesHover[y].style.display = 'inline-flex'
                if(btnPuntos[y].style.display == 'inline-flex'){
                    canalHover.style.display = 'block'
                    btnPuntos[y].style.background = '#AAA'
                }
            }
            const backgroundOut = () =>{
                canalHover.style.display = 'none'
                btnPuntos[y].style.background = '#FFF'
                contactosHover[y].style.background = 'none'
                accionesHover[y].style.display = 'none'
                btnAcciones[y].style.display = 'inline-flex'  
            }
            for(let i = 0; i < checkBoxSelect.length; i++){
                if(contactosHover[y].childNodes[1].childNodes[1].childNodes[0].textContent == arrayCheckBox[i]){
                    checkBox[arrayCheckBox[i]].checked = true
                    if(!checkBox[y].checked){
                        contactosHover[y].addEventListener('mouseover', backgroundOver)
                        contactosHover[y].addEventListener('mouseout', backgroundOut)
                    }else{
                        contactosHover[y].removeEventListener('mouseover', backgroundOver)
                        contactosHover[y].removeEventListener('mouseout', backgroundOut)          
                        contactosHover[y].style.background = 'rgb(224, 239, 255, 0.9)'
                        btnAcciones[y].style.display = 'block'
                        canalHover.style.display = 'none'
                        btnPuntos[y].style.background = 'none'
                        accionesHover[y].style.display = 'none'
                        for(let j = 0; j < hijosCanal.length; j++){
                            hijosCanal[j].style.background = '#0683F9'
                            hijosCanal[j].childNodes[0].style.color = '#FFF'
                        }
                        if(checkBoxSelect.length >= 2){
                            exportarDesplegar.style.display = 'inline-flex'
                            divSeleccionados.style.display = 'inline-flex'
                            eliminarSeleccionados.style.display = 'inline-flex'
                            divSeleccionadosP.textContent = `${checkBoxSelect.length} seleccionados`
                            divSeleccionados.appendChild(divSeleccionadosP)      
                        }
                    }
                }
            }
        }
    }

    contenedorMain.lastChild.id = 'last-child'
    divSeleccionadosP.classList.add('etiqueta')
    
    for(let i = 0; i < contactosHover.length; i++){
        const backgroundOver = () =>{
            contactosHover[i].style.background = 'rgb(0,0,0,0.05)'
            btnAcciones[i].style.display = 'none'
            accionesHover[i].style.display = 'inline-flex'
            const canalHover = btnPuntos[i].parentElement.parentElement.childNodes[1]
       
       
            if(btnPuntos[i].style.display == 'inline-flex'){
                canalHover.style.display = 'block'
                btnPuntos[i].style.background = '#AAA'
            }
        }

        const backgroundOut = () =>{
            const canalHover = btnPuntos[i].parentElement.parentElement.childNodes[1]
            canalHover.style.display = 'none'
            btnPuntos[i].style.background = '#FFF'
            contactosHover[i].style.background = 'none'
            accionesHover[i].style.display = 'none'
            btnAcciones[i].style.display = 'inline-flex'  
        }
        if(!checkBox[i].checked){
            contactosHover[i].addEventListener('mouseover', backgroundOver)
            contactosHover[i].addEventListener('mouseout', backgroundOut)
        }else{
            contactosHover[i].removeEventListener('mouseover', backgroundOver)
            contactosHover[i].removeEventListener('mouseout', backgroundOut)
        }
        checkBox[i].addEventListener('click', () => {
            arrayCheckBox.push(checkBox[i].id)
            const canalHover = btnPuntos[i].parentElement.parentElement.childNodes[1]
            const hijosCanal =  canalColumn[i].childNodes[0].childNodes
            if(checkBox[i].checked){
                const checkBoxContacto = checkBox[i].parentElement.parentElement.childNodes[1].childNodes[1].childNodes[0].textContent
                contactosHover[i].removeEventListener('mouseover', backgroundOver)
                contactosHover[i].removeEventListener('mouseout', backgroundOut)
                contactosHover[i].style.background = 'rgb(224, 239, 255, 0.9)'
                btnAcciones[i].style.display = 'block'
                canalHover.style.display = 'none'
                btnPuntos[i].style.background = 'none'
                accionesHover[i].style.display = 'none'
                for(let j = 0; j < hijosCanal.length; j++){
                    hijosCanal[j].style.background = '#0683F9'
                    hijosCanal[j].childNodes[0].style.color = '#FFF'
                }
                checkBoxSelect.push(checkBoxContacto)
                if(checkBoxSelect.length >= 2){
                    exportarDesplegar.style.display = 'inline-flex'
                    divSeleccionados.style.display = 'inline-flex'
                    eliminarSeleccionados.style.display = 'inline-flex'
                    divSeleccionadosP.textContent = `${checkBoxSelect.length} seleccionados`
                    divSeleccionados.appendChild(divSeleccionadosP)      
                }
            }else{
                const checkBoxContacto = checkBox[i].parentElement.parentElement.childNodes[1].childNodes[1].childNodes[0].textContent
                contactosHover[i].addEventListener('mouseover', backgroundOver)
                contactosHover[i].addEventListener('mouseout', backgroundOut)
                contactosHover[i].style.background = 'none'
                for(let j = 0; j < hijosCanal.length; j++){
                    hijosCanal[j].style.background = 'rgb(224, 239, 255, 0.9)'
                    hijosCanal[j].childNodes[0].style.color = '#0683F9'
                }
                const indexCheck = checkBoxSelect.indexOf(checkBoxContacto)
                checkBoxSelect.splice(indexCheck, 1)
                if(checkBoxSelect.length <= 1 ){
                    exportarDesplegar.style.display = 'none'
                    eliminarSeleccionados.style.display = 'none'
                    divSeleccionadosP.textContent = `${checkBoxSelect.length} seleccionados`
                    divSeleccionados.appendChild(divSeleccionadosP) 
                    divSeleccionados.style.display = 'none'
                }
            }
            divSeleccionadosP.textContent = `${checkBoxSelect.length} seleccionados`
            divSeleccionados.appendChild(divSeleccionadosP)
        })
    }
    const botonesBorrar = document.getElementsByClassName('acciones-borrar')
    for(let i = 0; i < botonesBorrar.length; i++){
        botonesBorrar[i].addEventListener('click', modalEliminar)
    }    

    const botonesEditar = document.getElementsByClassName('acciones-editar')   
    for(let i = 0; i < botonesEditar.length; i++){
        botonesEditar[i].addEventListener('click', () =>{    
            contenedorEditor.style.display = 'inline-flex';
            const filtroEdicion = document.createElement('div')
            filtroEdicion.classList.add('filtro-edicion')
            main.appendChild(filtroEdicion)
            filtroEdicion.style.display = 'block';
            const padreEdicion = botonesEditar[i].parentNode.parentNode.parentNode;
            const contacto = padreEdicion.childNodes[1].childNodes[1].childNodes[0].textContent
    
    /*Traer datos del usuario para editar*/
            traerDatosEdicion(contacto)
            .then(json =>{
                const contacto = json[0]
                fotoPerfil.value = contacto.foto_contacto
                const nombreApellido = contacto.nombre_contacto.split(' ')
                contactoNombre.value = nombreApellido[0]
                contactoApellido.value = nombreApellido[1]
                cargoContacto.value = contacto.cargo_contacto
                emailContacto.value = contacto.email_contacto
                selectInteres.value = contacto.interes_contacto
                idContacto.value = contacto.id_contactos
                contactoDireccion.value = contacto.direccion_contacto
                interesContactoBarra(contacto.interes_contacto)
                const idRegion = json[0].id_region
                const idPais = json[0].id_pais
                const idCiudad = json[0].id_ciudad
                const idCompania = json[0].id_compania
                obtenerNombreCompania(idCompania)
                .then(compania =>{
                    contactoCompania.value = compania[0].nombre_compania
                    obtenerNombreCiudad(idCiudad)
                    .then(ciudad =>{
                        selectCiudad.value = ciudad[0].nombre_ciudades
                        selectOpcionesRegionesEdicion(idRegion, idPais, idCiudad)
                    })
                })
                obtenerCanalesInfo(contacto.id_contactos)
                .then(canal =>{
                    completarCanales(canal)
                })
            })            
            
            companiasInput.addEventListener ('keyup', filtrarCompania)
            interesBarraEdit.addEventListener('click', seleccionBarraEdit)
            selectInteres.addEventListener('change', seleccionPorcentaje)
            selectRegion.addEventListener('change', selectRegionChange)
            selectPais.addEventListener('change', selectPaisChange)
            
            const borrarContacto = document.querySelector('.borrar-contacto')
            borrarContacto.addEventListener('click', modalEliminar)

            const btnGuardarContactosEdit = document.querySelector('.btn-edicion-contactos')
            btnGuardarContactosEdit.addEventListener('click', async () =>{
                let inputCollection = document.querySelectorAll('.contenedor-contacto-edicion input');
                let inputCollectionRegion = document.querySelectorAll('.region-interes > div > select')
                let inputCollectionDireccion = document.querySelector('#contactoDireccion')
                let inputCollectionInteres = document.querySelector('#porcentajeInteres')
                let inputCanal = document.querySelectorAll('.contenedor-canal-contactos > .canal-contactos > .datos-contacto-agregar > .canalContacto')
                let inputCanalInfo = document.querySelectorAll('.contenedor-canal-contactos > .canal-contactos > .datos-contacto-agregar > .canalInfo')
                let inputCanalPreferencia = document.querySelectorAll('.contenedor-canal-contactos > .canal-contactos > .datos-contacto-agregar > .canalPreferencia')
                const pCompania = document.querySelector('.no-compania')
                const errorParametrosAgregar = document.querySelector('.parametrosFaltantes')
                const canalInfo = document.querySelector('#canalInfo0')
                let body = {}
                let arrayCanales = []                
                if(!contactoNombre.value || !contactoApellido.value || !contactoDireccion.value || !emailContacto.value || !cargoContacto.value || !contactoCompania.value || pCompania.style.display == 'inline-flex' || !canalInfo.value){
                    console.log('FALTA', pCompania.style.display == 'inline-flex' )
                    errorParametrosAgregar.style.display = 'inline-flex'
                }else{
                    for(let i = 0; i < inputCollection.length; i++){
                        let nombre = inputCollection[i].name
                        let valor = inputCollection[i].value
                        body[nombre] = valor;
                    }
            
                    for(let i = 0; i< inputCollectionRegion.length; i++){
                        let nombre = inputCollectionRegion[i].name
                        let valor = inputCollectionRegion[i].options[inputCollectionRegion[i].selectedIndex].text
                        body[nombre] = valor
                    }
            
                    let direccion = inputCollectionDireccion.name
                    let direccionValor = inputCollectionDireccion.value
                    body[direccion] = direccionValor
            
                    let interes = inputCollectionInteres.name
                    let interesValor = inputCollectionInteres.options[inputCollectionInteres.selectedIndex].value
                    body[interes] = interesValor
            
                    for(let i = 0; i < inputCanal.length; i++){
                        let bodyCanal = {}
            
                        let canal = inputCanal[i].className
                        let canalValor = inputCanal[i].options[inputCanal[i].selectedIndex].text
                        bodyCanal[canal] = canalValor
            
                        let canalInfo = inputCanalInfo[i].className
                        let canalInfoValor = inputCanalInfo[i].value
                        bodyCanal[canalInfo] = canalInfoValor
            
                        let canalPreferencia = inputCanalPreferencia[i].className
                        let canalPreferenciaValor = inputCanalPreferencia[i].options[inputCanalPreferencia[i].selectedIndex].text
                        bodyCanal[canalPreferencia] = canalPreferenciaValor
                        arrayCanales.push(bodyCanal)
                    }
                    
            
                    console.log(body)
                    console.log(arrayCanales)
                    body['canales'] = arrayCanales
                    console.log(body)
            
                    fetch('http://localhost:3000/index/contacto', {  
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
                }
            })
            
            filtroEdicion.addEventListener('click', (event) =>{
            contenedorAgregar.style.display = "none";
            contenedorEditor.style.display = "none";
            location.reload()
            filtroEdicion.remove();
            })   
        })   
    } 
}

traerDatosContactos(obtenerContactos)

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
const btnAgregarContacto = document.querySelector('.btn-agregar-contacto')

btnAgregarContacto.addEventListener('click', () =>{
    contenedorAgregar.style.display = 'inline-flex'
    const filtroAgregar = document.createElement('div')
    filtroAgregar.classList.add('filtro-agregar')
    main.appendChild(filtroAgregar)
    filtroAgregar.style.display = 'block';

    selectOpcionesRegiones()

    companiasInputA.addEventListener ('click', filtrarCompaniaAgregar)
    companiasInputA.addEventListener ('keyup', filtrarCompaniaAgregar)
    interesBarraAgregar.addEventListener('click', seleccionBarraAgregar)
    selectInteresA.addEventListener('change', seleccionPorcentajeAgregar)
    selectRegionAgregar.addEventListener('change', selectRegionChangeAgregar)
    selectPaisAgregar.addEventListener('change', selectPaisChangeAgregar)
    selectCiudadAgregar.addEventListener('change', selectCiudadChangeAgregar)
    canalContactoAgregar.addEventListener('change', completarCanalesAgregar)
    
    const btnCancelarAgregarContacto = document.querySelector('.cancelar-agregar-contacto')
    btnCancelarAgregarContacto.addEventListener('click', () => {
        contenedorAgregar.style.display = "none";
        filtroAgregar.style.display = "none";
        location.reload()
        filtroAgregar.remove();
    })

    const btnGuardarCambiosA = document.querySelector('.btn-agregar-contactos');
    btnGuardarCambiosA.addEventListener('click', () => {
        let inputCollection = document.querySelectorAll('.contenedor-contacto-agregar input');
        let inputCollectionRegion = document.querySelectorAll('.region-interesA > div > select')
        let inputCollectionDireccion = document.querySelector('#contactoDireccionAgregar')
        let inputCollectionInteres = document.querySelector('#porcentajeInteresA')
        let inputCanal = document.querySelectorAll('.contenedor-canal-contactosA > .canal-contactos > .datos-contacto-agregar > .canalContacto')
        let inputCanalInfo = document.querySelectorAll('.contenedor-canal-contactosA > .canal-contactos > .datos-contacto-agregar > .canalInfo')
        let inputCanalPreferencia = document.querySelectorAll('.contenedor-canal-contactosA > .canal-contactos > .datos-contacto-agregar > .canalPreferencia')
        const pCompania = document.querySelector('.no-companiaA')
        const errorParametrosAgregar = document.querySelector('.parametrosFaltantes')
        const canalInfo = document.querySelector('#canalInfo0')
        let body = {}
        let arrayCanales = []

        if(!contactoNombreA.value || !contactoApellidoA.value || !contactoDireccionAgregar.value || !emailContactoA.value || !cargoContactoA.value || !contactoCompaniaA.value || pCompania.style.display == 'inline-flex' || !canalInfo.value){
            console.log('FALTA', pCompania.style.display == 'inline-flex' )
            errorParametrosAgregar.style.display = 'inline-flex'
        }else{
            console.log('GO', pCompania.style.display == 'inline-flex' )
            for(let i = 0; i < inputCollection.length; i++){
                let nombre = inputCollection[i].name
                let valor = inputCollection[i].value
                body[nombre] = valor;
            }

            for(let i = 0; i< inputCollectionRegion.length; i++){
                let nombre = inputCollectionRegion[i].name
                let valor = inputCollectionRegion[i].options[inputCollectionRegion[i].selectedIndex].text
                body[nombre] = valor
            }

            let direccion = inputCollectionDireccion.name
            let direccionValor = inputCollectionDireccion.value
            body[direccion] = direccionValor

            let interes = inputCollectionInteres.name
            let interesValor = inputCollectionInteres.options[inputCollectionInteres.selectedIndex].value
            body[interes] = interesValor

            for(let i = 0; i < inputCanal.length; i++){
                let bodyCanal = {}

                let canal = inputCanal[i].className
                let canalValor = inputCanal[i].options[inputCanal[i].selectedIndex].text
                bodyCanal[canal] = canalValor

                let canalInfo = inputCanalInfo[i].className
                let canalInfoValor = inputCanalInfo[i].value
                bodyCanal[canalInfo] = canalInfoValor

                let canalPreferencia = inputCanalPreferencia[i].className
                let canalPreferenciaValor = inputCanalPreferencia[i].options[inputCanalPreferencia[i].selectedIndex].text
                bodyCanal[canalPreferencia] = canalPreferenciaValor
                arrayCanales.push(bodyCanal)
            }
            

            console.log(body)
            console.log(arrayCanales)
            body['canales'] = arrayCanales
            console.log(body)

            fetch('http://localhost:3000/index/contacto', {  
                method: 'POST',
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
        }
    
    })

    filtroAgregar.addEventListener('click', (event) =>{
        contenedorAgregar.style.display = "none";
        filtroAgregar.style.display = "none";
        location.reload()
        filtroAgregar.remove();
    })  
})

const btnOrdenar = document.getElementsByClassName('double-arrow')

for(let i = 0; i < btnOrdenar.length; i++){
    btnOrdenar[i].addEventListener('click', () => {
        if(btnOrdenar[i].id == 'ascendente'){
            btnOrdenar[i].id = 'descendente'
            const tabla = btnOrdenar[i].parentElement.id
            removeElementsByClass('contenedor-contactos')
            traerDatosContactos(ordenarDescendente, tabla)
        }else{
            btnOrdenar[i].id = 'ascendente'
            const tabla = btnOrdenar[i].parentElement.id
            removeElementsByClass('contenedor-contactos')
            traerDatosContactos(ordenarAscendente, tabla)

        }
    }) 
}
btnEliminarSeleccionados.addEventListener('click', modalEliminar)

const selectOpcionesRegiones = async () => {
    const traerRegiones = await obtenerRegiones()

    for(let i = 0; i < traerRegiones.length; i++){
        const optionRegion = document.createElement("option");
        optionRegion.setAttribute('value', `${traerRegiones[i].nombre_regiones}`)
        optionRegion.text = traerRegiones[i].nombre_regiones;
        selectRegionAgregar.add(optionRegion);   
    }
}
const selectOpcionesRegionesEdicion = async (idRegion, idPais, idCiudad) => {
    selectRegion.innerHTML = ''
    selectPais.innerHTML = ''
    selectCiudad.innerHTML = ''
    const traerRegiones = await obtenerRegiones()
    const traerPaises = await obtenerPaises()
    const traerCiudades = await obtenerCiudades()
    const nombreRegion = await obtenerNombreRegion(idRegion)
    const nombrePais = await obtenerNombrePais(idPais)
    const nombreCiudad = await obtenerNombreCiudad(idCiudad)

    const optionSelectRegion = document.createElement('option')
    optionSelectRegion.text = 'Seleccione una región...'
    selectRegion.add(optionSelectRegion);   

    for(let i = 0; i < traerRegiones.length; i++){
        const optionRegion = document.createElement("option");
        optionRegion.setAttribute('value', `${traerRegiones[i].nombre_regiones}`)
        optionRegion.text = traerRegiones[i].nombre_regiones;
        selectRegion.add(optionRegion);   
    }
    const optionSelectPais = document.createElement('option')
    optionSelectPais.text = 'Seleccione un país...'
    selectPais.add(optionSelectPais); 
    for(let y = 0; y < traerPaises.length; y++){
        const optionPais = document.createElement("option");
        optionPais.setAttribute('value', `${traerPaises[y].nombre_paises}`)
        optionPais.text = traerPaises[y].nombre_paises;
        selectPais.add(optionPais); 
    }
    const optionSelectCiudad = document.createElement('option')
    optionSelectCiudad.text = 'Seleccione una ciudad...'
    selectCiudad.add(optionSelectCiudad); 
    for(let j=0; j < traerCiudades.length; j++){
        const optionCiudad = document.createElement("option");
        optionCiudad.setAttribute('value', `${traerCiudades[j].nombre_ciudades}`)
        optionCiudad.text = traerCiudades[j].nombre_ciudades;
        selectCiudad.add(optionCiudad); 
    }

    selectRegion.value = nombreRegion[0].nombre_regiones
    selectPais.value = nombrePais[0].nombre_paises
    selectCiudad.value = nombreCiudad[0].nombre_ciudades

    if(selectRegion.value !== 'Seleccione una región...'){
        selectPais.innerHTML = ''
        selectCiudad.innerHTML = ''
        const filtrarPaises = await obtenerPaisesFiltrados(idRegion)
        const filtrarCiudades = await obtenerCiudadesFiltradas(idPais)
        const optionSelectPais = document.createElement('option')
        optionSelectPais.text = 'Seleccione un país...'
        selectPais.add(optionSelectPais); 
        for(let y = 0; y < filtrarPaises.length; y++){
            const paisesFiltrados = document.createElement("option");
            paisesFiltrados.setAttribute('value', `${filtrarPaises[y].nombre_paises}`)
            paisesFiltrados.text = filtrarPaises[y].nombre_paises;
            selectPais.add(paisesFiltrados); 
        }
        const optionSelectCiudad = document.createElement('option')
        optionSelectCiudad.text = 'Seleccione una ciudad...'
        selectCiudad.add(optionSelectCiudad); 
        for(let j = 0; j < filtrarCiudades.length; j++){
            const ciudadesFiltradas = document.createElement("option");
            ciudadesFiltradas.setAttribute('value', `${filtrarCiudades[j].nombre_ciudades}`)
            ciudadesFiltradas.text = filtrarCiudades[j].nombre_ciudades;
            selectCiudad.add(ciudadesFiltradas); 
        }
        selectPais.value = nombrePais[0].nombre_paises
        selectCiudad.value = nombreCiudad[0].nombre_ciudades
    }
}
const selectRegionChange = async () => {
    const region = selectRegion.value
    const pais = selectPais.value
    if(region !== 'Seleccione una región...'){
        selectPais.innerHTML = ''
        selectCiudad.innerHTML = ''
        const obtenerRegionId = await obtenerIdRegion(region)
        const filtrarPaises = await obtenerPaisesFiltrados(obtenerRegionId[0].id_regiones)
        const optionSelectPais = document.createElement('option')
        optionSelectPais.text = 'Seleccione un país...'
        selectPais.add(optionSelectPais); 
        const optionSelectCiudad = document.createElement('option')
        optionSelectCiudad.text = 'Seleccione una ciudad...'
        selectCiudad.add(optionSelectCiudad);
        for(let y = 0; y < filtrarPaises.length; y++){
            const paisesFiltrados = document.createElement("option");
            paisesFiltrados.setAttribute('value', `${filtrarPaises[y].nombre_paises}`)
            paisesFiltrados.text = filtrarPaises[y].nombre_paises;
            selectPais.add(paisesFiltrados); 
        }
    }else{
        selectCiudad.value = 'Seleccione una ciudad...'
    }
}
const selectRegionChangeAgregar = async () => {
    const region = selectRegionAgregar.value
    const pais = selectPaisAgregar.value
    if(region != 'seleccione'){
        selectPaisAgregar.disabled = false
        selectPaisAgregar.innerHTML = ''
        const obtenerRegionId = await obtenerIdRegion(region)
        const filtrarPaises = await obtenerPaisesFiltrados(obtenerRegionId[0].id_regiones)
        const optionSelectPaisAgregar = document.createElement('option')
        optionSelectPaisAgregar.value = 'seleccione'
        optionSelectPaisAgregar.text = 'Seleccione un pais...'
        selectPaisAgregar.add(optionSelectPaisAgregar); 
        for(let y = 0; y < filtrarPaises.length; y++){
            const paisesFiltrados = document.createElement("option");
            paisesFiltrados.setAttribute('value', `${filtrarPaises[y].nombre_paises}`)
            paisesFiltrados.text = filtrarPaises[y].nombre_paises;
            selectPaisAgregar.add(paisesFiltrados); 
        }
    }else{
        selectPaisAgregar.innerHTML = ''
        const optionSelectPaisAgregar = document.createElement('option')
        optionSelectPaisAgregar.value = 'seleccione'
        optionSelectPaisAgregar.text = 'Seleccione un pais...'
        selectPaisAgregar.add(optionSelectPaisAgregar); 
        selectPaisAgregar.value = 'seleccione'
        selectPaisAgregar.disabled = true
        selectCiudadAgregar.innerHTML = ''
        const optionSelectCiudadAgregar = document.createElement('option')
        optionSelectCiudadAgregar.value = 'seleccione'
        optionSelectCiudadAgregar.text = 'Seleccione un pais...'
        selectCiudadAgregar.add(optionSelectCiudadAgregar); 
        selectCiudadAgregar.value = 'seleccione'
        selectCiudadAgregar.disabled = true
        contactoDireccionAgregar.innerHTML = ''
        contactoDireccionAgregar.disabled = true
    }
}
const selectPaisChange = async () => {
    const pais = selectPais.value
    if(pais !== 'Seleccione un pais...'){
        selectCiudad.innerHTML = ''
        const obtenerPaisId = await obtenerIdPais(pais)
        const filtrarCiudades = await obtenerCiudadesFiltradas(obtenerPaisId[0].id_paises)
        const optionSelectCiudad = document.createElement('option')
        optionSelectCiudad.text = 'Seleccione una ciudad...'
        selectCiudad.add(optionSelectCiudad); 
        for(let j = 0; j < filtrarCiudades.length; j++){
            const ciudadesFiltradas = document.createElement("option");
            ciudadesFiltradas.setAttribute('value', `${filtrarCiudades[j].nombre_ciudades}`)
            ciudadesFiltradas.text = filtrarCiudades[j].nombre_ciudades;
            selectCiudad.add(ciudadesFiltradas); 
        }
    }
}
const selectPaisChangeAgregar = async () => {
    const pais = selectPaisAgregar.value
    if(pais != 'seleccione'){
        selectCiudadAgregar.disabled = false
        selectCiudadAgregar.innerHTML = ''
        const obtenerPaisId = await obtenerIdPais(pais)
        const filtrarCiudades = await obtenerCiudadesFiltradas(obtenerPaisId[0].id_paises)
        const optionSelectCiudadAgregar = document.createElement('option')
        optionSelectCiudadAgregar.value = 'seleccione'
        optionSelectCiudadAgregar.text = 'Seleccione una ciudad...'
        selectCiudadAgregar.add(optionSelectCiudadAgregar); 
        for(let j = 0; j < filtrarCiudades.length; j++){
            const ciudadesFiltradas = document.createElement("option");
            ciudadesFiltradas.setAttribute('value', `${filtrarCiudades[j].nombre_ciudades}`)
            ciudadesFiltradas.text = filtrarCiudades[j].nombre_ciudades;
            selectCiudadAgregar.add(ciudadesFiltradas); 
        }
    }else{
        selectCiudadAgregar.innerHTML = ''
        const optionSelectCiudadAgregar = document.createElement('option')
        optionSelectCiudadAgregar.value = 'seleccione'
        optionSelectCiudadAgregar.text = 'Seleccione un pais...'
        selectCiudadAgregar.add(optionSelectCiudadAgregar); 
        selectCiudadAgregar.value = 'seleccione'
        selectCiudadAgregar.disabled = true
        contactoDireccionAgregar.innerHTML = ''
        contactoDireccionAgregar.disabled = true
    }
}
const selectCiudadChangeAgregar = async () => {
    const ciudad = selectCiudadAgregar.value
    if(ciudad != 'seleccione'){
        contactoDireccionAgregar.disabled = false
    }else{
        contactoDireccionAgregar.innerHTML = ''
        contactoDireccionAgregar.disabled = true
    }
}
const selectOpcionesCanales = async (n) =>{
    const traerCanales = await obtenerCanales()
    const selectCanalOpciones = document.querySelector(`#canalContacto${n}`)
    const optionCanal = document.createElement('option')
    optionCanal.value = 'seleccione'
    optionCanal.text = 'Seleccione un canal...'    
    selectCanalOpciones.appendChild(optionCanal)
    for(let i = 0; i < traerCanales.length; i++){
        if(n == undefined){
            break;
        }else{
            const optionCanal = document.createElement('option')
            optionCanal.text = traerCanales[i].nombre_canales
            selectCanalOpciones.appendChild(optionCanal)
        }
    }
}
const interesContactoBarra = (interes) => {
    if(interes == 'cero' || interes == 0){
        circuloInteres.style.left = '-2%'
        ceroInteres.style.background = 'none'
        veinticincoInteres.style.background = 'none'
        veinticincoInteres2.style.background = 'none'
        cincuentaInteres.style.background = 'none'
        cincuentaInteres2.style.background = 'none'
        setentaYCincoInteres.style.background = 'none'
        setentaYCincoInteres2.style.background = 'none'
        cienInteres.style.background = 'none'
        selectInteres.value = '0'
    }
    if(interes == 'veinticinco' || interes =='veinticinco2' || interes == 25){
        circuloInteres.style.left = '22%'
        ceroInteres.style.background = '#1CC1F5'
        veinticincoInteres.style.background = '#1CC1F5'
        veinticincoInteres2.style.background = 'none'
        cincuentaInteres.style.background = 'none'
        cincuentaInteres2.style.background = 'none'
        setentaYCincoInteres.style.background = 'none'
        setentaYCincoInteres2.style.background = 'none'
        cienInteres.style.background = 'none'
        selectInteres.value = '25'
    }
    if(interes == 'cincuenta' || interes == 'cincuenta2' || interes == 50){
        circuloInteres.style.left = '48%'
        ceroInteres.style.background = '#FFC700'
        veinticincoInteres.style.background = '#FFC700'
        veinticincoInteres2.style.background = '#FFC700'
        cincuentaInteres.style.background = '#FFC700'
        cincuentaInteres2.style.background = 'none'
        setentaYCincoInteres.style.background = 'none'
        setentaYCincoInteres2.style.background = 'none'
        cienInteres.style.background = 'none'
        selectInteres.value = '50'
    }
    if(interes == 'setentaYCinco' || interes == 'setentaYCinco2' || interes == 75){
        circuloInteres.style.left = '72%'
        ceroInteres.style.background = '#FF6F00'    
        veinticincoInteres.style.background = '#FF6F00'    
        veinticincoInteres2.style.background = '#FF6F00'    
        cincuentaInteres.style.background = '#FF6F00'
        cincuentaInteres2.style.background = '#FF6F00'
        setentaYCincoInteres.style.background = '#FF6F00'
        setentaYCincoInteres2.style.background = 'none'
        cienInteres.style.background = 'none'
        selectInteres.value = '75'
    }
    if(interes == 'cien' || interes == '100' || interes == 100){
        circuloInteres.style.left = '95%'
        ceroInteres.style.background = '#DE0028'
        veinticincoInteres.style.background = '#DE0028'
        veinticincoInteres2.style.background = '#DE0028'
        cincuentaInteres.style.background = '#DE0028'
        cincuentaInteres2.style.background = '#DE0028'
        setentaYCincoInteres.style.background = '#DE0028'
        setentaYCincoInteres2.style.background = '#DE0028'
        cienInteres.style.background = '#DE0028'
        selectInteres.value = '100'
    }
}
const interesContactoBarraAgregar = (interes) => {
    if(interes == 'ceroA' || interes == 0){
        circuloInteresA.style.left = '-2%'
        ceroInteresA.style.background = 'none'
        veinticincoInteresA.style.background = 'none'
        veinticincoInteres2A.style.background = 'none'
        cincuentaInteresA.style.background = 'none'
        cincuentaInteres2A.style.background = 'none'
        setentaYCincoInteresA.style.background = 'none'
        setentaYCincoInteres2A.style.background = 'none'
        cienInteresA.style.background = 'none'
        selectInteresA.value = '0'
    }
    if(interes == 'veinticincoA' || interes =='veinticinco2A' || interes == 25){
        circuloInteresA.style.left = '22%'
        ceroInteresA.style.background = '#1CC1F5'
        veinticincoInteresA.style.background = '#1CC1F5'
        veinticincoInteres2A.style.background = 'none'
        cincuentaInteresA.style.background = 'none'
        cincuentaInteres2A.style.background = 'none'
        setentaYCincoInteresA.style.background = 'none'
        setentaYCincoInteres2A.style.background = 'none'
        cienInteresA.style.background = 'none'
        selectInteresA.value = '25'
    }
    if(interes == 'cincuentaA' || interes == 'cincuenta2A' || interes == 50){
        circuloInteresA.style.left = '48%'
        ceroInteresA.style.background = '#FFC700'
        veinticincoInteresA.style.background = '#FFC700'
        veinticincoInteres2A.style.background = '#FFC700'
        cincuentaInteresA.style.background = '#FFC700'
        cincuentaInteres2A.style.background = 'none'
        setentaYCincoInteresA.style.background = 'none'
        setentaYCincoInteres2A.style.background = 'none'
        cienInteresA.style.background = 'none'
        selectInteresA.value = '50'
    }
    if(interes == 'setentaYCincoA' || interes == 'setentaYCinco2A' || interes == 75){
        circuloInteresA.style.left = '72%'
        ceroInteresA.style.background = '#FF6F00'    
        veinticincoInteresA.style.background = '#FF6F00'    
        veinticincoInteres2A.style.background = '#FF6F00'    
        cincuentaInteresA.style.background = '#FF6F00'
        cincuentaInteres2A.style.background = '#FF6F00'
        setentaYCincoInteresA.style.background = '#FF6F00'
        setentaYCincoInteres2A.style.background = 'none'
        cienInteresA.style.background = 'none'
        selectInteresA.value = '75'
    }
    if(interes == 'cienA' || interes == '100' || interes == 100){
        circuloInteresA.style.left = '95%'
        ceroInteresA.style.background = '#DE0028'
        veinticincoInteresA.style.background = '#DE0028'
        veinticincoInteres2A.style.background = '#DE0028'
        cincuentaInteresA.style.background = '#DE0028'
        cincuentaInteres2A.style.background = '#DE0028'
        setentaYCincoInteresA.style.background = '#DE0028'
        setentaYCincoInteres2A.style.background = '#DE0028'
        cienInteresA.style.background = '#DE0028'
        selectInteresA.value = '100'
    }
}
const completarCanales = async (canales) =>{
    if(canales.length == 1){
            agregarNuevoCanal(0)
            const nombreCanal = await obtenerCanalesNombre(canales[0][0].id_canales)
            const selectContacto = document.querySelector(`#canalContacto0`) 
            selectContacto.value = nombreCanal[0].nombre_canales
            const selectInfo = document.querySelector(`#canalInfo0`)
            selectInfo.value = canales[0][0].dato_canal
            const selectPreferencia = document.querySelector(`#canalPreferencia0`)
            if(canales[0][0].id_preferencia_canal == 1){
                selectPreferencia.value = 'Sin preferencias'
            }
            if(canales[0][0].id_preferencia_canal == 2){
                selectPreferencia.value = 'Canal favorito'
            }
            if(canales[0][0].id_preferencia_canal == 3){
                selectPreferencia.value = 'No molestar'
            }
    }else{
        for(let i = 0; i < canales.length; i++){
            agregarNuevoCanal(i)
            const nombreCanal = await obtenerCanalesNombre(canales[i][0].id_canales)
            const selectContacto = document.querySelector(`#canalContacto${i}`) 
            selectContacto.value = nombreCanal[0].nombre_canales
            const selectInfo = document.querySelector(`#canalInfo${i}`)
            selectInfo.value = canales[i][0].dato_canal
            const selectPreferencia = document.querySelector(`#canalPreferencia${i}`)
            if(canales[i][0].id_preferencia_canal == 1){
                selectPreferencia.value = 'Sin preferencias'
            }
            if(canales[i][0].id_preferencia_canal == 2){
                selectPreferencia.value = 'Canal favorito'
            }
            if(canales[i][0].id_preferencia_canal == 3){
                selectPreferencia.value = 'No molestar'
            }
        }
    }
}
const completarCanalesAgregar = async () =>{
    const canalContacto = document.querySelector('#canalContacto0')
    const canalInfo = document.querySelector('#canalInfo0')
    const canalPreferencia = document.querySelector('#canalPreferencia0')
    const btnAgregarCanalA = document.querySelector('.agregar-canalA')
    const spanAgregarTexto = document.querySelector('.agregar-textoA')
    const spanMasA = document.querySelector('.span-masA')
    const guardarContacto = document.querySelector('.btn-agregar-contactos')
    const cancelarContacto = document.querySelector('.cancelar-agregar-contacto')
    if(canalContacto.value == 'seleccione'){
        canalInfo.disabled = true
        canalPreferencia.disabled = true
        btnAgregarCanalA.style.pointerEvents = 'none'
        cancelarContacto.style.pointerEvents = 'none'
        guardarContacto.style.pointerEvents = 'none'
        btnAgregarCanalA.style.backgroundColor = '#FFF'
        guardarContacto.style.backgroundColor = '#ccc'
        spanAgregarTexto.style.color = '#ccc'
        cancelarContacto.style.color = '#ccc'
        spanMasA.style.color = '#ccc'
    }else{
        canalInfo.disabled = false
        canalPreferencia.disabled = false
        btnAgregarCanalA.style.pointerEvents = 'auto'
        cancelarContacto.style.pointerEvents = 'auto'
        guardarContacto.style.pointerEvents = 'auto'
        btnAgregarCanalA.style.backgroundColor = '#1D72C2'
        guardarContacto.style.backgroundColor = '#278a06'
        spanAgregarTexto.style.color = '#FFF'
        cancelarContacto.style.color = '#DE0028'
        spanMasA.style.color = '#FFF'
    }
}

const editarCanal = async (evt) => {
    const padre = evt.currentTarget.myParam
    const canalContacto = padre.childNodes[0]
    const canalInfo = padre.childNodes[1]
    const preferenciaCanal = padre.childNodes[2]
    canalContacto.childNodes[1].value = 'seleccione'
    canalInfo.childNodes[1].value = ' '
    preferenciaCanal.childNodes[1].value = 'sinPreferencias'

}
const editarCanalAgregar = async (evt) => {
    const padre = evt.currentTarget.myParam
    const canalContacto = padre.children[0]
    const canalInfo = padre.children[1]
    const preferenciaCanal = padre.children[2]
    canalContacto.children[1].value = 'seleccione'
    canalInfo.children[1].value = ' '
    preferenciaCanal.children[1].value = 'sinPreferencias'

}
const borrarCanal = async (evt) => {
    const padre = evt.currentTarget.myParam
    const padrePadre = padre.parentElement
    padre.remove()

    for(let i = 0; i< padrePadre.children.length; i++){ 
        padrePadre.children[i].children[0].children[0].setAttribute('for', `canalContacto${i}`)
        padrePadre.children[i].children[0].children[1].id = `canalContacto${i}`

        padrePadre.children[i].children[1].children[0].setAttribute('for', `canalInfo${i}`)
        padrePadre.children[i].children[1].children[1].id = `canalInfo${i}`

        padrePadre.children[i].children[2].children[0].setAttribute('for', `canalPreferencia${i}`)
        padrePadre.children[i].children[2].children[1].id = `canalPreferencia${i}`
    }
}
const borrarCanalAgregar = async (evt) => {
    const padre = evt.currentTarget.myParam
    const padrePadre = padre.parentElement
    
    padre.remove()

    for(let i = 0; i< padrePadre.children.length; i++){ 
        padrePadre.children[i].children[0].children[0].setAttribute('for', `canalContacto${i}`)
        padrePadre.children[i].children[0].children[1].id = `canalContacto${i}`

        padrePadre.children[i].children[1].children[0].setAttribute('for', `canalInfo${i}`)
        padrePadre.children[i].children[1].children[1].id = `canalInfo${i}`

        padrePadre.children[i].children[2].children[0].setAttribute('for', `canalPreferencia${i}`)
        padrePadre.children[i].children[2].children[1].id = `canalPreferencia${i}`
    }
}
const agregarNuevoCanal = async (n) =>{  
    const canalContenedor = document.querySelector('.contenedor-canal-contactos')
    const canalContactos = document.createElement('div')
    canalContactos.classList.add('canal-contactos')
    
    const canalSecundarioDiv = document.createElement('div')
    canalSecundarioDiv.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv.classList.add('contacto-agregar-canal') 
    const labelCanalContacto = document.createElement('label')
    labelCanalContacto.classList.add('label-contacto')
    labelCanalContacto.setAttribute('for', `canalContacto${n}`)
    labelCanalContacto.textContent = 'Canal de contacto'
    const selectCanalSecundario = document.createElement('select')
    selectCanalSecundario.classList.add('canalContacto')
    selectCanalSecundario.id = `canalContacto${n}`
    canalSecundarioDiv.appendChild(labelCanalContacto)
    canalSecundarioDiv.appendChild(selectCanalSecundario)
    canalContactos.appendChild(canalSecundarioDiv)
    canalContenedor.appendChild(canalContactos)   
    const optionDefault = document.createElement('option')
    optionDefault.value = 'seleccione' 
    optionDefault.text = 'Seleccione un canal...'
    selectOpcionesCanales(n)
    
    const canalSecundarioDiv2 = document.createElement('div')
    canalSecundarioDiv2.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv2.classList.add('contacto-agregar-canal') 
    const labelCanalInput = document.createElement('label')
    labelCanalInput.classList.add('label-contacto')
    labelCanalInput.setAttribute('for', `canalInfo${n}`)
    labelCanalInput.textContent = 'Cuenta de usuario'
    const canalSecundarioInput = document.createElement('input')
    canalSecundarioInput.classList.add('canalInfo')
    canalSecundarioInput.setAttribute('type', 'select')
    canalSecundarioInput.setAttribute('name', 'canalInfo')
    canalSecundarioInput.classList.add = 'canalInfoN'
    canalSecundarioInput.id = `canalInfo${n}`
    
    const canalSecundarioDiv3 = document.createElement('div')
    canalSecundarioDiv3.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv3.classList.add('contacto-agregar-canal')
    const labelCanalPreferencias = document.createElement('label')
    labelCanalPreferencias.classList.add('label-contacto')
    labelCanalPreferencias.setAttribute('for', `canalPreferencia${n}`)
    labelCanalPreferencias.textContent = 'Preferencias'
    const selectCanalSecundarioPref = document.createElement('select')
    selectCanalSecundarioPref.classList.add('canalPreferencia')
    selectCanalSecundarioPref.id = `canalPreferencia${n}`
    selectCanalSecundarioPref.setAttribute('name', `canalPreferencia${n}`)
    const optionNoPreferencia2 = document.createElement ('option')
    optionNoPreferencia2.textContent = 'Sin preferencias'
    const optionFavorito2 = document.createElement ('option')
    optionFavorito2.textContent = 'Canal favorito'
    const optionNoMolestar2 = document.createElement ('option')
    optionNoMolestar2.textContent = 'No molestar'
    
    

    canalSecundarioDiv2.appendChild(labelCanalInput)
    canalSecundarioDiv2.appendChild(canalSecundarioInput)
    
    canalSecundarioDiv3.appendChild(labelCanalPreferencias)
    selectCanalSecundarioPref.appendChild(optionNoPreferencia2)
    selectCanalSecundarioPref.appendChild(optionFavorito2)
    selectCanalSecundarioPref.appendChild(optionNoMolestar2)
    canalSecundarioDiv3.appendChild(selectCanalSecundarioPref)
    
    canalContactos.appendChild(canalSecundarioDiv2)
    canalContactos.appendChild(canalSecundarioDiv3)
    
    if(n == 0){
        const divAgregarCanal = document.createElement('div')
        divAgregarCanal.classList.add('btnAgregarCanal')
        const btnAgregarCanal = document.createElement('button')
        btnAgregarCanal.classList.add('agregar-canal')
        const spanAgregarMas = document.createElement('span')
        spanAgregarMas.classList.add('span-mas')
        spanAgregarMas.textContent = '+'
        const spanAgregarTexto = document.createElement('span')
        spanAgregarTexto.classList.add('agregar-texto')
        spanAgregarTexto.textContent = 'Agregar Canal'
        
        btnAgregarCanal.appendChild(spanAgregarMas)
        btnAgregarCanal.appendChild(spanAgregarTexto)
        divAgregarCanal.appendChild(btnAgregarCanal)
        canalContactos.appendChild(divAgregarCanal)
        
        canalContenedor.appendChild(canalContactos)
        btnAgregarCanal.addEventListener('click', agregarCanal)
    }
    if(n != 0){ 
        const divBtnEditarCanal = document.createElement ('div')
        divBtnEditarCanal.classList.add('btnEditarCanal')
        const btnEditarCanal = document.createElement('button')
        btnEditarCanal.classList.add('editar-canal') 
        const imgEditarCanal = document.createElement('img')
        imgEditarCanal.classList.add('img-editar-canal')
        imgEditarCanal.setAttribute('src', '/recursos/svgs/edit.png')
        imgEditarCanal.setAttribute('alt', 'edit')
        const spanEditarCanal = document.createElement('span')
        spanEditarCanal.classList.add('editar-texto')
        const textoEditar = document.createTextNode("Editar canal")
        btnEditarCanal.appendChild(imgEditarCanal)
        spanEditarCanal.appendChild(textoEditar)
        btnEditarCanal.appendChild(spanEditarCanal)
        

        const divBtnBorrarCanal = document.createElement ('div')
        divBtnBorrarCanal.classList.add('btnBorrarCanal')
        const btnBorrarCanal = document.createElement('button')
        btnBorrarCanal.classList.add('borrar-canal') 
        const imgBorrarCanal = document.createElement('img')
        imgBorrarCanal.classList.add('img-borrar-canal')
        imgBorrarCanal.setAttribute('src', '/recursos/svgs/trash.svg')
        imgBorrarCanal.setAttribute('alt', 'basurero')
        const spanBorrarCanal = document.createElement('span')
        spanBorrarCanal.classList.add('borrar-texto')
        const textoBorrar = document.createTextNode("Eliminar canal")
        btnBorrarCanal.appendChild(imgBorrarCanal)
        spanBorrarCanal.appendChild(textoBorrar)
        btnBorrarCanal.appendChild(spanBorrarCanal)
        divBtnEditarCanal.appendChild(btnEditarCanal)    
        divBtnBorrarCanal.appendChild(btnBorrarCanal)
        canalContactos.appendChild(divBtnEditarCanal)
        canalContactos.appendChild(divBtnBorrarCanal)
        const btnEdicionCanal = document.getElementsByClassName('btnEditarCanal')
        const btnEliminarCanal = document.getElementsByClassName('btnBorrarCanal')
        for(let i = 0; i < btnEdicionCanal.length; i++){
            btnEdicionCanal[i].addEventListener('click', editarCanal)
            btnEdicionCanal[i].myParam = btnEdicionCanal[i].parentElement
        }
        for(let i = 0; i < btnEliminarCanal.length; i++){
            btnEliminarCanal[i].addEventListener('click', borrarCanal)
            btnEliminarCanal[i].myParam = btnEliminarCanal[i].parentElement
        }
    }    
}
const agregarCanal = async () => {
    const canalContenedor = document.querySelector('.contenedor-canal-contactos')
    const canalContactos = document.createElement('div')
    canalContactos.classList.add('canal-contactos')
    const hijosCanal = canalContenedor.children.length 
    let n = hijosCanal
    
    const canalSecundarioDiv = document.createElement('div')
    canalSecundarioDiv.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv.classList.add('contacto-agregar-canal') 
    const labelCanalContacto = document.createElement('label')
    labelCanalContacto.classList.add('label-contacto')
    labelCanalContacto.setAttribute('for', `canalContacto${n}`)
    labelCanalContacto.textContent = 'Canal de contacto'
    const selectCanalSecundario = document.createElement('select')
    selectCanalSecundario.classList.add('canalContacto')
    selectCanalSecundario.id = `canalContacto${n}`

    selectOpcionesCanales(n)
    
    const canalSecundarioDiv2 = document.createElement('div')
    canalSecundarioDiv2.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv2.classList.add('contacto-agregar-canal') 
    const labelCanalInput = document.createElement('label')
    labelCanalInput.classList.add('label-contacto')
    labelCanalInput.setAttribute('for', `canalInfo${n}`)
    labelCanalInput.textContent = 'Cuenta de usuario'
    const canalSecundarioInput = document.createElement('input')
    canalSecundarioInput.classList.add('canalInfo')
    canalSecundarioInput.setAttribute('type', 'select')
    canalSecundarioInput.setAttribute('name', 'canalInfo')
    canalSecundarioInput.id = `canalInfo${n}`
    
    const canalSecundarioDiv3 = document.createElement('div')
    canalSecundarioDiv3.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv3.classList.add('contacto-agregar-canal')
    const labelCanalPreferencias = document.createElement('label')
    labelCanalPreferencias.classList.add('label-contacto')
    labelCanalPreferencias.setAttribute('for', `canalPreferencia${n}`)
    labelCanalPreferencias.textContent = 'Preferencias'
    const selectCanalSecundarioPref = document.createElement('select')
    selectCanalSecundarioPref.classList.add('canalPreferencia')
    selectCanalSecundarioPref.id = `canalPreferencia${n}`
    selectCanalSecundarioPref.setAttribute('name', `canalPreferencia${n}`)
    const optionNoPreferencia2 = document.createElement ('option')
    optionNoPreferencia2.textContent = 'Sin preferencias'
    const optionFavorito2 = document.createElement ('option')
    optionFavorito2.textContent = 'Canal favorito'
    const optionNoMolestar2 = document.createElement ('option')
    optionNoMolestar2.textContent = 'No molestar'

    const divBtnEditarCanal = document.createElement ('div')
    divBtnEditarCanal.classList.add('btnEditarCanal')
    const btnEditarCanal = document.createElement('button')
    btnEditarCanal.classList.add('editar-canal') 
    const imgEditarCanal = document.createElement('img')
    imgEditarCanal.classList.add('img-editar-canal')
    imgEditarCanal.setAttribute('src', '/recursos/svgs/edit.png')
    imgEditarCanal.setAttribute('alt', 'edit')
    const spanEditarCanal = document.createElement('span')
    spanEditarCanal.classList.add('editar-texto')
    const textoEditar = document.createTextNode("Editar canal")
    btnEditarCanal.appendChild(imgEditarCanal)
    spanEditarCanal.appendChild(textoEditar)
    btnEditarCanal.appendChild(spanEditarCanal)
    

    const divBtnBorrarCanal = document.createElement ('div')
    divBtnBorrarCanal.classList.add('btnBorrarCanal')
    const btnBorrarCanal = document.createElement('button')
    btnBorrarCanal.classList.add('borrar-canal') 
    const imgBorrarCanal = document.createElement('img')
    imgBorrarCanal.classList.add('img-borrar-canal')
    imgBorrarCanal.setAttribute('src', '/recursos/svgs/trash.svg')
    imgBorrarCanal.setAttribute('alt', 'basurero')
    const spanBorrarCanal = document.createElement('span')
    spanBorrarCanal.classList.add('borrar-texto')
    const textoBorrar = document.createTextNode("Eliminar canal")

    btnBorrarCanal.appendChild(imgBorrarCanal)
    spanBorrarCanal.appendChild(textoBorrar)

    btnBorrarCanal.appendChild(spanBorrarCanal)
    
    canalSecundarioDiv.appendChild(labelCanalContacto)
    canalSecundarioDiv.appendChild(selectCanalSecundario)

    canalSecundarioDiv2.appendChild(labelCanalInput)
    canalSecundarioDiv2.appendChild(canalSecundarioInput)
    
    canalSecundarioDiv3.appendChild(labelCanalPreferencias)
    selectCanalSecundarioPref.appendChild(optionNoPreferencia2)
    selectCanalSecundarioPref.appendChild(optionFavorito2)
    selectCanalSecundarioPref.appendChild(optionNoMolestar2)
    canalSecundarioDiv3.appendChild(selectCanalSecundarioPref)
    
    divBtnEditarCanal.appendChild(btnEditarCanal)
    
    divBtnBorrarCanal.appendChild(btnBorrarCanal)

    canalContactos.appendChild(canalSecundarioDiv)
    canalContactos.appendChild(canalSecundarioDiv2)
    canalContactos.appendChild(canalSecundarioDiv3)
    canalContactos.appendChild(divBtnEditarCanal)
    canalContactos.appendChild(divBtnBorrarCanal)

    canalContenedor.appendChild(canalContactos)

    const btnEdicionCanal = document.getElementsByClassName('btnEditarCanal')
    const btnEliminarCanal = document.getElementsByClassName('btnBorrarCanal')
    for(let i = 0; i < btnEdicionCanal.length; i++){
        btnEdicionCanal[i].addEventListener('click', editarCanal)
        btnEdicionCanal[i].myParam = btnEdicionCanal[i].parentElement
    }
    for(let i = 0; i < btnEliminarCanal.length; i++){
        btnEliminarCanal[i].addEventListener('click', borrarCanal)
        btnEliminarCanal[i].myParam = btnEliminarCanal[i].parentElement
    }    
}
const agregarCanalAgregar = async () => {
    const canalContenedorA = document.querySelector('.contenedor-canal-contactosA')
    const canalContactos = document.createElement('div')
    canalContactos.classList.add('canal-contactos')
    const hijosCanal = canalContenedorA.children.length 
    let n = hijosCanal
    
    const canalSecundarioDiv = document.createElement('div')
    canalSecundarioDiv.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv.classList.add('contacto-agregar-canal') 
    const labelCanalContacto = document.createElement('label')
    labelCanalContacto.classList.add('label-contacto')
    labelCanalContacto.setAttribute('for', `canalContacto${n}`)
    labelCanalContacto.textContent = 'Canal de contacto'
    const selectCanalSecundario = document.createElement('select')
    selectCanalSecundario.classList.add('canalContacto')
    selectCanalSecundario.setAttribute('name', `canalContacto${n}`)
    selectCanalSecundario.id = `canalContacto${n}`

    selectOpcionesCanales(n)
    
    const canalSecundarioDiv2 = document.createElement('div')
    canalSecundarioDiv2.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv2.classList.add('contacto-agregar-canal') 
    const labelCanalInput = document.createElement('label')
    labelCanalInput.classList.add('label-contacto')
    labelCanalInput.setAttribute('for', `canalInfo${n}`)
    labelCanalInput.textContent = 'Cuenta de usuario'
    const canalSecundarioInput = document.createElement('input')
    canalSecundarioInput.classList.add('canalInfo')
    canalSecundarioInput.setAttribute('name', `canalInfo${n}`)
    canalSecundarioInput.id = `canalInfo${n}`
    
    const canalSecundarioDiv3 = document.createElement('div')
    canalSecundarioDiv3.classList.add('datos-contacto-agregar') 
    canalSecundarioDiv3.classList.add('contacto-agregar-canal')
    const labelCanalPreferencias = document.createElement('label')
    labelCanalPreferencias.classList.add('label-contacto')
    labelCanalPreferencias.setAttribute('for', `canalPreferencia${n}`)
    labelCanalPreferencias.textContent = 'Preferencias'
    const selectCanalSecundarioPref = document.createElement('select')
    selectCanalSecundarioPref.classList.add('canalPreferencia')
    selectCanalSecundarioPref.id = `canalPreferencia${n}`
    selectCanalSecundarioPref.setAttribute('name', `canalPreferencia${n}`)
    const optionNoPreferencia2 = document.createElement ('option')
    optionNoPreferencia2.value = 'sinPreferencias'
    optionNoPreferencia2.textContent = 'Sin preferencias'
    const optionFavorito2 = document.createElement ('option')
    optionFavorito2.value = 'canalFavorito'
    optionFavorito2.textContent = 'Canal favorito'
    const optionNoMolestar2 = document.createElement ('option')
    optionNoMolestar2.value = 'noMolestar'
    optionNoMolestar2.textContent = 'No molestar'

    const divBtnEditarCanal = document.createElement ('div')
    divBtnEditarCanal.classList.add('btnEditarCanalA')
    const btnEditarCanalA = document.createElement('button')
    btnEditarCanalA.classList.add('editar-canalA') 
    const imgEditarCanal = document.createElement('img')
    imgEditarCanal.classList.add('img-editar-canal')
    imgEditarCanal.setAttribute('src', '/recursos/svgs/edit.png')
    imgEditarCanal.setAttribute('alt', 'edit')
    const spanEditarCanal = document.createElement('span')
    spanEditarCanal.classList.add('editar-texto')
    const textoEditar = document.createTextNode("Editar canal")
    btnEditarCanalA.appendChild(imgEditarCanal)
    spanEditarCanal.appendChild(textoEditar)
    btnEditarCanalA.appendChild(spanEditarCanal)
    
    const divBtnBorrarCanal = document.createElement ('div')
    divBtnBorrarCanal.classList.add('btnBorrarCanalA')
    const btnBorrarCanalA = document.createElement('button')
    btnBorrarCanalA.classList.add('borrar-canalA') 
    const imgBorrarCanal = document.createElement('img')
    imgBorrarCanal.classList.add('img-borrar-canal')
    imgBorrarCanal.setAttribute('src', '/recursos/svgs/trash.svg')
    imgBorrarCanal.setAttribute('alt', 'basurero')
    const spanBorrarCanal = document.createElement('span')
    spanBorrarCanal.classList.add('borrar-texto')
    const textoBorrar = document.createTextNode("Eliminar canal")

    btnBorrarCanalA.appendChild(imgBorrarCanal)
    spanBorrarCanal.appendChild(textoBorrar)

    btnBorrarCanalA.appendChild(spanBorrarCanal)
    
    canalSecundarioDiv.appendChild(labelCanalContacto)
    canalSecundarioDiv.appendChild(selectCanalSecundario)

    canalSecundarioDiv2.appendChild(labelCanalInput)
    canalSecundarioDiv2.appendChild(canalSecundarioInput)
    
    canalSecundarioDiv3.appendChild(labelCanalPreferencias)
    selectCanalSecundarioPref.appendChild(optionNoPreferencia2)
    selectCanalSecundarioPref.appendChild(optionFavorito2)
    selectCanalSecundarioPref.appendChild(optionNoMolestar2)
    canalSecundarioDiv3.appendChild(selectCanalSecundarioPref)
    
    divBtnEditarCanal.appendChild(btnEditarCanalA)
    
    divBtnBorrarCanal.appendChild(btnBorrarCanalA)

    canalContactos.appendChild(canalSecundarioDiv)
    canalContactos.appendChild(canalSecundarioDiv2)
    canalContactos.appendChild(canalSecundarioDiv3)
    canalContactos.appendChild(divBtnEditarCanal)
    canalContactos.appendChild(divBtnBorrarCanal)

    canalContenedorA.appendChild(canalContactos)

    btnAgregarCanalA.addEventListener('click', agregarCanalAgregar)
   
    const btnEdicionCanalA = document.getElementsByClassName('btnEditarCanalA')
    const btnEliminarCanalA = document.getElementsByClassName('btnBorrarCanalA')
    for(let i = 0; i < btnEdicionCanalA.length; i++){
        btnEdicionCanalA[i].addEventListener('click', editarCanalAgregar)
        btnEdicionCanalA[i].myParam = btnEdicionCanalA[i].parentElement
    }
    for(let i = 0; i < btnEliminarCanalA.length; i++){
        btnEliminarCanalA[i].addEventListener('click', borrarCanalAgregar)
        btnEliminarCanalA[i].myParam = btnEliminarCanalA[i].parentElement
    }
}
btnAgregarCanalA.addEventListener('click', agregarCanalAgregar)

const filtrarCompania = async () => {
    const companias = await traerCompanias()
    listaCompanias.innerHTML = '' 
    const noCompania = document.querySelector('.no-compania')

    let texto = companiasInput.value.toLowerCase()
    for(let compania of companias){        
        let nombre = compania.nombre_compania.toLowerCase()
        if (nombre.indexOf(texto) !== -1){
            listaCompanias.style.display = 'inline-flex'
            const liCompanias = document.createElement('li')
            liCompanias.classList.add('li-companias')
            liCompanias.textContent = compania.nombre_compania
            listaCompanias.appendChild(liCompanias)
        }
    }

    const liCompanias = document.getElementsByClassName('li-companias')
    for(let i = 0; i< liCompanias.length; i++){ 
        liCompanias[i].addEventListener('click', () => {
            companiasInput.value =  liCompanias[i].textContent
            listaCompanias.style.display = 'none'
        })
        liCompanias[i].addEventListener('mouseover', (event) =>{
            liCompanias[i].style.backgroundColor = 'rgb(29, 114, 194, 0.8)'
            liCompanias[i].style.color = '#FFF'
        })
        liCompanias[i].addEventListener('mouseout', (event) =>{
            liCompanias[i].style.backgroundColor = '#FFF'
            liCompanias[i].style.color = '#000'
        })     
    }

    window.onclick = function(event) {
        if (event.target != liCompanias) {
            listaCompanias.style.display = "none";
        }
    }   

    if(texto === ''){
        listaCompanias.style.display = 'inline-flex'
    }
    if(listaCompanias.innerHTML === ''){
        listaCompanias.style.display = 'inline-flex'
        const liNoExiste = document.createElement('li')
        liNoExiste.classList.add('li-companias')
        liNoExiste.textContent = 'Compañía no encontrada'
        listaCompanias.appendChild(liNoExiste)
        noCompania.style.display = 'inline-flex'
    }else{
        noCompania.style.display = 'none'
    }
}
const filtrarCompaniaAgregar = async () => {
    const companias = await traerCompanias()
    listaCompaniasA.innerHTML = '' 
    const noCompania = document.querySelector('.no-companiaA')
    let texto = companiasInputA.value.toLowerCase()
    for(let compania of companias){        
        let nombre = compania.nombre_compania.toLowerCase()
        if (nombre.indexOf(texto) !== -1){
            listaCompaniasA.style.display = 'inline-flex'
            const liCompanias = document.createElement('li')
            liCompanias.classList.add('li-companias')
            liCompanias.textContent = compania.nombre_compania
            listaCompaniasA.appendChild(liCompanias)
        }
    }

    const liCompanias = document.getElementsByClassName('li-companias')
    for(let i = 0; i< liCompanias.length; i++){ 
        liCompanias[i].addEventListener('click', () => {
            companiasInputA.value =  liCompanias[i].textContent
            listaCompaniasA.style.display = 'none'
        })  
        liCompanias[i].addEventListener('mouseover', (event) =>{
            liCompanias[i].style.backgroundColor = 'rgb(29, 114, 194, 0.8)'

            liCompanias[i].style.color = '#FFF'
        })      
        liCompanias[i].addEventListener('mouseout', (event) =>{
            liCompanias[i].style.backgroundColor = '#FFF'
            liCompanias[i].style.color = '#000'
        })      
    }          

    window.onclick = function(event) {
        if (event.target != liCompanias) {
            listaCompaniasA.style.display = "none";
        }
    }   

    if(texto === ''){
        listaCompaniasA.style.display = 'inline-flex'
    }
    if(listaCompaniasA.innerHTML === ''){
        listaCompaniasA.style.display = 'inline-flex'
        noCompania.style.display = 'inline-flex'
        const liNoExiste = document.createElement('li')
        liNoExiste.classList.add('li-companias')
        liNoExiste.textContent = 'Compañía no encontrada'
        listaCompaniasA.appendChild(liNoExiste)
    }else{
        noCompania.style.display = 'none'
    }
}
const seleccionBarraEdit = (event) => {
    switch (event.target.id){
        case 'cero':
            interesContactoBarra(event.target.id)
            break;
        case 'veinticinco':
            interesContactoBarra(event.target.id)
            break;
        case 'veinticinco2':
            interesContactoBarra(event.target.id)
            break;
        case 'cincuenta':
            interesContactoBarra(event.target.id)
            break;
        case 'cincuenta2':
            interesContactoBarra(event.target.id)
            break;
        case 'setentaYCinco':
            interesContactoBarra(event.target.id)
            break;
        case 'setentaYCinco2':
            interesContactoBarra(event.target.id)
            break;
        case 'cien':
            interesContactoBarra(event.target.id)
            break;
    }
}
const seleccionBarraAgregar = (event) => {
    switch (event.target.id){
        case 'ceroA':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'veinticincoA':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'veinticinco2A':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'cincuentaA':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'cincuenta2A':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'setentaYCincoA':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'setentaYCinco2A':
            interesContactoBarraAgregar(event.target.id)
            break;
        case 'cienA':
            interesContactoBarraAgregar(event.target.id)
            break;
    }
}
const seleccionPorcentaje = () => {
    switch (selectInteres.value){
        case '0':
            interesContactoBarra(selectInteres.value)
            break;
        case '25':
            interesContactoBarra(selectInteres.value)
            break;
        case '50':
            interesContactoBarra(selectInteres.value)
            break;
        case '75':
            interesContactoBarra(selectInteres.value)
            break;
        case '100':
            interesContactoBarra(selectInteres.value)
            break;
    }
}
const seleccionPorcentajeAgregar = () => {
    switch (selectInteresA.value){
        case '0':
            interesContactoBarraAgregar(selectInteresA.value)
            break;
        case '25':
            interesContactoBarraAgregar(selectInteresA.value)
            break;
        case '50':
            interesContactoBarraAgregar(selectInteresA.value)
            break;
        case '75':
            interesContactoBarraAgregar(selectInteresA.value)
            break;
        case '100':
            interesContactoBarraAgregar(selectInteresA.value)
            break;
    }
}

btnLupa.addEventListener('click', () => {
    const busqueda = document.querySelector('#busqueda')
    const inputBusqueda = busqueda.value

    const contenedor = document.querySelector('.contenedor-main')
    const contenedorContacto = document.querySelectorAll('.contenedor-contactos')
    for(let i = 0; i < contenedorContacto.length; i++){
        contenedor.removeChild(contenedorContacto[i])
    }

    traerDatosContactos(obtenerContactosFiltrados, inputBusqueda)
})

busqueda.addEventListener('keyup', () => {
    const inputBusqueda = busqueda.value

    if(inputBusqueda == ''){
        const contenedor = document.querySelector('.contenedor-main')
        const contenedorContacto = document.querySelectorAll('.contenedor-contactos')
        for(let i = 0; i < contenedorContacto.length; i++){
            contenedor.removeChild(contenedorContacto[i])
        }
        traerDatosContactos(obtenerContactos)
    }else{
        const contenedor = document.querySelector('.contenedor-main')
        const contenedorContacto = document.querySelectorAll('.contenedor-contactos')
        for(let i = 0; i < contenedorContacto.length; i++){
            contenedor.removeChild(contenedorContacto[i])
        }

        traerDatosContactos(obtenerContactosFiltrados, inputBusqueda)
    }
})