import { useState, useRef } from "react";
import { motion } from "framer-motion";

// 🖼️ Local Images
import biryani from "../assets/veg-biryani.jpg";
import rice from "../assets/rice.jpg";
import dal from "../assets/dal.jpg";
import chapati from "../assets/chapati.jpg";

export default function Donate() {
  const [food, setFood] = useState("");
  const [customFood, setCustomFood] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("Plate");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");

  const videoRef = useRef(null);

  // 🧠 Food → Image Mapping
  const foodImages = {
    "Veg Biryani": biryani,
    "Rice": rice,
    "Dal": dal,
    "Chapati": chapati
  };

  // 🍱 Handle Food Selection
  const handleFoodChange = (e) => {
    const selected = e.target.value;
    setFood(selected);

    if (foodImages[selected]) {
      setImage(foodImages[selected]);
    } else {
      setImage(null);
    }
  };

  // 📍 Get Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = `${pos.coords.latitude}, ${pos.coords.longitude}`;
      setLocation(loc);
    });
  };

  // 📂 Upload Image
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // 📸 Start Camera
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  // 📸 Capture Photo
  const capture = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);
    setImage(canvas.toDataURL());
  };

  // 🚀 Submit Donation
const submit = async () => {
  try {
    // ✅ Validation
    if (!food) {
      alert("Select food");
      return;
    }

    if (!qty) {
      alert("Enter quantity");
      return;
    }

    if (!location) {
      alert("Click Detect Location first");
      return;
    }

    const finalFood = food === "Other" ? customFood : food;

    if (!finalFood) {
      alert("Enter food name");
      return;
    }

    const form = new FormData();

    // 🔥 EXACT SAME NAMES AS BACKEND
    form.append("food", finalFood);
    form.append("qty", String(qty)); // keep as string for FormData
    form.append("location", location);

    const res = await fetch("http://127.0.0.1:8000/donate", {
      method: "POST",
      body: form
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(err);
      alert("Backend error ❌");
      return;
    }

    alert("Donation submitted ✅");

  } catch (err) {
    console.error(err);
    alert("Error submitting donation ❌");
  }
};

  return (
    <motion.div
      className="donate-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="donate-title">Donate Food</h2>

      <motion.div
        className="donate-card"
        initial={{ y: 40 }}
        animate={{ y: 0 }}
      >

        {/* 🍱 FOOD */}
        <select value={food} onChange={handleFoodChange}>
          <option value="">Select Food</option>
          <option>Veg Biryani</option>
          <option>Rice</option>
          <option>Dal</option>
          <option>Chapati</option>
          <option>Other</option>
        </select>

        {/* 🔥 OTHER INPUT */}
        {food === "Other" && (
          <input
            placeholder="Enter food name"
            value={customFood}
            onChange={(e) => setCustomFood(e.target.value)}
          />
        )}

        {/* 📸 CAMERA */}
        <button className="btn secondary" onClick={startCamera}>
          📸 Use Camera
        </button>

        <video ref={videoRef} autoPlay className="video" />

        <button className="btn outline" onClick={capture}>
          Capture
        </button>

        {/* 📂 FILE */}
        <input type="file" onChange={handleFile} />

        {/* 🖼️ PREVIEW */}
        {image && (
          <motion.img
            src={image}
            alt="preview"
            className="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          />
        )}

        {/* 📦 QUANTITY */}
        <input
          placeholder="Enter quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        {/* 📏 UNIT */}
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option>Plate</option>
          <option>Kg</option>
          <option>Packets</option>
        </select>

        {/* 📍 LOCATION */}
        <button className="btn primary" onClick={getLocation}>
          📍 Detect Location
        </button>

        {location && <p className="location">{location}</p>}

        {/* 🚀 SUBMIT */}
        <button className="btn donate" onClick={submit}>
          Donate
        </button>

      </motion.div>
    </motion.div>
  );
}