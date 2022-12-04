import { firestore, rtdb } from "./db";
import * as express from "express";
import { json } from "body-parser";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";
//utilizo cors para supsanar un problema de corsss....¡?¡??¡?¡?

// utilizo nodemon para escuchar los cambios enla api mientras trabajo lo llamo con un escript desde yarn dev

//utilizo uuid para generar un id complejo para q no choqurn los id

//utilizo body parser para manejar el body ((de tal manera de poder recibir los datos q me pasan el el body y poder manipular esos datos ))
const port = 3000;
const app = express();
///esta funcion de body parser se declara lo mas arriba posible para q todas as peticiones la puedan manejar con el body
app.use(json());
app.use(cors());
// // referencia a  la collection que quiero manipular datos en firestore
const usersCollection = firestore.collection("users");

//////////////////////////////////////////////////////////////////////
// app.get("/users", function (req, res) {
//   res.json(["todos los usuarios"]);
// });
app.listen(port, () => {
  console.log(`
   ::::::Server corriendo:::::`);
});

// app.post("/users", function (req, res) {
//   //consoleo el req.body q el el cuerpo body q se me envia desde la request (con el metodo raw y en formato JSON)
//   console.log("Recibido desde el post:::", req.body);
//   //creo una nueva colleccion con los datos q me pasaron por el body
//   const newUserCol = usersCollection.doc();
//   newUserCol.create(req.body).then(() => {
//     res.json({
//       accion: "usuario creado",
//       id: newUserCol.id,
//     });
//     console.log("usuario creado: ", newUserCol.id);
//   });
// });
// ///ruta /users/    ":userid" ed dinamico este parametro  que se guarda en req.params
// app.get("/users/:userId", function (req, res) {
//   //   res.json({
//   //     mensaje: "un id en particular",
//   //     params: req.params,
//   //   });
//   const userId = req.params.userId;
//   const userDoc = usersCollection.doc(userId);
//   userDoc.get().then((snapshap) => {
//     const userData = snapshap.data();
//     console.log("datos traidos de la base de datos::", userData);

//     res.json({
//       userData,
//     });
//   });
// });
// app.patch("/users/:Id", function (req, res) {
//   // capturo el id de el path (url)
//   const userId = req.params.Id;
//   //referencia a la coleccion
//   const userDoc = usersCollection.doc(userId);
//   // reg.body es el objeto body q me pasan
//   const updateObject = req.body;
//   //agrego un campo nuevo al objeto (el compo el el tipo fecha )
//   updateObject.updatedAt = new Date();
//   userDoc.update(updateObject).then((result) => {
//     console.log(result);

//     res.json({
//       mensaje: "ok",
//     });
//   });
// });

// ////////////////////metodos para los datos de FIREBASE
// ///post crea datos con create
// ///get los toma con get
// ///patch hace un update
//////////////////////////////////////////////////////////////////////////////////////////////

//post para crear un chatroom nuevo en la rtdb
app.post("/chatroom", function (req, res) {
  const id = uuidv4();
  const chatRoomRef = rtdb.ref("/chatrooms/" + id);
  chatRoomRef.set(
    {
      type: "chatroom",
    },
    ///devuelvo al cliente el id
    function () {
      res.json({
        id,
      });
    }
  );
});

app.post("/messages", function (req, res) {
  const chatRoomRef = rtdb.ref("/chatrooms/general/messages");
  console.log("lo q me pasan desde el cliente", req.body);

  chatRoomRef.push(req.body, function (err) {
    console.log(err);

    res.json("todo ok");
  });
});
