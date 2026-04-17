import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDonations } from "../services/api";


import {
  PieChart, Pie, Cell, Tooltip
} from "recharts";

export default function UserDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDonations().then(res => {
      // 🔥 For demo: assume all donations belong to user
      setData(res.data);
    });
  }, []);

  useEffect(() => {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "/login";
  }
}, []);

  // 📊 Group by location
  const locationMap = {};

  data.forEach(d => {
    locationMap[d.location] = (locationMap[d.location] || 0) + 1;
  });

  const chartData = Object.keys(locationMap).map(loc => ({
    name: loc,
    value: locationMap[loc]
  }));

  const COLORS = ["#00c853", "#2979ff", "#ff6d00", "#aa00ff"];

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>👤 My Donations</h2>

      {/* 📊 Chart */}
      <div className="card">
        <h3>Total Donation </h3>

        <PieChart width={300} height={300}>
          <Pie data={chartData} dataKey="value" outerRadius={100}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* 📦 Donation History */}
      <h3>Donation History</h3>

      <div className="grid">
        {data.map((d, i) => (
          <motion.div
            key={i}
            className="card"
            whileHover={{ scale: 1.05 }}
          >
            <h4>{d.food}</h4>
            <p><b>Location:</b> {d.location}</p>
            <p><b>Status:</b> {d.status}</p>
            <p><b>Freshness:</b> {d.freshness}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}