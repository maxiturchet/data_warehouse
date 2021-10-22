const toggler = document.getElementsByClassName('caret');
const contenedorEditor = document.querySelector('.contenedor-editor')
const divEditor = document.querySelector('.div-editor')
const divEditorAbajo = document.querySelector('.div-editor-abajo')
const contenedorRegion = document.querySelector('.contenedor-region')
const usuariosHeader = document.querySelector('#usuarios-header');
const main = document.querySelector('main');
const body = document.querySelector('body');
const token = window.localStorage.getItem('token');
const idEdLugar = document.querySelector('#idEdLugar')
const idRegionEd = document.querySelector('#idRegionEd')
const banderaIsoInput = document.querySelector('#banderaIso')
const nombreLugar = document.querySelector('#nombreLugar')
const contenedorAgregarRegion = document.querySelector('.contenedor-agregar-region')
const contenedorAgregarPais = document.querySelector('.contenedor-agregar-pais')
const contenedorAgregarCiudad = document.querySelector('.contenedor-agregar-ciudad')

/* Acceso a Usuarios solo Admin*/
const obtenerAdmin = async () => {
    if(token){
        const url = 'http://localhost:3000/region/admin'
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

/* Traer base de datos */
const obtenerDatosRegion = async () => {
    const url = 'http://localhost:3000/region/'
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const traerDatosRegion = async (tabla, registro) => {
    const url = `http://localhost:3000/region/${tabla}/${registro}`
    const response = await fetch(url)
    const json = await response.json()
    console.log(JSON.stringify(json))
    return json
}
/*Crear TreeView*/
const arbolRegion = async () => {
    const data = await obtenerDatosRegion()
    let regiones = []

    for(let i = 0; i < data.length; i++){
        if(regiones.indexOf(data[i].nombre_regiones) === -1){
            regiones.push(data[i].nombre_regiones)
        }
        
    }
    agregarRegiones(regiones);
    agregarUlPaises(regiones);
    agregarPais(data);
    agregarCiudades(data);

    /* Desplegar lista */
    for(let i = 0; i < toggler.length; i++){    
        toggler[i].addEventListener('click', () => {
            const togglerEl = toggler[i].parentElement
            const togglerChilds = togglerEl.childElementCount
            const togglerExist = document.querySelector('.pToggler')
            if(togglerChilds == 2){
                const togglerChild = toggler[i].firstChild
                const pToggler = document.createElement('p')
                pToggler.classList.add('pToggler')
                pToggler.textContent = 'Esta región no tiene país o ciudad'
                togglerEl.appendChild(pToggler)
                if(togglerExist){
                    togglerExist.remove()
                }

            }else{
                toggler[i].parentElement.querySelector('.nested').classList.toggle('active')
                toggler[i].classList.toggle('caret-down')

            }
        })
    }
    
    /*Botones Borrar*/
    const botonesBorrar = document.getElementsByClassName('btnBorrar');
    for(let i = 0; i < botonesBorrar.length; i++){
        botonesBorrar[i].addEventListener('click', () =>{
            const padreBoton = botonesBorrar[i].parentNode.parentNode;
            const tabla = `${padreBoton.className}es`
            const registro = padreBoton.id
            const region ={
                tabla: tabla,
                registro: registro
            }
            fetch(`http://localhost:3000/region/${tabla}`, {
                method: 'DELETE',
                body: JSON.stringify(region),
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
    const botonesBorrarRegion = document.getElementsByClassName('btn-borrar-region');
    for(let i = 0; i < botonesBorrarRegion.length; i++){
        botonesBorrarRegion[i].addEventListener('click', () =>{
            const padreBoton = botonesBorrarRegion[i].parentNode;
            const tabla = 'regiones'
            const registro = padreBoton.id
            const region ={
                tabla: tabla,
                registro: registro
            }
            console.log(padreBoton, tabla, registro)
            fetch(`http://localhost:3000/region/regiones`, {
                method: 'DELETE',
                body: JSON.stringify(region),
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

    /*Botones Editar*/
    const botonesEditar = document.getElementsByClassName('btnEditar');
    for(let i = 0; i < botonesEditar.length; i++){
        botonesEditar[i].addEventListener('click', (event) =>{
            contenedorEditor.style.display = 'inline-flex';
            const filtroEdicion = document.createElement('div')
            filtroEdicion.classList.add('filtro-edicion')
            main.appendChild(filtroEdicion)
            filtroEdicion.style.display = 'inline-flex';
            const padreBoton = botonesEditar[i].parentNode;
            const padreDelPadre = padreBoton.parentNode
            const tabla = `${padreDelPadre.className}es`
            const registro = padreDelPadre.id
        traerDatosRegion(tabla, registro)
            .then(json =>{
                if(!json[0].nombre_paises){
                    const ciudad = json[0]
                    const banderaIso = document.querySelector('.bandera-iso')
                    banderaIso.style.display = 'none'
                    const paisLabel = document.querySelector('.region-edicion label')
                    paisLabel.textContent = 'Id Pais'
                    const nombreLugarCiudad = document.querySelector('.nombre-lugar')
                    nombreLugarCiudad.textContent = 'Nombre Ciudad'
                    idEdLugar.value = ciudad.id_ciudades
                    idRegionEd.value = ciudad.pais_id
                    nombreLugar.value = ciudad.nombre_ciudades
                }else{    
                    const pais = json[0]
                    const banderaIso = document.querySelector('.bandera-iso')
                    const paisLabel = document.querySelector('.region-edicion label')
                    const nombreLugarCiudad = document.querySelector('.nombre-lugar')
                    if(banderaIso.style.display = 'none'){
                        banderaIso.style.display = 'inline-flex';
                        paisLabel.textContent = 'Id Region'
                        nombreLugarCiudad.textContent = 'Nombre Pais'
                    }
                    idEdLugar.value = pais.id_paises
                    idRegionEd.value = pais.region_id
                    banderaIsoInput.value = pais.bandera
                    nombreLugar.value = pais.nombre_paises
                }
            })
        })
        
        window.onclick = function(event) {
            const filtroEdicion = document.querySelector('.filtro-edicion')
            if (event.target == filtroEdicion) {
              contenedorEditor.style.display = "none";
              contenedorAgregarRegion.style.display = "none";
              contenedorAgregarPais.style.display = "none";
              contenedorAgregarCiudad.style.display = "none"
              filtroEdicion.remove();
            }
        }    
    }
    /*Boton Guardar cambios de Edicion */
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
            if(!body.banderaIso){
                fetch('http://localhost:3000/region/ciudades', {  
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
            }else{
                fetch('http://localhost:3000/region/paises', {  
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
    /*Boton Contenedor Agregar Region*/
    const btnAgregarRegion = document.querySelector('.btn-region');
        btnAgregarRegion.addEventListener('click', () => {
            const divAgregarRegion = document.querySelector('.contenedor-agregar-region')
            divAgregarRegion.style.display = 'inline-flex'
            const filtroEdicion = document.createElement('div')
            filtroEdicion.classList.add('filtro-edicion')
            main.appendChild(filtroEdicion)
            filtroEdicion.style.display = 'inline-flex';
        })

    const btnAddRegion = document.querySelector('.btn-add-region');
        btnAddRegion.addEventListener('click', () => {
            let inputCollection = document.querySelector('#nombreRegion')
            let body = {}
            let nombre = inputCollection.name
            let valor = inputCollection.value
            body[nombre] = valor;
            console.log(body)
            fetch('http://localhost:3000/region', {  
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
        })
    
    const botonesAgregarPais = document.getElementsByClassName('btn-pais');
    for(let i = 0; i < botonesAgregarPais.length; i++){
        botonesAgregarPais[i].addEventListener('click', () => {
            const regionPais = botonesAgregarPais[i].parentElement
            const divAgregarPais = document.querySelector('.contenedor-agregar-pais')
            divAgregarPais.style.display = 'inline-flex'
            const filtroEdicion = document.createElement('div')
            filtroEdicion.classList.add('filtro-edicion')
            main.appendChild(filtroEdicion)
            filtroEdicion.style.display = 'inline-flex'
            const inputRegionPais = document.querySelector('#nombreRegionPais')
            inputRegionPais.value = regionPais.id
        })
    }

    const btnAddPais = document.querySelector('.btn-add-pais');
        btnAddPais.addEventListener('click', () => {
            let inputCollection = document.querySelectorAll('.container-pais input');
            let body = {}
            for(let i = 0; i < inputCollection.length; i++){
                let nombre = inputCollection[i].name
                let valor = inputCollection[i].value
                body[nombre] = valor;
            }
            console.log(body)
            fetch('http://localhost:3000/region/pais', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: ({
                    'Content-Type': 'application/json',
                })
            })
            .then(response => response.json())
            .then(data =>{
                console.log(JSON.stringify(data))
                location.reload()
            })
        })
    
    const botonesAgregarCiudad = document.getElementsByClassName('btnCiudad');
    for(let i = 0; i < botonesAgregarCiudad.length; i++){
        botonesAgregarCiudad[i].addEventListener('click', () => {
            const paisCiudad = botonesAgregarCiudad[i].parentElement.parentElement
            const divAgregarCiudad = document.querySelector('.contenedor-agregar-ciudad')
            divAgregarCiudad.style.display = 'inline-flex'
            const filtroEdicion = document.createElement('div')
            filtroEdicion.classList.add('filtro-edicion')
            main.appendChild(filtroEdicion)
            filtroEdicion.style.display = 'inline-flex'
            const inputpaisCiudad = document.querySelector('#nombrePaisCiudad')
            inputpaisCiudad.value = paisCiudad.id
        })
    }

    const btnAddCiudad = document.querySelector('.btn-add-ciudad');
    btnAddCiudad.addEventListener('click', () => {
        let inputCollection = document.querySelectorAll('.container-ciudad input');
        let body = {}
        for(let i = 0; i < inputCollection.length; i++){
            let nombre = inputCollection[i].name
            let valor = inputCollection[i].value
            body[nombre] = valor;
        }
        console.log(body)
        fetch('http://localhost:3000/region/ciudad', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: ({
                'Content-Type': 'application/json',
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(JSON.stringify(data))
            location.reload()
        })
    })
}
arbolRegion()


/*Funciones para crear DOM treeview*/
const agregarRegiones = regiones => {
    regiones.forEach(region =>{
        const liRegion = document.createElement('li')
        liRegion.id = `${region}`
        const spanRegion = document.createElement('span')
        const btnPais = document.createElement('button')
        btnPais.classList.add('btn-pais')
        btnPais.textContent = ' Agregar pais'
        const btnBorrarRegion = document.createElement('button')
        btnBorrarRegion.classList.add('btn-borrar-region')
        btnBorrarRegion.textContent = ' Borrar '
        spanRegion.className ='caret caretRegion'
        const pRegion = document.createElement('p')
        pRegion.textContent = region
        liRegion.appendChild(spanRegion)
        spanRegion.appendChild(pRegion)
        liRegion.appendChild(btnPais)
        liRegion.appendChild(btnBorrarRegion)
        contenedorRegion.appendChild(liRegion)
    })
}
const agregarUlPaises = regiones => {
    for(let i = 0; i < regiones.length; i++){
        const liRegion = document.getElementById(regiones[i])
        const liNombreRegion = liRegion.textContent.split(' ')
        if(regiones[i] == liNombreRegion[0]){
            const ulPais = document.createElement('ul')
            ulPais.className = `contenedor-paises nested`
            ulPais.id = `ul${regiones[i]}`
            liRegion.appendChild(ulPais)
        }
    }
    
}
const agregarPais = (data) =>{
    for(let i = 0; i < data.length; i++){
        const pais = data[i].nombre_paises
        const ulPais = document.getElementById(`ul${data[i].nombre_regiones}`)
        const spanNombre = document.getElementById(data[i].nombre_paises)
        const paisIso = data[i].bandera
        if(!spanNombre && ulPais){ 
            /*Crear ul, li y botones*/
            if(pais){ 
                const liPais = document.createElement('li')
                liPais.id = pais
                liPais.classList.add('pais')
                const spanPais = document.createElement('span')
                spanPais.className = 'caret'
                const imgBandera = document.createElement('i')
                imgBandera.className= `flag-icon flag-icon-${paisIso}`
                const nombrePais = document.createElement('p')
                nombrePais.textContent = pais
                const ulCiudad = document.createElement('ul')
                ulCiudad.className = `contenedor-ciudades nested`
                ulCiudad.id = `ul${pais}`
                const divBotones = document.createElement('div')
                divBotones.classList.add('divBtnPais')
                const btnEditar = document.createElement('button')
                btnEditar.classList.add('btnEditar')
                btnEditar.textContent = 'Editar'
                const btnBorrar = document.createElement('button')
                btnBorrar.classList.add('btnBorrar')
                btnBorrar.textContent = 'Borrar'
                const btnCiudad = document.createElement('button')
                btnCiudad.classList.add('btnCiudad')
                btnCiudad.textContent = 'Agregar Ciudad'
                /*Agregar ul, li y botones al dom*/
                ulPais.appendChild(liPais)
                liPais.appendChild(spanPais)
                spanPais.appendChild(imgBandera)
                spanPais.appendChild(nombrePais)
                liPais.appendChild(divBotones)
                divBotones.appendChild(btnEditar)
                divBotones.appendChild(btnBorrar)
                divBotones.appendChild(btnCiudad)
                liPais.appendChild(ulCiudad)
            }else{
                ulPais.remove()
            }
        }
    }
}
const agregarCiudades = (data) =>{
    for(let i = 0; i < data.length; i++){
        const ciudad = data[i].nombre_ciudades
        const ulCiudad = document.getElementById(`ul${data[i].nombre_paises}`)
        const liCiudad = document.createElement('li')
        
        if(!ciudad && ulCiudad){
            ulCiudad.remove()
        }else if(!ciudad && !ulCiudad){
        }else{
            liCiudad.id = ciudad
            liCiudad.className = 'ciudad'
            const pCiudad = document.createElement('p')
            pCiudad.textContent = ciudad
            const divBotones = document.createElement('div')
            divBotones.classList.add('divBtnCiudad')
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btnEditar')
            btnEditar.textContent = 'Editar'
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btnBorrar')
            btnBorrar.textContent = 'Borrar'
            ulCiudad.appendChild(liCiudad)
            liCiudad.appendChild(pCiudad)
            liCiudad.appendChild(divBotones)
            divBotones.appendChild(btnEditar)
            divBotones.appendChild(btnBorrar)
        }
        
    }
}