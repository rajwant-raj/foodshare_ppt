import { motion } from "framer-motion";

export default function VolunteerLogin() {

  const login = () => {
    alert("Volunteer Logged in ✅");

    // 👉 REDIRECT HERE
    window.location.href = "/volunteer-dashboard";
  };

  return (
    <motion.div
      className="auth-card orange"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Volunteer Login</h2>

      <input placeholder="Volunteer ID" />
      <input type="password" placeholder="Password" />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={login}
      >
        Login
      </motion.button>
    </motion.div>
  );
}