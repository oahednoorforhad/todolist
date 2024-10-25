const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://oahednoorforhad:VvuNefKJPm8HZXBQ@cluster0.3l1pq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


//Middleware
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/user', async (req, res) => {
      const { username } = req.query;
      const query = { username: username };
      const userData = await userCollection.findOne(query);
      if (userData) {
        res.send(userData);
      }
      else
        res.send({ userData: false });
      console.log(userData);
    })

    app.post('/user', async (req, res) => {
      const user = req.body;
      console.log('new user', user);
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    })

    app.put('/tasks', async (req, res) => {
      const { username } = req.query;
      const newTask = req.body;
      console.log("Full request body:", req.body);
      console.log("Received username:", username);
      console.log("Received newTask:", newTask);
      const filter = { username: username };
      const updateDoc = {
        $set: newTask,
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      if (result.modifiedCount > 0) {
        res.send({ message: 'Tasks updated successfully', result });
      } else {
        res.status(404).send({ message: 'User not found or no changes made' });
      }
      console.log(newTask);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.log());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})