const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middile wears start
app.use(cors());
app.use(express.json());
// middile wears end

// mongo DB connection start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const photosCollection = client.db("photoHome").collection("photosData");

app.get("/photos", async (req, res) => {
  const query = {};
  const cursor = photosCollection.find(query);
  const photos = await cursor.toArray();
  res.send(photos);
});

// mongo DB connection end

app.get("/", (req, res) => {
  res.send("photo home server is running");
});

app.listen(port, () => {
  console.log(`photo home server is running on port ${port}`);
});
