"use client";

import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/api.config";

export const OrdersByCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = [
    "#95770dff",
    "#65d4b1ff",
    "#1cffffff",
    "#ff3179ff",
    "#ff1111ff",
    "#c56972ff",
    "#00ff62ff",
  ];

  // Fetch category data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/AdminAnalytics/orders-by-category");
        setCategoryData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="border rounded p-3 my-3">
        <div
          style={{ height: "250px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <p>Loading category data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded p-3 my-3">
        <div
          style={{ height: "250px" }}
          className="d-flex justify-content-center align-items-center text-danger"
        >
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded p-3 my-3" style={{ width: "460px" }}>
      {/* Title */}
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <FiBarChart2 /> Orders By Category
      </h3>

      {/* Bar Chart */}
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="categoryName"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [value, value === 1 ? "Order" : "Orders"]}
            />
            <Bar dataKey="totalQuantitySold">
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
