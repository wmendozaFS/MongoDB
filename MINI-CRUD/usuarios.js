const connect = require("./database");
async function operaciones() {
  const db = await connect();
  const usuarios = db.collection("usuarios");
  await usuarios.insertOne({ nombre: "Ana", edad: 28 });
  const todos = await usuarios.find().toArray();
  console.log(todos);
}
operaciones();
