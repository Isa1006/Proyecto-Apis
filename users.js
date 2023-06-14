let users = new Map();//vamos a usar un objeto map que permite la almacenar "claves-valor" donde cada clave es unica y es clave para este caso particular
users.set("valentino", {username: "valentino", password: "russo"});
users.set("isabel", {username: "isabel", password: "delacre"});//utilizamos el metodo "set()"para dejar en claro que cada elemento ("dibu", "lio") y un valor con un "user" y una "password" 
 
export default users;//este export permite que el "map" y "Users" sea utilizados en otros archivos de javascript