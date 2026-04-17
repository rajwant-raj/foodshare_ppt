import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// 🔝 Components
import Navbar from "./components/Navbar";
import SwipeBack from "./components/SwipeBack";

import { useState, useEffect } from "react";
import PageLoader from "./components/PageLoader";


// 📄 Pages
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";


// 🔐 Role-based login pages
import UserLogin from "./pages/UserLogin";
import NgoLogin from "./pages/NgoLogin";
import VolunteerLogin from "./pages/VolunteerLogin";

/* 🔥 App Content (inside router) */
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // animation duration

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <SwipeBack />
      <Navbar />

      {loading && <PageLoader />}

      <motion.div
  key={location.pathname}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/ngo" element={<NgoLogin />} />
          <Route path="/login/volunteer" element={<VolunteerLogin />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        </Routes>
      </motion.div>
    </>
  );
}

/* 🚀 Root App */
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}