const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://preciousben18_db_user:<Royal2024>@cluster0.ctyo0ho.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    condition: String,
    fingerprint: String
});

const Patient = mongoose.model("Patient", patientSchema);
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

let patients = [];

// register patient
app.post("/register", async (req, res) => {
    const patient = req.body;

    const newPatient = new Patient(patient);
    await newPatient.save();

    res.json({ message: "Patient saved to database" });
});

// get all patients

app.get("/identify", async (req, res) => {
    const name = req.query.name;

    const result = await Patient.findOne({ name: name });

    if (result) {
        res.json(result);
    } else {
        res.json({ message: "Patient not found" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});