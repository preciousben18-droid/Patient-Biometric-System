import tkinter as tk
from tkinter import filedialog, messagebox
import json
import random
import os
from PIL import Image, ImageTk

# File to store data
DATA_FILE = "patients.json"

# Load existing data
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r") as f:
        patients = json.load(f)
else:
    patients = {}

# Generate Fingerprint ID
def generate_id():
    fid = "FP" + str(random.randint(1000, 9999))
    fingerprint_id.set(fid)

# Upload Photo
def upload_photo():
    file_path = filedialog.askopenfilename()
    photo_path.set(file_path)

# Save Patient
def register_patient():
    name = name_entry.get()
    age = age_entry.get()
    gender = gender_var.get()
    fid = fingerprint_id.get()
    photo = photo_path.get()

    if not name or not age or not fid:
        messagebox.showerror("Error", "Fill all required fields!")
        return

    patients[fid] = {
        "name": name,
        "age": age,
        "gender": gender,
        "photo": photo
    }

    with open(DATA_FILE, "w") as f:
        json.dump(patients, f)

    messagebox.showinfo("Success", "Patient Registered!")

# Identify Patient
def identify_patient():
    fid = fingerprint_id.get()

    if fid in patients:
        data = patients[fid]

        result_label.config(
            text=f"Name: {data['name']}\nAge: {data['age']}\nGender: {data['gender']}"
        )

        # Show image
        img = Image.open(data["photo"])
        img = img.resize((100, 100))
        img = ImageTk.PhotoImage(img)

        image_label.config(image=img)
        image_label.image = img

    else:
        messagebox.showerror("Error", "Patient not found!")

# GUI
root = tk.Tk()
root.title("Patient Registration System")
root.geometry("400x500")

# Variables
fingerprint_id = tk.StringVar()
photo_path = tk.StringVar()
gender_var = tk.StringVar(value="Male")

# Inputs
tk.Label(root, text="Name").pack()
name_entry = tk.Entry(root)
name_entry.pack()

tk.Label(root, text="Age").pack()
age_entry = tk.Entry(root)
age_entry.pack()

tk.Label(root, text="Gender").pack()
tk.OptionMenu(root, gender_var, "Male", "Female").pack()

tk.Button(root, text="Upload Passport", command=upload_photo).pack()

tk.Label(root, text="Fingerprint ID").pack()
tk.Entry(root, textvariable=fingerprint_id).pack()

tk.Button(root, text="Generate Fingerprint ID", command=generate_id).pack()

tk.Button(root, text="Register Patient", command=register_patient).pack()

tk.Button(root, text="Identify Patient", command=identify_patient).pack()

# Result display
result_label = tk.Label(root, text="")
result_label.pack()

image_label = tk.Label(root)
image_label.pack()

root.mainloop() 