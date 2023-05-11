const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port = process.env.PORT || 5000

// middlewere 
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vhijgnu.mongodb.net/?retryWrites=true&w=majority`;

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

        // const database = client.db("carDoctorsDB");
        // const carDoctors = database.collection("carDoctors");

        const serviesCollection = client.db('carDoctor').collection('services')

        app.get('/services', async (req, res) => {
            const curcor = serviesCollection.find()
            const result = await curcor.toArray()
            res.send(result)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const options = {
                
                // Include only the `title` and `imdb` fields in the returned document
                projection: {  title: 1, price: 1 ,service_id:1 },
            };

            const result = await serviesCollection.findOne(query ,options);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Car doctors server is running')
})

app.listen(port, () => {
    console.log(`Car doctor server is running on port : ${port}`)
})

// carUser
// T9Ef1GrTqVsmExcY