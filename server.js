const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

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
app.post("/register", auth, async (req, res) => {
    const patient = req.body;

    const newPatient = new Patient(patient);
    await newPatient.save();

    res.json({ message: "Patient saved to database" });
});

// get all patients

app.get("/identify", auth, async (req, res) => {
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
const ADMIN_USERNAME = "admin";

// hashed version of password: 123456
const ADMIN_PASSWORD = "$2b$10$QeY7vXz6k3zKzYfZQeY7uO8uQyX3k3zKzYfZQeY7uO8uQyX3k3zK";
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) {
        return res.json({ message: "Invalid username" });
    }

    const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD);

    if (!validPassword) {
        return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({ username }, "SECRET_KEY");

    res.json({ token });
});
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token, "SECRET_KEY");
        req.user = verified;
        next();
    } catch {
        res.json({ message: "Invalid token" });
    }
}
