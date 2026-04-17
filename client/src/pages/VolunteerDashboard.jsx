import { useState } from "react";
import { motion } from "framer-motion";

export default function VolunteerLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const login = () => {
    if (u === "vol" && p === "1234") {
      localStorage.setItem("role", "volunteer");

      alert("Volunteer Login Successful 🤝");
      window.location.href = "/volunteer-dashboard";
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <motion.div
      className="auth-card orange"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Volunteer Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setU(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setP(e.target.value)}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={login}
      >
        Login
      </motion.button>

      <p style={{ fontSize: "12px", marginTop: "10px" }}>
        Demo: <b>vol / 1234</b>
      </p>
    </motion.div>
  );
}