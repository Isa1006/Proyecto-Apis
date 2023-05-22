class Login {
    constructor() {  
      const loginForm = document.querySelector('#login-form');
      this._doLogin = this._doLogin.bind(this);
      loginForm.addEventListener('submit', this._doLogin);
    }

    _doLogin(event) {
        event.preventDefault();
    
const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const loginbody = {//creo un objeto que va a incluir el nombre de usuario y la constraseña
username: user,
password: pass
};

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginbody)
        };
        
        
        return fetch('/login/', fetchOptions)
            .then(user =>   window.location.href = '/');
    }
}
// Init app
const login = new Login();
