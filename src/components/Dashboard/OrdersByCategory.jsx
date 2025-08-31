
// "use client";

// import React, { useEffect, useState } from "react";
// import { FiPieChart } from "react-icons/fi";
// import api from "../../services/api.config";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// export const OrdersByCategory = () => {
//   const [categoryData, setCategoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState("all"); // all, 7days, 30days

//   const COLORS = ["#95770d", "#65d4b1", "#1cffffff", "#ff3179", "#ff1111", "#c56972", "#00ff62"];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const params = {};
//         const now = new Date();

//         if (timeFilter === "7days") {
//           params.startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
//         } else if (timeFilter === "30days") {
//           params.startDate = new Date(now.setDate(now.getDate() - 30)).toISOString();
//         }

//         const response = await api.get("/AdminAnalytics/orders-by-category", { params });
//         setCategoryData(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load category data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [timeFilter]);

//   if (loading) {
//     return (
//       <div className="border rounded p-3 my-3">
//         <div style={{ height: "250px" }} className="d-flex justify-content-center align-items-center">
//           <p>Loading category data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="border rounded p-3 my-3">
//         <div style={{ height: "250px" }} className="d-flex justify-content-center align-items-center text-danger">
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="border rounded p-3 my-3" style={{ width: "500px" }}>
//       {/* Title */}
//       <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
//         <FiPieChart /> Orders By Category
//       </h3>

//       {/* Time Filter */}
//       <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", gap: "1rem" }}>
//         <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
//           <option value="all">All Time</option>
//           <option value="7days">Last 7 Days</option>
//           <option value="30days">Last 30 Days</option>
//         </select>
//       </div>

//       {/* Pie Chart */}
//       <div style={{ width: "100%", height: "300px" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={categoryData}
//               dataKey="totalQuantitySold"
//               nameKey="categoryName"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               label
//             >
//               {categoryData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip formatter={value => [value, "Orders"]} />
//             <Legend verticalAlign="bottom" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { FiPieChart } from "react-icons/fi";
import api from "../../services/api.config";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const OrdersByCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all"); // all, 7days, 30days

  const COLORS = ["#95770d", "#65d4b1", "#ff7f0e", "#ff3179", "#ff1111", "#c56972", "#00ff62"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        const now = new Date();

        if (timeFilter === "7days") {
          params.startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
        } else if (timeFilter === "30days") {
          params.startDate = new Date(now.setDate(now.getDate() - 30)).toISOString();
        }

        const response = await api.get("/AdminAnalytics/orders-by-category", { params });
        setCategoryData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeFilter]);

  if (loading) {
    return (
      <div className="border rounded p-3 h-100 d-flex justify-content-center align-items-center">
        <p>Loading category data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded p-3 h-100 d-flex justify-content-center align-items-center text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="border rounded p-3 h-100">
      <h3 className="text-center mb-3">
        <FiPieChart /> Orders By Category
      </h3>

      {/* Time Filter */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      {/* Pie Chart */}
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="totalQuantitySold"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={value => [value, "Orders"]} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
