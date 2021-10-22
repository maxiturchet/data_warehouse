const loginBtn = document.querySelector('.loginBtn');
const noData = document.querySelector('.noData')
const inputPass = document.querySelector('.password-login')

/* Parrafo de usuarios o contraseña invalidos*/
if(sessionStorage.getItem('noData')) {
    noData.style.display = 'flex'
    sessionStorage.removeItem('noData')
}
/* Remueve el token al volver al Login*/
if(window.localStorage.getItem('token')){
    window.localStorage.removeItem('token')
}

/* Mandar el formulario con 'Enter' */
inputPass.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.querySelector(".loginBtn").click();
  }
});

loginBtn.addEventListener('click', async () =>{
    let inputCollection = document.querySelectorAll('.loginForm input');
    let body = {}
    console.log(body)
    for(let i = 0; i < inputCollection.length; i++){
        let nombre = inputCollection[i].name
        let valor = inputCollection[i].value
        body[nombre] = valor;
    }
    console.log(body)
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers:({
            'Content-Type': 'application/json',
        })
    })
    .then(response => response.json())
    .then(data => {  
        if(data.token){
            window.localStorage.setItem('token', JSON.stringify(data.token))
            let token = data.token
            window.location="http://127.0.0.1:5500/index.html"
        }else{
            console.log('Error Token invalido')
            window.sessionStorage.setItem('noData', noData)
            if(noData.style.display = 'none'){
                noData.style.display = 'flex'
            }else{
                noData.style.display = 'flex'
            }
        }
    })
});

    
    