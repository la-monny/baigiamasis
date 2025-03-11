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

// ADMIN LOGIN – JWT generavimas
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // nekuriu DB, o naudoju hardcodintą admin'ą
  const ADMIN = { username: "admin", password: "admin" };

  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token });
  } else {
    res
      .status(401)
      .json({ error: "Neteisingas vartotojo vardas arba slaptažodis" });
  }
});

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Prieiga draudžiama" });

  jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ error: "Neteisingas arba pasibaigęs tokenas" });
    req.user = decoded;
    next();
  });
};

// Klientų registracija pas meistrą
app.post("/register", async (req, res) => {
  try {
    const { name, phone, master, date, time } = req.body;
    if (!name || !phone || !master || !date || !time) {
      return res.status(400).json({ error: "Visi laukai privalomi" });
    }

    // validacija, ar nėra užimtas laikas
    const existingAppointment = await db
      .collection("appointments")
      .findOne({ master, date, time });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ error: "Šis laikas jau užimtas! Pasirinkite kitą" });
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
app.get("/appointments", verifyToken, async (req, res) => {
  try {
    const appointments = await db.collection("appointments").find().toArray();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Nepavyko gauti duomenų" });
  }
});

// Adminas gali atšaukti registraciją
app.delete("/appointments/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("appointments").deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Registracija atšaukta" });
  } catch (error) {
    res.status(500).json({ error: "Klaida trinant registraciją" });
  }
});

// Adminas gali keisti registracijos duomenis
app.patch("/appointments/:id", verifyToken, async (req, res) => {
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
    const { name, specialty, description, photo } = req.body;
    if (!name || !specialty || !description || !photo) {
      return res.status(400).json({ error: "Visi laukai privalomi" });
    }
    const newMaster = {
      name,
      specialty,
      description: description || "Nėra informacijos",
      photo: photo || "Nėra nuotraukos", // Base64 formato nuotrauka
    };

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
