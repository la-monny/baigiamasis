require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

let db;
MongoClient.connect(MONGO_URL)
  .then((client) => {
    db = client.db("beautysalon");
    console.log("Prisijungta prie MongoDB");
  })
  .catch((err) => console.error("DB klaida:", err));

// Klientų registracija pas meistrą
app.post("/register", async (req, res) => {
  try {
    const { name, phone, master, date, time } = req.body;
    if (!name || !phone || !master || !date || !time) {
      return res.status(400).json({ error: "Visi laukai privalomi" });
    }
    const newAppointment = { name, phone, master, date, time };
    const result = await db
      .collection("appointments")
      .insertOne(newAppointment);
    res
      .status(201)
      .json({ message: "Registracija sėkminga", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Įvyko klaida registruojantis" });
  }
});

// Adminas mato visas registracijas
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await db.collection("appointments").find().toArray();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Nepavyko gauti duomenų" });
  }
});

// Adminas gali atšaukti registraciją
app.delete("/appointments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("appointments").deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Registracija atšaukta" });
  } catch (error) {
    res.status(500).json({ error: "Klaida trinant registraciją" });
  }
});

// Adminas gali keisti registracijos duomenis
app.patch("/appointments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    await db
      .collection("appointments")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    res.json({ message: "Registracija atnaujinta" });
  } catch (error) {
    res.status(500).json({ error: "Nepavyko atnaujinti registracijos" });
  }
});

// API testavimui
app.get("/", (req, res) => res.send("BeautySalon API veikia"));

app.listen(PORT, () =>
  console.log(`Serveris veikia: http://localhost:${PORT}`)
);
