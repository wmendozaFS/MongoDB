const{MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');
    const database = client.db('curso');
    const collection = database.collection('alumnos');
    
    // Insert a document
    const doc = { name: "Carla", age: 28, "estudios": ["Matematicas", "Ingles"] };
    const result = await collection.insertOne(doc);
    console.log(`New document inserted with _id: ${result.insertedId}`);

    // Find a document
    // const foundDoc = await collection.findOne({ name: "Maria" });
    // console.log('Found document:', foundDoc);

    // Update a document
    // const updateResult = await collection.updateOne({ name: "Alice" }, { $set: { age: 26 } });
    // console.log(`Documents updated: ${updateResult.modifiedCount}`);

    // Delete a document
    // const deleteResult = await collection.deleteOne({ name: "Alice" });
    // console.log(`Documents deleted: ${deleteResult.deletedCount}`);

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
   finally {
     await client.close();
     console.log('Conexión cerrada');
   }
}

run();
module.exports = {
  client,
  run
};