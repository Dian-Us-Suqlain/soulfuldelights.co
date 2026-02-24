import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const handleCheckout = (e) => {
        e.preventDefault();
        setIsCheckingOut(true);
        // Simulate API call
        setTimeout(() => {
            setIsCheckingOut(false);
            setOrderComplete(true);
        }, 1500);
    };

    if (orderComplete) {
        return (
            <div className="container py-10 flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                <div className="success-icon mb-6">
                    <CheckCircle size={80} color="var(--primary-dark)" />
                </div>
                <h2 className="mb-4">Order Placed Successfully!</h2>
                <p className="text-light mb-8 max-w-md">
                    Thank you for choosing Soulful Delights. Your custom basket is being prepared with love and will be on its way soon.
                </p>
                <Link to="/" className="btn btn-primary">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container animate-fade-in py-10">
            <h1 className="mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart flex-col items-center justify-center py-10 glass">
                    <Package size={64} className="mb-4 text-light" />
                    <h3 className="mb-4">Your basket is empty</h3>
                    <p className="mb-6 text-light">Looks like you haven't built a custom basket yet.</p>
                    <Link to="/build" className="btn btn-primary">Start Building Now</Link>
                </div>
            ) : (
                <div className="cart-layout">

                    <div className="cart-items flex-col gap-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item glass flex justify-between items-start">
                                <div className="item-details">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="item-title">Custom Gift Basket</h3>
                                        <span className="badge-small bg-primary-light">Premium</span>
                                    </div>

                                    <ul className="item-breakdown text-light">
                                        {item.data.baseStyle && <li>• {item.data.baseStyle.name} base</li>}
                                        {item.data.ribbonStyle && <li>• {item.data.ribbonStyle.name}</li>}

                                        {item.data.flowers.length > 0 && <li>• {item.data.flowers.length} Floral decor</li>}
                                        {item.data.chocolates.length > 0 && <li>• {item.data.chocolates.length} Chocolate assortments</li>}
                                        {item.data.toys.length > 0 && <li>• {item.data.toys.length} Plushies</li>}
                                        {item.data.stickers.length > 0 && <li>• {item.data.stickers.length} Sticker packs</li>}
                                        {item.data.card && <li>• Includes Custom Greeting Card</li>}
                                    </ul>
                                </div>

                                <div className="item-actions flex-col items-end gap-4">
                                    <span className="item-price font-bold">${item.price.toFixed(2)}</span>
                                    <button
                                        className="btn-text btn-danger flex items-center gap-1"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="checkout-sidebar">
                        <div className="summary-card glass p-6 sticky top-24">
                            <h3 className="mb-4 border-b pb-4">Order Summary</h3>

                            <div className="summary-row flex justify-between mb-2">
                                <span className="text-light">Subtotal ({cartItems.length} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row flex justify-between mb-4 pb-4 border-b">
                                <span className="text-light">Shipping</span>
                                <span className="text-primary-dark font-bold">Free</span>
                            </div>

                            <div className="summary-row flex justify-between mb-6 pt-2">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg text-primary-dark">${cartTotal.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handleCheckout} className="checkout-form flex-col gap-4">
                                <h4 className="border-b pb-2 mb-2 mt-4">Shipping Details</h4>
                                <input type="text" placeholder="Full Name" required className="form-input" />
                                <input type="email" placeholder="Email Address" required className="form-input" />
                                <textarea placeholder="Delivery Address" required className="form-input" rows="3"></textarea>

                                <h4 className="border-b pb-2 mb-2 mt-4">Payment (Mock)</h4>
                                <input type="text" placeholder="Card Number" required className="form-input" />
                                <div className="flex gap-2">
                                    <input type="text" placeholder="MM/YY" required className="form-input flex-1" />
                                    <input type="text" placeholder="CVC" required className="form-input flex-1" />
                                </div>

                                <button type="submit" className="btn btn-primary w-full mt-6" disabled={isCheckingOut}>
                                    {isCheckingOut ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                                    {!isCheckingOut && <ArrowRight size={18} className="ml-2" />}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Cart;
