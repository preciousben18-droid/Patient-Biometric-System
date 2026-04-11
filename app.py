from PIL import Image, ImageTk

def identify_patient():
    pid = fingerprint_id.get()

    if pid in patients:
        data = patients[pid]

        name_var.set(data["name"])
        age_var.set(data["age"])
        gender_var.set(data["gender"])

        # Load image
        img = Image.open(data["image"])
        img = img.resize((120, 120))
        photo = ImageTk.PhotoImage(img)

        image_label.config(image=photo)
        image_label.image = photo  # 🔥 VERY IMPORTANT (keeps reference)

    else:
        messagebox.showerror("Error", "Patient not found")python app.py