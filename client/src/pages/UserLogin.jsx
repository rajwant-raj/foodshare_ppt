import { useState } from "react";
import { motion } from "framer-motion";

export default function UserLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const login = () => {
    // 🔥 Demo credentials
    if (u === "demo" && p === "1234") {
      localStorage.setItem("user", "demo");

      alert("Demo Login Successful 🚀");
      window.location.href = "/user-dashboard";
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <motion.div
      className="auth-card green"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>User Login</h2>

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

      <p style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        Demo: <b>demo / 1234</b>
      </p>
    </motion.div>
  );
}