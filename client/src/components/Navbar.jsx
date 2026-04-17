import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { path: "/", name: "Home" },
    { path: "/donate", name: "Donate" },
    { path: "/dashboard", name: "Dashboard" },
    { path: "/map", name: "Map" },
    { path: "/login", name: "Login" }
  ];

  return (
    <motion.div
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 🔥 Animated Logo */}
      <motion.h2
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="logo"
      >
        🍱 FoodShare
      </motion.h2>

      {/* 🔗 Links */}
      <div className="nav-links">
        {links.map((link) => (
          <motion.div
            key={link.path}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="nav-item"
          >
            <Link to={link.path}>
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="active-pill"
                  className="active-pill"
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}