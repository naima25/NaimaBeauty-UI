"use client";

import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import api from "../../services/api.config";

export const OrdersOverTime = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // default filter

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/AdminAnalytics/orders-overtime");
        const formattedData = response.data.map((item) => ({
          date: item.date.split("T")[0], // strip time
          orders: item.totalOrders,
        }));
        setOrdersData(formattedData);
        setFilteredData(formattedData); // initially show all
      } catch (err) {
        console.error(err);
        setError("Failed to load orders data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersData();
  }, []);

  // Filter data whenever `filter` changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredData(ordersData);
    } else {
      const days = filter === "7days" ? 7 : 30;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const filtered = ordersData.filter((d) => new Date(d.date) >= cutoff);
      setFilteredData(filtered);
    }
  }, [filter, ordersData]);

  // Y-axis ticks rounded to nearest 5 orders
  const yTicks = () => {
    if (filteredData.length === 0) return [];
    const orders = filteredData.map((d) => d.orders);
    const min = Math.min(...orders);
    const max = Math.max(...orders);
    const padding = (max - min) * 0.1;
    const roundedMax = Math.ceil((max + padding) / 5) * 5;
    const roundedMin = Math.floor(Math.max(0, min - padding) / 5) * 5;
    const step = (roundedMax - roundedMin) / 5;
    return Array.from({ length: 6 }, (_, i) => Math.round(roundedMin + step * i));
  };

  if (loading) {
    return (
      <div className="border rounded p-3" style={{ marginLeft: "20px" }}>
        <div
          style={{ height: "250px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <p>Loading orders data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded p-3" style={{ marginLeft: "20px" }}>
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
    <div className="border rounded p-3" style={{ width: "460px", marginLeft: "20px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <FiShoppingCart /> Orders Over Time
      </h3>

      {/* Filter dropdown */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      <div style={{ width: "100%", height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis dataKey="date" />
            <YAxis ticks={yTicks()} />
            <Tooltip formatter={(value) => [value, "Orders"]} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              fill="#93c5fd"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "#2563eb" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
