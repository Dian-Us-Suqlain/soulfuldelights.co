import { Link } from 'react-router-dom';
import { ArrowRight, Star, Gift, Clock, HeartHandshake } from 'lucide-react';
import './Home.css';

import heroImg from '../assets/hero_basket_1771970041101.png';
import birthdayImg from '../assets/preset_birthday_1771970056216.png';
import getwellImg from '../assets/preset_getwell_1771970070789.png';

const features = [
    { icon: <Gift size={32} />, title: 'Endless Customization', desc: 'From basket vibes to chocolates, build exactly what they love.' },
    { icon: <HeartHandshake size={32} />, title: 'Made with Love', desc: 'Every basket is handcrafted with attention to the finest details.' },
    { icon: <Clock size={32} />, title: 'Timely Delivery', desc: 'Secure packaging and on-time delivery to surprise them perfectly.' }
];

const presets = [
    { id: 1, name: 'Birthday Bash', price: 65, img: birthdayImg, desc: 'Colorful treats and a fun atmosphere.' },
    { id: 2, name: 'Get Well Soon', price: 55, img: getwellImg, desc: 'Soothing teas and fruits for a speedy recovery.' },
    { id: 3, name: 'Anniversary Special', price: 85, img: heroImg, desc: 'Elegant flowers and premium goodies.' }
];

const Home = () => {
    return (
        <div className="home-page animate-fade-in">
            <section className="hero">
                <div className="container hero-container flex items-center justify-between">
                    <div className="hero-content flex-col items-start gap-6">
                        <span className="badge glass animate-fade-in delay-100">Premium Gift Baskets 🎀</span>
                        <h1 className="hero-title animate-fade-in delay-200">
                            Craft the Perfect <span className="text-primary">Surprise.</span>
                        </h1>
                        <p className="hero-subtitle animate-fade-in delay-300">
                            Build custom gift baskets tailored for any occasion. Pick the basket, add the goodies, and we'll deliver smiles.
                        </p>
                        <div className="hero-actions flex gap-4 animate-fade-in delay-300">
                            <Link to="/build" className="btn btn-primary btn-lg">
                                Start Building <ArrowRight size={20} />
                            </Link>
                            <a href="#presets" className="btn btn-outline btn-lg">Explore Presets</a>
                        </div>
                    </div>
                    <div className="hero-image-wrapper animate-fade-in delay-200">
                        <img src={heroImg} alt="Beautiful Gift Basket" className="hero-image" />
                        <div className="floating-card glass">
                            <div className="flex items-center gap-2">
                                <Star fill="#E2C044" color="#E2C044" size={20} />
                                <span style={{ fontWeight: 600 }}>5.0 Rating</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>from 2k+ happy customers</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features bg-subtle">
                <div className="container">
                    <div className="features-grid">
                        {features.map((f, idx) => (
                            <div key={idx} className="feature-card flex-col items-center">
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="presets" className="presets container">
                <div className="section-header flex-col items-center gap-4">
                    <h2>Featured Inspirations</h2>
                    <p>Not sure where to start? Check out our most loved baskets.</p>
                </div>
                <div className="presets-grid">
                    {presets.map(p => (
                        <div key={p.id} className="preset-card glass">
                            <div className="preset-img-wrapper">
                                <img src={p.img} alt={p.name} />
                            </div>
                            <div className="preset-info">
                                <div className="flex justify-between items-center mb-2">
                                    <h3>{p.name}</h3>
                                    <span className="price">${p.price}</span>
                                </div>
                                <p>{p.desc}</p>
                                <Link to="/build" className="btn btn-primary btn-full mt-4">Customize This</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
