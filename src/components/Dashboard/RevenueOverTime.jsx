"use client";

import React, { useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
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

export const RevenueOverTime = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, 7days, 30days
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch full data for selected time frame
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = {};
        if (filter === "7days") {
          params.startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        } else if (filter === "30days") {
          params.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
        }

        const response = await api.get("/AdminAnalytics/revenue-overtime", { params });
        const formatted = response.data.map(item => ({ ...item, date: new Date(item.date) }));
        setData(formatted);

        // Apply category filter client-side
        if (categoryFilter === "all") {
          setFilteredData(formatted);
        } else {
          const filtered = formatted.filter(d => d.categoryId?.toString() === categoryFilter);
          setFilteredData(filtered);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load revenue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, categoryFilter]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading revenue data...</p>
    </div>
  );
  if (error) return <p className="text-danger">{error}</p>;

  // Build unique category list from full data
  const categories = Array.from(
    data
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
        <FiDollarSign /> Revenue Over Time
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
          <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis 
              dataKey="date"
              tickFormatter={date => new Date(date).toLocaleDateString()} 
              label={{ value: "Date", position: "insideBottom", offset: -10, fill: "#000" }}
              tick={{ fill: "#000" }}
            />
            <YAxis 
              label={{ value: "Revenue (£)", angle: -90, position: "insideLeft", offset: 10, fill: "#000", style: { textAnchor: "middle" } }}
              tick={{ fill: "#000" }}
            />
            <Tooltip 
              labelFormatter={date => new Date(date).toLocaleDateString()} 
              formatter={value => [`£${value.toFixed(2)}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#16a34a"
              fill="rgba(5, 150, 105, 0.3)"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "#16a34a" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
