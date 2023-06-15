
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import users from './users.js';

class Authorization { //se utiliza para configurar y administrar la autenticación y autorización en una aplicación web utilizando Express.
    constructor(app) { //El constructor configura la aplicación para utilizar el módulo "express-session" para administrar las sesiones de los usuarios.
        app.use(session({ //establece la configuración de la sesión en la aplicación. 
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }));

        app.use(passport.initialize()); // inicia el modulo passport y  se configura Passport para que pueda ser utilizado en la aplicación.
        app.use(passport.session()); // esta función garantiza que la información de autenticación se conserve en las sesiones de usuario durante todo el ciclo de vida de la sesión.
        passport.use(new LocalStrategy(this._verify)); //el uso de una estrategia de autenticación local en passport, llevamos al objeto verify al entorno actual con this

        passport.serializeUser((user, done) => done(null, user));// Convierte el objeto en un a identificacion unica. En este caso, se pasa el objeto user como argumento y se llama a la función done para indicar que la serialización se ha completado.
        passport.deserializeUser((user, done) => done(null, user));//recupera el usuario a partir de su identificacion unica. se llama a la función done para indicar que la deserialización se ha completado
    }   //passport.serializeUser se encarga de serializar los datos del usuario y almacenarlos en la sesión para que tengan una identificacion unica

 _verify(username, password, done) {//busca un elemento y se fija si era un nombre de usuario y demas

        // encuentra el ususario por su nombre de usuario
        if (!users.has(username)) {
            // si usuario no se encuentra, tira un error.
            return done(new Error('Invalid username or password'));
        }

        const user = users.get(username);
        // compara la contraseña que pone el usuario con la de la base de datos.
        if (user.password !== password) {
            return done(new Error('Invalid username or password'));
        }

        // si el usuario esta autenticado aceptado.
        console.log("Login OK");
        return done(null, user);
    }

    checkAuthenticated(req, res, next) { // middleware verifica si el usuario esta autenticado
        if (req.isAuthenticated()) { //nos lleva a next si el usuario esta autenticado y si n lo esta nos lleva a re.redirect("login")
            return next(); //si el usuario esta autenticado llegamos aca
        }
        res.redirect("/login");
    }

}

export default Authorization; //permite que auth sea utilizable en otros archivos
