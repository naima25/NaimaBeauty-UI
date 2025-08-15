
import React, { useEffect, useState } from 'react';
import api from '../services/api.config';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordersOverTime, setOrdersOverTime] = useState([]);
  const [revenueOverTime, setRevenueOverTime] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [ordersByCategory, setOrdersByCategory] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const [ordersRes, revenueRes, productsRes, categoriesRes] = await Promise.all([
          api.get('/AdminAnalytics/orders-overtime'),
          api.get('/AdminAnalytics/revenue-overtime'),
          api.get('/AdminAnalytics/top-products'),
          api.get('/AdminAnalytics/orders-by-category'),
        ]);
        const formatDate = (iso) => iso.slice(0, 10);
        setOrdersOverTime(ordersRes.data.map(item => ({
          date: formatDate(item.date),
          totalOrders: item.totalOrders,
        })));
        setRevenueOverTime(revenueRes.data.map(item => ({
          date: formatDate(item.date),
          totalRevenue: item.totalRevenue,
        })));
        setTopProducts(productsRes.data);
        setOrdersByCategory(categoriesRes.data);
      } catch (err) {
        setError('Failed to load analytics data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌀</div>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>Loading analytics dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff0f0',
      color: '#d32f2f',
      padding: '2rem'
    }}>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{error}</p>
    </div>
  );

  const totalOrders = ordersOverTime.reduce((acc, item) => acc + item.totalOrders, 0);
  const totalRevenue = revenueOverTime.reduce((acc, item) => acc + item.totalRevenue, 0).toFixed(2);
  const mostSoldProduct = topProducts.length ? topProducts[0].productName : '-';
  const totalCategories = ordersByCategory.length;
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#6366f1'];

  // Get top 5 products sorted by revenue
  const top5Products = [...topProducts]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 3);

  return (
    <div style={{
      padding: '2rem',
      paddingTop: '7rem',
      fontFamily: "'Inter', sans-serif",
      maxWidth: '100%',
      margin: 0,
      backgroundColor: '#f9fafb'
    }}>
      <header style={{
        marginBottom: '2.5rem',
        textAlign: 'center',
        padding: '1.5rem',
        backgroundColor: '#77084eff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          📊 Analytics Dashboard
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: 0 }}>
          Key metrics and performance indicators
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${COLORS[0]}` }}>
          <h3 style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: COLORS[0], margin: 0 }}>{totalOrders.toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${COLORS[1]}` }}>
          <h3 style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: COLORS[1], margin: 0 }}>£{parseFloat(totalRevenue).toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${COLORS[2]}` }}>
          <h3 style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Top Product</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: COLORS[2], margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={mostSoldProduct}>{mostSoldProduct}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${COLORS[3]}` }}>
          <h3 style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Categories</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: COLORS[3], margin: 0 }}>{totalCategories}</p>
        </div>
      </div>

      {/* 2x2 Grid of Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Orders Over Time */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Orders Over Time</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ordersOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="totalOrders" stroke={COLORS[0]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Over Time */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Revenue Over Time</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="totalRevenue" stroke={COLORS[1]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Top 3 Products by Revenue</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={top5Products}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="productName" type="category" width={100} />
                <Tooltip formatter={(value) => [`£${value}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="totalRevenue" fill={COLORS[2]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders By Category */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Orders By Category</h2>
          <div style={{ height: '300px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Quantity Sold</th>
                  <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {ordersByCategory.map((category) => (
                  <tr key={category.categoryId} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem', textAlign: 'left' }}>{category.categoryName}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>{category.totalQuantitySold}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>£{category.totalRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;