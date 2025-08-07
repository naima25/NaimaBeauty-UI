import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/Cart.css';

const CartPage = () => {
  const {
    cart,
    loading,
    error,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    createOrder,
  } = useAppContext();

  if (loading) return <div>Loading your cart...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price || 0);
  };

  const handleRemoveClick = async (cartItemId) => {
    const success = await removeFromCart(cartItemId);
    console.log(success
      ? `Item with ID ${cartItemId} removed successfully.`
      : `Failed to remove item with ID ${cartItemId}`);
  };

  const handleIncreaseQuantity = async (productId) => {
    const item = cart.cartItems.find((item) => item.productId === productId);
    if (item) {
      const newQuantity = item.quantity + 1;
      await updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const item = cart.cartItems.find((item) => item.productId === productId);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      await updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    const success = await clearCart();
    console.log(success ? 'Cart cleared successfully' : 'Failed to clear cart');
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart?.cartItems?.length > 0 ? (
        <div>
          <div className="cart-actions">
            <button onClick={handleClearCart} className="clear-cart-button">
              Empty Cart
            </button>
            <button
              onClick={async () => {
                const result = await createOrder();
                if (result.success) {
                  alert('Order created successfully!');
                } else {
                  alert(`Error: ${result.message}`);
                }
              }}
              className="create-order-button"
            >
              Create Order
            </button>
          </div>

          {cart.cartItems.map((item, index) => (
            <div key={`${item.productId}-${index}`} className="cart-item">
              <img
                src={item.product?.imageUrl || 'placeholder-image-url'}
                alt={item.product?.name || 'Product'}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.product?.name || 'Unknown Product'}</h3>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleDecreaseQuantity(item.productId)}
                    className="quantity-button"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.productId)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <p>Price: {formatPrice(item.product?.price)}</p>
                <p>
                  Subtotal:{' '}
                  {formatPrice(item.quantity * (item.product?.price || 0))}
                </p>
                <button
                  onClick={() => handleRemoveClick(item.productId)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="cart-total">
            Total: {formatPrice(cart?.price)}
          </h3>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
