// "use client";

// import React, { useEffect, useState } from "react";
// import { FiBarChart } from "react-icons/fi";
// import {
//   ResponsiveContainer,
//   BarChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Bar,
//   Cell,
// } from "recharts";
// import api from "../../services/api.config";

// export const TopSellingProducts = () => {
//   const [productsData, setProductsData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [topN, setTopN] = useState(10); // Top 10 default

//   const COLORS = [
//     "#95770dff",
//     "#65d4b1ff",
//     "#1cffffff",
//     "#ff3179ff",
//     "#ff1111ff",
//     "#c56972ff",
//     "#00ff62ff",
//     "#ff9f1aff",
//     "#ffbf00ff",
//     "#6a0572ff",
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await api.get("/AdminAnalytics/top-products");
//         setProductsData(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load top products data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Apply Top N filter
//   useEffect(() => {
//     const data = [...productsData]
//       .sort((a, b) => b.totalQuantitySold - a.totalQuantitySold)
//       .slice(0, topN);
//     setFilteredData(data);
//   }, [productsData, topN]);

//   if (loading) {
//     return (
//       <div
//         className="border rounded p-3 my-3"
//         style={{ marginLeft: "1rem", width: "460px" }}
//       >
//         <div
//           style={{ height: "250px" }}
//           className="d-flex justify-content-center align-items-center"
//         >
//           <p>Loading top products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className="border rounded p-3 my-3"
//         style={{ marginLeft: "1rem", width: "460px" }}
//       >
//         <div
//           style={{ height: "250px" }}
//           className="d-flex justify-content-center align-items-center text-danger"
//         >
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="border rounded p-3 my-3"
//       style={{ marginLeft: "1rem", width: "460px" }}
//     >
//       {/* Title */}
//       <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
//         <FiBarChart /> Top Selling Products
//       </h3>

//       {/* Top N Filter */}
//       <div
//         style={{
//           marginBottom: "1rem",
//           textAlign: "center",
//           display: "flex",
//           justifyContent: "center",
//           gap: "1rem",
//         }}
//       >
//         <select value={topN} onChange={(e) => setTopN(parseInt(e.target.value))}>
//           <option value={3}>Top 3</option>
//           <option value={5}>Top 5</option>
//           <option value={10}>Top 10</option>
//         </select>
//       </div>

//       {/* Horizontal Bar Chart */}
//       <div style={{ width: "100%", height: "250px" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             layout="vertical"
//             data={filteredData}
//             margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
//           >
//             <CartesianGrid stroke="#e4e4e7" />
//             <XAxis type="number" />
//             <YAxis dataKey="productName" type="category" />
//             <Tooltip formatter={(value) => [`${value} Orders`, "Sold"]} />
//             <Bar dataKey="totalQuantitySold">
//               {filteredData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useState } from "react";
import { FiBarChart } from "react-icons/fi";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";
import api from "../../services/api.config";

export const TopSellingProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topN, setTopN] = useState(10); // Top 10 default

  const COLORS = [
    "#95770dff",
    "#65d4b1ff",
    "#1cffffff",
    "#ff3179ff",
    "#ff1111ff",
    "#c56972ff",
    "#00ff62ff",
    "#ff9f1aff",
    "#ffbf00ff",
    "#6a0572ff",
  ];

  // Function to format long names with word wrapping
  const formatLongName = (value) => {
    if (typeof value !== 'string') {
      return value || '';
    }
    
    // Simple word wrapping - just return the string as is
    return value;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/AdminAnalytics/top-products");
        setProductsData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load top products data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply Top N filter
  useEffect(() => {
    const data = [...productsData]
      .sort((a, b) => b.totalQuantitySold - a.totalQuantitySold)
      .slice(0, topN);
    setFilteredData(data);
  }, [productsData, topN]);

  if (loading) {
    return (
      <div
        className="border rounded p-3 my-3"
        style={{ marginLeft: "1rem", width: "460px" }}
      >
        <div
          style={{ height: "350px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <p>Loading top products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="border rounded p-3 my-3"
        style={{ marginLeft: "1rem", width: "460px" }}
      >
        <div
          style={{ height: "350px" }}
          className="d-flex justify-content-center align-items-center text-danger"
        >
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border rounded p-3 my-3"
      style={{ marginLeft: "1rem", width: "460px" }}
    >
      {/* Title */}
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <FiBarChart /> Top Selling Products
      </h3>

      {/* Top N Filter */}
      <div
        style={{
          marginBottom: "1rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <select value={topN} onChange={(e) => setTopN(parseInt(e.target.value))}>
          <option value={3}>Top 3</option>
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>

      {/* Horizontal Bar Chart - Increased height */}
      <div style={{ width: "100%", height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={filteredData}
            margin={{ top: 20, right: 20, left: 150, bottom: 20 }} // Increased left margin
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis type="number" />
            <YAxis 
              dataKey="productName" 
              type="category" 
              tickFormatter={formatLongName}
              width={140} // Increased width for longer names
              tick={{ fontSize: 11, fill: '#333' }}
              interval={0} // This ensures ALL ticks are shown
            />
            <Tooltip 
              formatter={(value) => [`${value} Orders`, "Sold"]}
              labelFormatter={(value) => value}
            />
            <Bar dataKey="totalQuantitySold">
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};