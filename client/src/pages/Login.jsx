import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const roles = [
    { name: "User", path: "/login/user", color: "#00c853" },
    { name: "NGO", path: "/login/ngo", color: "#2979ff" },
    { name: "Volunteer", path: "/login/volunteer", color: "#ff6d00" }
  ];

  return (
    <div className="login-container">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Choose Login 
      </motion.h2>

      <div className="login-grid">
        {roles.map((role, i) => (
          <motion.div
            key={i}
            className="login-card"
            style={{ borderTop: `4px solid ${role.color}` }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(role.path)}
          >
            <h3>{role.name} Login </h3>
            {/* <p>Login as {role.name}</p> */}
          </motion.div>
        ))}
      </div>

    </div>
  );
}