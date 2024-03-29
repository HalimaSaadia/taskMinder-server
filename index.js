const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://taskMinder:cnuQREE2Gp2C2U7q@cluster0.3azmgms.mongodb.net/?retryWrites=true&w=majority";

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
    const tasksCollection = client.db("taskMinder").collection("tasks");

    app.get("/pending-task/:user",async(req,res)=> {
    const {user} = req.params
      const query = {status:"pending",user}
      const result = await tasksCollection.find(query).toArray()
      res.send(result)
    })
    app.get("/onGoing-task/:user",async(req,res)=> {
    const {user} = req.params
      const query = {status:"on-going",user}
      const result = await tasksCollection.find(query).toArray()
      res.send(result)
    })
    app.get("/completed-task/:user",async(req,res)=> {
    const {user} = req.params
      const query = {status:"completed",user}
      const result = await tasksCollection.find(query).toArray()
      res.send(result)
    })

    app.post("/add-task", async(req,res)=> {
      const newTask = req.body
      const result = await tasksCollection.insertOne(newTask)
      console.log(result);
      res.send(result)
    })

    app.delete("/delete-task/:id", async(req,res)=> {
      const {id} = req.params
      const query = {_id: new ObjectId(id)}
      const result = await tasksCollection.deleteOne(query)
      res.send(result)
    })
  
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
  }
}
run().catch(console.dir);

app.listen(port, ()=> {
  console.log("servier is unning");
})