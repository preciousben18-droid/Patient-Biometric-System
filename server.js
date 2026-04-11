const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

let patients = [];

// register patient
app.post("/register", (req, res) => {
    console.log("Request received:", req.body); // 👈 debug

    const { name, age, gender, fingerprint, photo } = req.body;

    const patient = {
        id: patients.length + 1,
        name,
        age,
        gender,
        fingerprint,
        photo
    };

    patients.push(patient);

    console.log("Saved:", patient);

    res.json({ message: "Patient saved successfully" });
});

// get all patients
app.get("/patients", (req, res) => {
    res.json(patients);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});