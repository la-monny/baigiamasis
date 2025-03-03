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

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Neteisingas ID formatas" });
    }

    const updateData = req.body;

    // pašalinam `_id`, kad jo nebandytų atnaujinti
    delete updateData._id;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({ error: "Nėra duomenų atnaujinti" });
    }

    const result = await db
      .collection("appointments")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Nepavyko atnaujinti registracijos" });
    }

    res.json({ message: "Registracija atnaujinta sėkmingai" });
  } catch (error) {
    console.error("Serverio klaida:", error);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// Pridėti meistrą
app.post("/masters", async (req, res) => {
  try {
    const { name, specialty } = req.body;
    if (!name || !specialty) {
      return res.status(400).json({ error: "Visi laukai privalomi" });
    }
    const newMaster = { name, specialty };
    await db.collection("masters").insertOne(newMaster);
    res.status(201).json({ message: "Meistras pridėtas" });
  } catch (error) {
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// Gauti visus meistrus
app.get("/masters", async (req, res) => {
  try {
    const masters = await db.collection("masters").find().toArray();
    res.json(masters);
  } catch (error) {
    res.status(500).json({ error: "Nepavyko gauti meistrų" });
  }
});

// Ištrinti meistrą
app.delete("/masters/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("masters").deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Meistras pašalintas" });
  } catch (error) {
    res.status(500).json({ error: "Nepavyko ištrinti meistro" });
  }
});

app.listen(PORT, () =>
  console.log(`Serveris veikia: http://localhost:${PORT}`)
);
