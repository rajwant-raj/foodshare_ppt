import { useEffect, useState } from "react";
import { getDonations, updateStatus } from "../services/api";
import { motion } from "framer-motion";

import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDonations().then(res => setData(res.data));
  }, []);

  // 🔍 Separate data
  const pending = data.filter(d => d.status === "Pending");
  const completed = data.filter(d => d.status === "Delivered");

  // 📊 Chart Data
  const pieData = [
    { name: "Pending", value: pending.length },
    { name: "Completed", value: completed.length }
  ];

  const barData = [
    { name: "Pending", count: pending.length },
    { name: "Completed", count: completed.length }
  ];

  const COLORS = ["#ff6d00", "#00c853"];

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* 🔥 SUMMARY CARDS */}
      <div className="grid">
        <div className="card">
          <h3>Total Donations</h3>
          <h1>{data.length}</h1>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <h1>{pending.length}</h1>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <h1>{completed.length}</h1>
        </div>
      </div>

      {/* 📊 PIE CHART */}
      <div className="card">
        <h3>Donation Status Overview</h3>

        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={100}
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* 📈 BAR CHART */}
      <div className="card">
        <h3>Donation Comparison</h3>

        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#00c853" />
        </BarChart>
      </div>

      {/* 📦 PENDING */}
      <h2>Pending Donations</h2>
      <div className="grid">
        {pending.map((d, i) => (
          <motion.div
            key={i}
            className="card"
            whileHover={{ scale: 1.05 }}
          >
            <h3>{d.food}</h3>
            <p>{d.location}</p>
            <button onClick={() => updateStatus(i)}>
              Mark Delivered
            </button>
          </motion.div>
        ))}
      </div>

      {/* ✅ COMPLETED */}
      <h2>Completed Donations</h2>
      <div className="grid">
        {completed.map((d, i) => (
          <motion.div key={i} className="card">
            <h3>{d.food}</h3>
            <p>{d.location}</p>
            <p style={{ color: "green" }}>Delivered</p>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
}

<button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
>
  Logout
</button>