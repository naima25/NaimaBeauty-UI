import React, { useEffect, useState } from "react";
import api from "../../services/api.config"; // make sure this points to your axios/api setup
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  const [grossRevenue, setGrossRevenue] = useState(0);
  const [avgOrder, setAvgOrder] = useState(0);
  const [trailingYear, setTrailingYear] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [ordersRes, revenueRes] = await Promise.all([
          api.get("/AdminAnalytics/orders-overtime"),
          api.get("/AdminAnalytics/revenue-overtime")
        ]);

        // Calculate Gross Revenue
        const totalRevenue = revenueRes.data.reduce((sum, r) => sum + r.totalRevenue, 0);
        setGrossRevenue(totalRevenue);

        // Calculate Total Orders
        const totalOrders = ordersRes.data.reduce((sum, o) => sum + o.totalOrders, 0);

        // Calculate Average Order
        setAvgOrder(totalOrders > 0 ? totalRevenue / totalOrders : 0);

        // Trailing Year Revenue
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const lastYearRevenue = revenueRes.data
          .filter(r => new Date(r.date) >= oneYearAgo)
          .reduce((sum, r) => sum + r.totalRevenue, 0);
        setTrailingYear(lastYearRevenue);

      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="row g-3">
      <Card title="Gross Revenue" value={`£${grossRevenue.toLocaleString()}`} trend="up" />
      <Card title="Avg Order" value={`£${avgOrder.toFixed(2)}`} trend="up" />
      <Card title="Trailing Year" value={`£${trailingYear.toLocaleString()}`} trend="up" />
    </div>
  );
};

const Card = ({ title, value, trend }) => (
  <div className="col-12 col-md-4">
    <div className="card p-3 border h-100">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h6 className="text-muted">{title}</h6>
          <p className="h4 mb-0">{value}</p>
        </div>
        <span
          className={`badge rounded-pill ${
            trend === "up" ? "bg-success text-light" : "bg-danger text-light"
          } d-flex align-items-center gap-1`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
        </span>
      </div>
    </div>
  </div>
);

// import React, { useEffect, useState } from "react";
// import api from "../../services/api.config"; 
// import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

// export const StatCards = () => {
//   const [grossRevenue, setGrossRevenue] = useState(0);
//   const [avgOrder, setAvgOrder] = useState(0);
//   const [trailingYear, setTrailingYear] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         setLoading(true);
//         const [ordersRes, revenueRes] = await Promise.all([
//           api.get("/AdminAnalytics/orders-overtime"),
//           api.get("/AdminAnalytics/revenue-overtime")
//         ]);

//         const totalRevenue = revenueRes.data.reduce((sum, r) => sum + r.totalRevenue, 0);
//         setGrossRevenue(totalRevenue);

//         const totalOrders = ordersRes.data.reduce((sum, o) => sum + o.totalOrders, 0);
//         setAvgOrder(totalOrders > 0 ? totalRevenue / totalOrders : 0);

//         const oneYearAgo = new Date();
//         oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
//         const lastYearRevenue = revenueRes.data
//           .filter(r => new Date(r.date) >= oneYearAgo)
//           .reduce((sum, r) => sum + r.totalRevenue, 0);
//         setTrailingYear(lastYearRevenue);

//       } catch (err) {
//         console.error("Failed to fetch analytics:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) return <p>Loading stats...</p>;

//   return (
//     <div className="row g-3">
//       <Card title="Gross Revenue" value={`£${grossRevenue.toLocaleString()}`} trend="up" period="All Time" />
//       <Card title="Avg Order" value={`£${avgOrder.toFixed(2)}`} trend="up" period="All Time" />
//       <Card title="Trailing Year" value={`£${trailingYear.toLocaleString()}`} trend="up" period="Trailing Year" />
//     </div>
//   );
// };

// const Card = ({ title, value, trend, period }) => (
//   <div className="col-12 col-md-4">
//     <div className="card p-3 border h-100">
//       <div className="d-flex justify-content-between align-items-start mb-2">
//         <div>
//           <h6 className="text-muted">{title}</h6>
//           <p className="h4 mb-0">{value}</p>
//         </div>
//         <span
//           className={`badge rounded-pill ${
//             trend === "up" ? "bg-success text-light" : "bg-danger text-light"
//           } d-flex align-items-center gap-1`}
//         >
//           {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
//         </span>
//       </div>
//       <p className="text-muted small">{period}</p>
//     </div>
//   </div>
// );

