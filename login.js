class Login { //En resumen, esta clase se encarga de manejar la interacción con el login y define que debe pasar cuando se envía el formulario.
    constructor() {  
      const loginForm = document.querySelector('#login-form'); //nos permite seleccionar al elemento "login form" que tengo en el HTML
      this._doLogin = this._doLogin.bind(this); //Se esta enlazando el "_doLogin" al contexto actual gracias al this. es necesario para que el metodo pueda acceder al objeto de la manera correcta
      loginForm.addEventListener('submit', this._doLogin); //configuramos un evento para cuando se toca "enviar"en el formulario. El evento va a hacer que la funcion "doLogin" tome control del evento
    }
//this lleva el objeto al contexto actual
    _doLogin(event) {
        event.preventDefault(); //el "event.preventDefault()"evita el envio predeterminado de un formulario y permita que el cliente realize las acciones o cambios en el log in
    
const user = document.querySelector("#username");
const pass = document.querySelector("#password");// seleccionamos los elementos "username" y "password" de HTML y les asignamos una variable "user" y "pass" para poder manipularlos en JavaScript
const loginbody = { 
    username: user.value,
    password: pass.value
    }
    ;//estamos creando un objeto"loginbody" y le estamos asignando username y password, esto nos permite acceder a los valores que ingresen los usuarios. 
//con const "hola" creamos el objeto "hola"
        const fetchOptions = { //creamos el objeto fetchOptions
            method: 'POST', //aclaramos que vamos a hacer un POST al servidor
            headers: { //establecemos dos encabezados con el objeto HEADERS
                'Accept': 'application/json',//indicamos el tipo de contenido que se acepta como respuesta y "application/json" = respuesta en formato JSON
                'Content-Type': 'application/json'//indicamos el tipo de contenido que se envia como solicitud y "application/json" = solicitud se enviara en formato JSON
            },
            body: JSON.stringify(loginbody)//es el cuerpo de la solicitud, modificamos el "loginbody" para que se vuelva una cadena JSON y pueda ser enviado en la solicitud
        };
        
        
        return fetch('/login/', fetchOptions) 
            .then(user =>   window.location.href = '/');//funciona cuando el login se da con exito y lleva al usuario a la pagina principal, dejandolo acceder a la pagina
    }
}
// Init app
const login = new Login(); //creamos un nuevo objeto login basado en la clase Login
