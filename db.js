import { MongoClient } from "mongodb";//importamos la clase mongoclient desde la base de datos MongoDB

//mongodb+srv://<username>:<password>@isabel.pf90ruf.mongodb.net/?retryWrites=true&w=majority
const connectionString = "mongodb+srv://valentinorusso04:valentinorusso1@isabel.pf90ruf.mongodb.net/"; //crea el objeto conectionstring con mi base de datos
const client = new MongoClient(connectionString);//la clase Mongoclient ahora puede interactuar directamente con la base de datos

let conn;
try { //trata de conectarse a la base de datos y captura cualquier error que pueda ocurrir
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("tpapis"); //seleccionamos una base de datos especifica poniendo el nombre de esta "tpapis"

export default db;//permitimos que otros archivos puedan acceder a este
