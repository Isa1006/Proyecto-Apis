import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const __dirname = fs.realpathSync('.');

////////////////////////////////////////////////////////////////////////////////
class DictionaryBackendServer {
  constructor() {
    
    const app = express(); // Crea una instancia de la aplicación web utilizando el framework Express y la guarda en la constante app. Aca se configuran rutas como middleware tambien
    app.use(express.json()); // Registra un middleware en la aplicación para analizar las solicitudes entrantes con formato JSON. 
    app.use(express.static('public')); //Registra un middleware en la aplicación para servir archivos estáticos desde el directorio "public". Simplifica el acceso a cualquier archivo en la carpeta public
    app.use(express.urlencoded({extended: false})); //Esto permite que la aplicación pueda recibir y procesar datos enviados a través de formularios HTML.
    this.authorization = new Authorization(app); //Crea una instancia de una clase llamada "Authorization" y le pasa la instancia de la aplicación app como argumento.
    // TODO: create the Authorization object, creo un objeto nuevo con NEW NOMBRE DE LA CLASE


    app.get('/lookup/', this._doLookup);//_getCityActivities
    app.get('/login', this._login);
    app.get('/', this.authorization.checkAuthenticated, this._goHome);//hace que no nos podamos saltear pasos e ir directo a la aus
    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}));//estamos diciendo q si falla la autenticacion queremos que nos redireccione al login

    // TODO: add endpoings for login (GET and POST), for root (/)
    
    // Start server, hace que corra el servidor
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html")); //permite al usuario poder llegar a ver el login
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html")); //permite al usuario llegar a ver el index
  }

//api que armamos

async _doLookup(req, res) {
  try {
    const url = 'https://www.mockachino.com/8a7b934f-4602-41/actividades';
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
}

//api

  
}

new DictionaryBackendServer();
export default Authorization;