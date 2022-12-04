import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

// var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://apx-dwfs-m6-default-rtdb.firebaseio.com",
});
//referencia a la bdreal time

const rtdb = admin.database();
//exporto el firestore para acceder a la bd
const firestore = admin.firestore();
export { firestore, rtdb };

//primer contacto con ls base de datos de firestore
//prabando set en la bd
// const baseDeDatos = admin.firestore();

// baseDeDatos
//   .doc("users/user")
//   .set({ apellido: "govi", nombre: "carlos", edad: "34" })
//   .then((res) => {
//     console.log("::::::::::RESPUESTA:::::::::::", res);
//   });

// //traer datos de la db

// const fs = admin.firestore();
// //referencia de la collection
// const userCollection = fs.collection("users");
// //uso get para traer la collection
// //la promesa retorna un snapshop
// const allUsers = userCollection.get().then((snap) => {
//   //variable para traerme todos los docs(documentos)
//   let docs = snap.docs;
//   //itero todos los docs
//   for (let doc of docs) {
//     //doc retorna solo el snapshot del doc. completo
//     console.log(doc);
//     //doc.data retorna los datos
//     console.log(":::::prueba de proto:::", doc.data());
//   }
// });
