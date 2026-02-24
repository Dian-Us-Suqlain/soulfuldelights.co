import { Link } from 'react-router-dom';
import { Heart, Instagram, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content flex justify-between items-center">
                <div className="footer-brand flex items-center gap-2">
                    <Heart fill="var(--primary)" color="var(--primary)" size={24} />
                    <span className="brand-text">Soulful Delights</span>
                </div>

                <div className="footer-links flex gap-6">
                    <Link to="/" className="f-link">Home</Link>
                    <Link to="/build" className="f-link">Build Basket</Link>
                    <Link to="/cart" className="f-link">Cart</Link>
                </div>

                <div className="footer-socials flex gap-4">
                    <a href="https://instagram.com/soulfuldelights" target="_blank" rel="noreferrer" className="social-icon">
                        <Instagram size={20} />
                    </a>
                    <a href="mailto:hello@soulfuldelights.com" className="social-icon">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
            <div className="footer-bottom flex justify-center">
                <p>&copy; {new Date().getFullYear()} Soulful Delights. Custom gifts crafted with love.</p>
            </div>
        </footer>
    );
};

export default Footer;
