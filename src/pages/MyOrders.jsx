import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/Orders.css';
import '../styles/HeroStyles.css';

const OrdersPage = () => {
  const { orders, loading, error, cancelOrder, updateOrderItemQuantity, removeOrderItem } = useAppContext();
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your orders...</p>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  // Format price in GBP
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price || 0);
  };

  const handleUpdateQuantity = async (orderId, orderItemId) => {
    const success = await updateOrderItemQuantity(orderId, orderItemId, newQuantity);
    if (success) {
      setEditingItem(null);
    }
  };

  return (
    <div className="orders-page">
      {/* Hero Section */}
      <section className="orders-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780')`
          }}
        >
          <div className="hero-content">
            <h1>My Orders</h1>
            <p>Track and manage your beauty product orders</p>
          </div>
        </div>
      </section>
      
      <div className="orders-content">
        {orders?.length > 0 ? (
        <div>
          {orders?.map((order) => (
            <div key={order.id} className="order">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="order-actions">
                  <button
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to cancel this order?')) {
                        await cancelOrder(order.id);
                      }
                    }}
                    className="cancel-order-button"
                  >
                    Cancel Order
                  </button>
                  <p className="order-total">Total: {formatPrice(order.price)}</p>
                </div>
              </div>
              
              <div className="order-items">
                {order?.orderItems?.map((item) => (
                  <div key={`${order.id}-${item.id}`} className="order-item">
                    <img
                      src={item.product?.imageUrl || 'placeholder-image-url'}
                      alt={item.product?.name || 'Product'}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h4>{item.product?.name || 'Unknown Product'}</h4>
                      {editingItem === item.id ? (
                        <div className="quantity-edit">
                          <input
                            type="number"
                            min="1"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                            className="quantity-input"
                          />
                          <button
                            onClick={() => handleUpdateQuantity(order.id, item.id)}
                            className="save-quantity-button"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="cancel-edit-button"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="quantity-display">
                          <span>Quantity: {item.quantity}</span>
                          <button
                            onClick={() => {
                              setEditingItem(item.id);
                              setNewQuantity(item.quantity);
                            }}
                            className="edit-quantity-button"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      <p>Price: {formatPrice(item.product?.price)}</p>
                      <p>Subtotal: {formatPrice(item.quantity * (item.product?.price || 0))}</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to remove this item from the order?')) {
                          await removeOrderItem(order.id, item.id);
                        }
                      }}
                      className="remove-order-item-button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
          <p>You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
