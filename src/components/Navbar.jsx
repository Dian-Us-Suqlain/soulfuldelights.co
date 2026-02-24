import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { cartItems } = useCart();

    return (
        <header className="navbar-wrapper">
            <div className="container">
                <nav className="navbar glass">
                    <Link to="/" className="brand flex items-center gap-2">
                        <Heart fill="var(--primary)" color="var(--primary)" size={28} className="brand-logo" />
                        <span className="brand-name">Soulful Delights</span>
                    </Link>

                    <div className="nav-links flex items-center gap-6">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/build" className="btn btn-accent btn-sm">Build a Basket</Link>

                        <Link to="/cart" className="cart-link flex items-center relative">
                            <ShoppingBag size={24} />
                            {cartItems.length > 0 && (
                                <span className="cart-badge flex justify-center items-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
