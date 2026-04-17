import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function NgoDashboard() {

  const ngoList = [
    {
      name: "People's Science Institute",
      distance: "6.8 km",
      img: "https://images.unsplash.com/photo-1593113630400-ea4288922497",
      desc: "Works on sustainable development and community welfare."
    },
    {
      name: "Goonj (Dehradun)",
      distance: "8.2 km",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      desc: "Clothing and food distribution NGO."
    }
  ];

  const chartData = [
    { name: "Accepted", value: 8 },
    { name: "Pending", value: 4 }
  ];

  const COLORS = ["#00c853", "#ff6d00"];

  return (
    <div className="container">

      <h2>🏢 NGO Dashboard</h2>

      {/* 🔥 FIND NGO BUTTON */}
      <motion.div
        className="ngo-find-card"
        whileHover={{ scale: 1.05 }}
      >
        📍 Find Nearby NGOs
      </motion.div>

      {/* 📍 NGO LIST */}
      {ngoList.map((ngo, i) => (
        <motion.div
          key={i}
          className="ngo-card"
          whileHover={{ scale: 1.02 }}
        >
          <h3>📍 {ngo.name}</h3>
          <p>{ngo.distance} away</p>

          <img src={ngo.img} alt="ngo" />

          <p>{ngo.desc}</p>

          <button>Accept Donation</button>
        </motion.div>
      ))}

      {/* 📊 CHART */}
      <div className="card">
        <h3>Donations Overview</h3>

        <PieChart width={300} height={300}>
          <Pie data={chartData} dataKey="value" outerRadius={100}>
            {chartData.map((e, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* ➕ REQUEST */}
      <button className="action-btn">Request Donation</button>

    </div>
  );
}