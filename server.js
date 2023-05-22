import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const __dirname = fs.realpathSync('.');

////////////////////////////////////////////////////////////////////////////////
class DictionaryBackendServer {
  constructor() {
    
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: false}));
    const authorization = new Authorization(app);
    // TODO: create the Authorization object, creo un objeto nuevo con NEW NOMBRE DE LA CLASE


    app.get('/lookup/:word', this._doLookup);
    app.post('/save/', this._doSave);    //aca vamos a crear los endpoints
    app.get('/login', this._login);
    app.get('/', authorization._verify, this._goHome);//hace que no nos podamos saltear pasos e ir directo a la aus
    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}));//estamos diciendo q si falla la autenticacion queremos que nos redireccione al login

    // TODO: add endpoings for login (GET and POST), for root (/)
    
    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  }

  async _doLookup(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const query = { word: word.toLowerCase() };
    const collection = db.collection("dict");
    const stored = await collection.findOne(query);
    const response = {
      word: word,
      definition: stored ? stored.definition : ''
    };
    res.json(response);
  }

  async _doSave(req, res) {
    const query = { word: req.body.word.toLowerCase() };
    const update = { $set: { definition: req.body.definition } };
    const params = { upsert: true };
    const collection = db.collection("dict");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }
}

new DictionaryBackendServer();
