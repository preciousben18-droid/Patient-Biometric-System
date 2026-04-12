const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // adjust path if needed

mongoose.connect("YOUR_MONGO_URL");

async function createAdmin() {
    const existing = await User.findOne({ username: "admin" });

    if (existing) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
        username: "admin",
        password: hashedPassword,
        role: "admin"
    });

    console.log("Admin user created successfully");
    process.exit();
}

createAdmin();
