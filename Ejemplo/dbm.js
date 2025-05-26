const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("✅ Conectado");
    const db = client.db("miDB");
    const usuarios = db.collection("usuarios");
    // Aquí van las operaciones
  } catch (e) {
    console.error("❌ Error:", e);
  } finally {
    await client.close();
  }
}

//INSERTAR
await usuarios.insertOne({ nombre: "Luz", edad: 30 });
await usuarios.insertMany([
  { nombre: "Óscar", edad: 40 },
  { nombre: "Tania", edad: 17 },
]);

//CONSULTAR
const uno = await usuarios.findOne({ nombre: "Luz" });
const todos = await usuarios.find({}).toArray();
const mayores = await usuarios.find({ edad: { $gte: 18 } }).toArray();

//ACTUALIZAR
await usuarios.updateOne({ nombre: "Óscar" }, { $set: { edad: 45 } });
await usuarios.updateMany({ edad: { $lt: 18 } }, { $inc: { edad: 1 } });

//ELIMINAR
await usuarios.deleteOne({ nombre: "Tania" });
await usuarios.deleteMany({ edad: { $gt: 40 } });

//CONSULTAS AVANZADAS
await usuarios.find({}).sort({ edad: -1 }).limit(2).toArray();
await usuarios.find({ nombre: /a/i }).toArray(); // Búsqueda por regex

//AGREGACIONES (PIPELINE)
js
const resultado = await db.collection("pedidos").aggregate([
{ $unwind: "$items" },
{ $group: { _id: "$items.producto", total: { $sum: "$items.cantidad" } } }
]).toArray();

//ÍNDICES Y RENDIMIENTO
await usuarios.createIndex({ nombre: 1 }); // Índice ascendente por nombre