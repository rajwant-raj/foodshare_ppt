import { useState } from "react";
import { motion } from "framer-motion";

export default function NgoLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const login = () => {
    if (u === "ngo" && p === "1234") {
      localStorage.setItem("role", "ngo");

      alert("NGO Login Successful 🏢");
      window.location.href = "/ngo-dashboard";
    } else {
      alert("Invalid NGO credentials ❌");
    }
  };

  return (
    <motion.div
      className="auth-card blue"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>NGO Login</h2>

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
        Demo: <b>ngo / 1234</b>
      </p>
    </motion.div>
  );
}