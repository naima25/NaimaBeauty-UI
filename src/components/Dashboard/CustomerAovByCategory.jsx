
// "use client";

// import React, { useEffect, useState } from "react";
// import { FiUsers } from "react-icons/fi";
// import api from "../../services/api.config";
// import {
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Area,
//   AreaChart,
// } from "recharts";

// export const CustomerAovByCategory = () => {
//   const [aovData, setAovData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all"); // all, 7days, 30days
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   useEffect(() => {
//     const fetchAovData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const params = {};
//         if (filter === "7days") {
//           params.startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
//         } else if (filter === "30days") {
//           params.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
//         }
//         const response = await api.get("/AdminAnalytics/aov-by-customer-category", { params });
//         const formatted = response.data.map(item => ({
//           ...item,
//           date: new Date(item.date)
//         }));
//         setAovData(formatted);
//         setFilteredData(formatted);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load AOV data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAovData();
//   }, [filter]);

//   // Apply category filter
//   useEffect(() => {
//     if (categoryFilter === "all") {
//       setFilteredData(aovData);
//     } else {
//       const filtered = aovData.filter(d => d.categoryId.toString() === categoryFilter);
//       setFilteredData(filtered);
//     }
//   }, [categoryFilter, aovData]);

//   if (loading) return <p>Loading AOV data...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   // Prepare categories dynamically for dropdown
//   const categories = Array.from(new Set(aovData.map(d => JSON.stringify({ id: d.categoryId, name: d.categoryName })))).map(s => JSON.parse(s));

//   return (
//     <div className="border rounded p-3" style={{ width: "600px", marginLeft: "20px" }}>
//       <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
//         <FiUsers /> Average Order Value by Category
//       </h3>

//       <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
//         <select value={filter} onChange={e => setFilter(e.target.value)}>
//           <option value="all">All Time</option>
//           <option value="7days">Last 7 Days</option>
//           <option value="30days">Last 30 Days</option>
//         </select>

//         <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
//           <option value="all">All Categories</option>
//           {categories.map(c => (
//             <option key={c.id} value={c.id}>{c.name}</option>
//           ))}
//         </select>
//       </div>

//       <div style={{ width: "100%", height: "350px" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 40, bottom: 40 }}>
//             <CartesianGrid stroke="#e4e4e7" />
//             <XAxis 
//               dataKey="date" 
//               tickFormatter={date => new Date(date).toLocaleDateString()} 
//               label={{ value: "Date", position: "insideBottom", offset: -10, fill: "#000" }}
//               tick={{ fill: "#000" }}
//             />
//             <YAxis 
//               label={{ 
//                 value: "Average Order Value ($)", 
//                 angle: -90, 
//                 position: "insideLeft", 
//                 offset: 10, 
//                 fill: "#000", 
//                 style: { textAnchor: "middle" }
//               }}
//               tick={{ fill: "#000" }}
//             />
//             <Tooltip 
//               labelFormatter={date => new Date(date).toLocaleDateString()} 
//               formatter={value => [`$${value.toFixed(2)}`, "AOV"]}
//             />
//             <Area 
//               type="monotone" 
//               dataKey="averageOrderValue" 
//               stroke="#1e3a8a" 
//               fill="rgba(59, 130, 246, 0.3)" 
//               strokeWidth={2} 
//               activeDot={{ r: 6, fill: "#1e3a8a" }}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import api from "../../services/api.config";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export const CustomerAovByCategory = () => {
  const [aovData, setAovData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchAovData = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {};
        if (filter === "7days") {
          params.startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        } else if (filter === "30days") {
          params.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
        }
        const response = await api.get("/AdminAnalytics/aov-by-customer-category", { params });
        const formatted = response.data.map(item => ({
          ...item,
          date: new Date(item.date)
        }));
        setAovData(formatted);
        setFilteredData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load AOV data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAovData();
  }, [filter]);

  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredData(aovData);
    } else {
      const filtered = aovData.filter(d => d.categoryId.toString() === categoryFilter);
      setFilteredData(filtered);
    }
  }, [categoryFilter, aovData]);

  if (loading) return <p>Loading AOV data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const categories = Array.from(
    new Set(aovData.map(d => JSON.stringify({ id: d.categoryId, name: d.categoryName })))
  ).map(s => JSON.parse(s));

  return (
    <div className="border rounded p-3 h-100">
      <h3 className="text-center mb-3">
        <FiUsers /> Average Order Value by Category
      </h3>

      {/* Filters */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>

        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div style={{ width: "100%", height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 40, bottom: 40 }}>
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis 
              dataKey="date"
              tickFormatter={date => new Date(date).toLocaleDateString()}
            />
            <YAxis 
              label={{ value: "Average Order Value ($)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip 
              labelFormatter={date => new Date(date).toLocaleDateString()} 
              formatter={value => [`$${value.toFixed(2)}`, "AOV"]}
            />
            <Area 
              type="monotone" 
              dataKey="averageOrderValue" 
              stroke="#1e3a8a" 
              fill="rgba(59, 130, 246, 0.3)" 
              strokeWidth={2} 
              activeDot={{ r: 6, fill: "#1e3a8a" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
