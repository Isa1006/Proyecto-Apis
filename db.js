import { MongoClient } from "mongodb";


const connectionString = "mongodb+srv://valentinorusso04:valentinorusso1@isabel.pf90ruf.mongodb.net/";
const client = new MongoClient(connectionString);

let conn;
try { //trata de conectarse a la base de datos
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("tpapis"); //Nombre de la db

export default db;
