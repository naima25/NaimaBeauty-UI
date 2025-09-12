

// "use client";

// import React, { useEffect, useState } from "react";
// import { FiBarChart2 } from "react-icons/fi";
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

// export const OrdersOverTime = () => {
//   const [ordersData, setOrdersData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [timeFilter, setTimeFilter] = useState("all"); // all, 7days, 30days
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   // Fetch orders data
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const params = {};
//         if (timeFilter === "7days") {
//           params.startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
//         } else if (timeFilter === "30days") {
//           params.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
//         }

//         const response = await api.get("/AdminAnalytics/orders-overtime", { params });
//         // Convert dates to JS Date objects
//         const formatted = response.data.map(item => ({ ...item, date: new Date(item.date) }));
//         setOrdersData(formatted);
//         setFilteredData(formatted);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load orders data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [timeFilter]);

//   // Apply category filter
//   useEffect(() => {
//     if (categoryFilter === "all") {
//       setFilteredData(ordersData);
//     } else {
//       const filtered = ordersData.filter(d => d.categoryId?.toString() === categoryFilter);
//       setFilteredData(filtered);
//     }
//   }, [categoryFilter, ordersData]);

//   if (loading) return <p>Loading orders data...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   // Prepare unique categories for dropdown
//   const categories = Array.from(
//     new Set(
//       ordersData
//         .filter(d => d.categoryId != null)
//         .map(d => JSON.stringify({ id: d.categoryId, name: d.categoryName }))
//     )
//   ).map(s => JSON.parse(s));

//   return (
//     <div className="border rounded p-3" style={{ width: "600px", marginLeft: "20px" }}>
//       <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
//         <FiBarChart2 /> Orders Over Time
//       </h3>

//       {/* Filters */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
//         <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
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

//       {/* Chart */}
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
//               allowDecimals={false} 
//               label={{ 
//                 value: "Orders", 
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
//               formatter={value => [value, "Orders"]}
//             />
//             <Area 
//               type="monotone" 
//               dataKey="totalOrders" 
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
import { FiBarChart2 } from "react-icons/fi";
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

export const OrdersOverTime = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [timeFilter, setTimeFilter] = useState("all"); // all, 7days, 30days
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (timeFilter === "7days") {
          params.startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        } else if (timeFilter === "30days") {
          params.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
        }

        const response = await api.get("/AdminAnalytics/orders-overtime", { params });
        const formatted = response.data.map(item => ({ ...item, date: new Date(item.date) }));
        setOrdersData(formatted);
        setFilteredData(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [timeFilter]);

  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredData(ordersData);
    } else {
      const filtered = ordersData.filter(d => d.categoryId?.toString() === categoryFilter);
      setFilteredData(filtered);
    }
  }, [categoryFilter, ordersData]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading orders data...</p>
    </div>
  );
  if (error) return <p className="text-danger">{error}</p>;

  const categories = Array.from(
    ordersData
      .filter(d => d.categoryId != null)
      .reduce((map, d) => {
        if (!map.has(d.categoryId)) {
          map.set(d.categoryId, { id: d.categoryId, name: d.categoryName });
        }
        return map;
      }, new Map())
      .values()
  );

  return (
    <div className="border rounded p-3 h-100">
      <h3 className="text-center mb-3">
        <FiBarChart2 /> Orders Over Time
      </h3>

      {/* Filters */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
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

      {/* Chart */}
      <div style={{ width: "100%", height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis 
              dataKey="date" 
              tickFormatter={date => new Date(date).toLocaleDateString()} 
              label={{ value: "Date", position: "insideBottom", offset: -10, fill: "#000" }}
              tick={{ fill: "#000" }}
            />
            <YAxis 
              allowDecimals={false} 
              label={{ 
                value: "Orders", 
                angle: -90, 
                position: "insideLeft", 
                offset: 10, 
                fill: "#000", 
                style: { textAnchor: "middle" }
              }}
              tick={{ fill: "#000" }}
            />
            <Tooltip 
              labelFormatter={date => new Date(date).toLocaleDateString()} 
              formatter={value => [value, "Orders"]}
            />
            <Area 
              type="monotone" 
              dataKey="totalOrders" 
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
