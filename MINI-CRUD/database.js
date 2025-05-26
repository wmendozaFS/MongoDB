const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "crudDB";
async function connect() {
  await client.connect();
  console.log("✅ Conectado");
  return client.db(dbName);
}
module.exports = connect;