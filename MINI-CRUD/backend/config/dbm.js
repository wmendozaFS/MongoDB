const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("✅ Conectado");
    const db = client.db("crudDB");
    const alumnos = db.collection("alumnos");
    // Aquí van las operaciones
  } catch (e) {
    console.error("❌ Error:", e);
  } finally {
    await client.close();
  }
}
