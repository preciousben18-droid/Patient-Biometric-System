let fingerprintData = null;

function captureFingerprint() {
    console.log("Generating fingerprint...");

    fingerprintData = "FP-" + Math.random().toString(36).substring(2, 10);

    document.getElementById("fingerprintStatus").innerText =
        "Fingerprint ID: " + fingerprintData;
}

async function registerPatient() {
    console.log("Register button clicked");

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;

    const photoInput = document.getElementById("photo");
    const photo = photoInput.files[0];

    console.log(name, age, gender, fingerprintData, photo);

    if (!name || !age || !gender || !fingerprintData || !photo) {
        alert("Fill all fields and generate fingerprint");
        return;
    }

    const reader = new FileReader();

    reader.onload = async function () {
        const base64Image = reader.result;

        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    age,
                    gender,
                    fingerprint: fingerprintData,
                    photo: base64Image
                })
            });

            const data = await res.json();
            console.log("Saved:", data);

            alert("Patient registered successfully!");
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    };

    reader.readAsDataURL(photo);
}