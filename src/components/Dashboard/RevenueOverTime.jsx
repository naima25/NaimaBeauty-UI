"use client";

import React, { useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import api from "../../services/api.config";

export const RevenueOverTime = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // default filter

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/AdminAnalytics/revenue-overtime");

        // Format date to 'YYYY-MM-DD'
        const formattedData = response.data.map((item) => ({
          date: item.date.split("T")[0], // strip time part
          revenue: item.totalRevenue,
        }));

        setRevenueData(formattedData);
        setFilteredData(formattedData); // initially show all
      } catch (err) {
        console.error(err);
        setError("Failed to load revenue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  // Filter data whenever `filter` changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredData(revenueData);
    } else {
      const days = filter === "7days" ? 7 : 30;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const filtered = revenueData.filter(
        (d) => new Date(d.date) >= cutoff
      );
      setFilteredData(filtered);
    }
  }, [filter, revenueData]);

  // Calculate custom Y-axis ticks rounded to nearest 100
  const yTicks = () => {
    if (filteredData.length === 0) return [];
    const revenues = filteredData.map((d) => d.revenue);
    const min = Math.min(...revenues);
    const max = Math.max(...revenues);
    const padding = (max - min) * 0.1;
    const roundedMax = Math.ceil((max + padding) / 100) * 100;
    const roundedMin = Math.floor(Math.max(0, min - padding) / 100) * 100;
    const step = (roundedMax - roundedMin) / 5; // 5 ticks
    return Array.from({ length: 6 }, (_, i) =>
      Math.round(roundedMin + step * i)
    );
  };

  if (loading) {
    return (
      <div className="border rounded p-3">
        <div
          style={{ height: "250px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <p>Loading revenue data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded p-3">
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
    <div className="border rounded p-3" style={{ width: "460px" }}>
      {/* Title centered */}
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <FiDollarSign /> Revenue Over Time
      </h3>

      {/* Filter dropdown */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `£${value}`} ticks={yTicks()} />
            <Tooltip formatter={(value) => [`£${value}`, "Revenue"]} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6, fill: "#059669" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
