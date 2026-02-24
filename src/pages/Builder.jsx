import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Palette, Gift, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Builder.css';

const steps = [
    { id: 1, title: 'Base Style', icon: <Package size={20} /> },
    { id: 2, title: 'Decor & Colors', icon: <Palette size={20} /> },
    { id: 3, title: 'Goodies', icon: <Gift size={20} /> },
    { id: 4, title: 'Extras', icon: <Heart size={20} /> }
];

// Mock Data for Options
const basketStyles = [
    { id: 'classic_wicker', name: 'Classic Wicker', price: 15, desc: 'Traditional woven base' },
    { id: 'modern_wire', name: 'Modern Wire', price: 20, desc: 'Sleek geometric metal' },
    { id: 'wooden_crate', name: 'Rustic Crate', price: 18, desc: 'Sturdy vintage wood' }
];

const colors = ['#FFB7B2', '#E2F0CB', '#E2C044', '#B5EAD7', '#FF9AA2', '#C7CEEA'];

const decorOptions = [
    { id: 'ribbon_gold', name: 'Gold Satin Ribbon', price: 5 },
    { id: 'ribbon_pink', name: 'Pink Silk Ribbon', price: 6 },
    { id: 'flowers_roses', name: 'Pastel Roses', price: 15 },
    { id: 'flowers_tulips', name: 'Fresh Tulips', price: 12 },
];

const goodiesOptions = [
    { id: 'choc_truffles', name: 'Gourmet Truffles', price: 18 },
    { id: 'choc_bar', name: 'Artisan Chocolate Bar', price: 8 },
    { id: 'toy_bear', name: 'Plush Teddy Bear', price: 14 },
    { id: 'toy_bunny', name: 'Soft Bunny', price: 12 }
];

const extraOptions = [
    { id: 'card_bday', name: 'Birthday Card', price: 4 },
    { id: 'card_love', name: 'Anniversary Card', price: 4 },
    { id: 'sticker_pack', name: 'Cute Sticker Pack', price: 5 }
];

const Builder = () => {
    const navigate = useNavigate();
    const { currentBasket, setCurrentBasket, addToCart } = useCart();
    const [currentStep, setCurrentStep] = useState(1);

    // Handlers for state updates
    const handleSelect = (category, value) => {
        setCurrentBasket(prev => {
            // Toggle logic for arrays
            if (Array.isArray(prev[category])) {
                const arr = prev[category];
                if (arr.find(item => item.id === value.id)) {
                    return { ...prev, [category]: arr.filter(item => item.id !== value.id) };
                } else {
                    return { ...prev, [category]: [...arr, value] };
                }
            }
            // Direct set for single values
            return { ...prev, [category]: value };
        });
    };

    const calculateTotal = () => {
        let total = 0;
        if (currentBasket.baseStyle) total += currentBasket.baseStyle.price;
        if (currentBasket.ribbonStyle) total += currentBasket.ribbonStyle.price;
        if (currentBasket.card) total += currentBasket.card.price;

        currentBasket.flowers.forEach(i => total += i.price);
        currentBasket.chocolates.forEach(i => total += i.price);
        currentBasket.toys.forEach(i => total += i.price);
        currentBasket.stickers.forEach(i => total += i.price);

        return total;
    };

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleFinish = () => {
        // Only proceed if a base style is selected as a minimum requirement
        if (!currentBasket.baseStyle) {
            alert("Please select a base basket style first!");
            setCurrentStep(1);
            return;
        }
        const totalPrice = calculateTotal();
        addToCart(currentBasket, totalPrice);
        navigate('/cart');
    };

    return (
        <div className="builder-page container animate-fade-in py-10">
            <div className="builder-layout">

                {/* Main Builder Area */}
                <div className="builder-main glass">
                    <div className="builder-header mb-8">
                        <h2>Design Your Basket</h2>
                        <div className="steps-indicator flex justify-between mt-4">
                            {steps.map(step => (
                                <div key={step.id} className={`step-item flex-col items-center ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                                    <div className="step-icon">{step.icon}</div>
                                    <span className="step-title">{step.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="progress-bar mt-4">
                            <div className="progress-fill" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="builder-content">
                        {/* Step 1: Base */}
                        {currentStep === 1 && (
                            <div className="step-pane animate-fade-in">
                                <h3>Select a Base</h3>
                                <div className="options-grid mt-4">
                                    {basketStyles.map(style => (
                                        <div
                                            key={style.id}
                                            className={`option-card ${currentBasket.baseStyle?.id === style.id ? 'selected' : ''}`}
                                            onClick={() => handleSelect('baseStyle', style)}
                                        >
                                            <h4>{style.name}</h4>
                                            <p>{style.desc}</p>
                                            <span className="price">+${style.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Decor */}
                        {currentStep === 2 && (
                            <div className="step-pane animate-fade-in">
                                <h3>Choose Primary Color</h3>
                                <div className="color-picker flex gap-4 mt-4 mb-8">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-swatch ${currentBasket.baseColor === color ? 'selected' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleSelect('baseColor', color)}
                                        />
                                    ))}
                                </div>

                                <h3>Add Decor</h3>
                                <div className="options-grid mt-4">
                                    {decorOptions.map(decor => (
                                        <div
                                            key={decor.id}
                                            className={`option-card ${(currentBasket.ribbonStyle?.id === decor.id || currentBasket.flowers.find(f => f.id === decor.id)) ? 'selected' : ''}`}
                                            onClick={() => {
                                                if (decor.id.includes('ribbon')) handleSelect('ribbonStyle', decor);
                                                else handleSelect('flowers', decor);
                                            }}
                                        >
                                            <h4>{decor.name}</h4>
                                            <span className="price">+${decor.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Goodies */}
                        {currentStep === 3 && (
                            <div className="step-pane animate-fade-in">
                                <h3>Load it up with Goodies</h3>
                                <p className="subtitle">Select as many as you like!</p>
                                <div className="options-grid mt-4">
                                    {goodiesOptions.map(goody => {
                                        const isSelected = [...currentBasket.chocolates, ...currentBasket.toys].find(g => g.id === goody.id);
                                        return (
                                            <div
                                                key={goody.id}
                                                className={`option-card ${isSelected ? 'selected' : ''}`}
                                                onClick={() => {
                                                    if (goody.id.includes('choc')) handleSelect('chocolates', goody);
                                                    else handleSelect('toys', goody);
                                                }}
                                            >
                                                <h4>{goody.name}</h4>
                                                <span className="price">+${goody.price}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Extras */}
                        {currentStep === 4 && (
                            <div className="step-pane animate-fade-in">
                                <h3>Final Touches</h3>
                                <div className="options-grid mt-4">
                                    {extraOptions.map(extra => {
                                        const isSelected = currentBasket.card?.id === extra.id || currentBasket.stickers.find(s => s.id === extra.id);
                                        return (
                                            <div
                                                key={extra.id}
                                                className={`option-card ${isSelected ? 'selected' : ''}`}
                                                onClick={() => {
                                                    if (extra.id.includes('card')) handleSelect('card', extra);
                                                    else handleSelect('stickers', extra);
                                                }}
                                            >
                                                <h4>{extra.name}</h4>
                                                <span className="price">+${extra.price}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="builder-actions flex justify-between mt-8 pt-6 border-t">
                        <button className="btn btn-outline" onClick={handleBack} disabled={currentStep === 1}>
                            <ArrowLeft size={16} /> Back
                        </button>
                        {currentStep < 4 ? (
                            <button className="btn btn-primary" onClick={handleNext}>
                                Next Step <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button className="btn btn-accent" onClick={handleFinish}>
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>

                {/* Live Preview Sidebar */}
                <div className="builder-sidebar glass">
                    <h3>Live Preview</h3>
                    <div className="preview-card mt-4">
                        <div
                            className="preview-visual"
                            style={{ backgroundColor: currentBasket.baseColor || 'var(--bg-subtle)' }}
                        >
                            {currentBasket.baseStyle ? (
                                <div className="preview-icon floating"><Package size={48} color={currentBasket.baseColor ? '#fff' : 'var(--text-light)'} /></div>
                            ) : (
                                <p className="empty-text">Select a base to start</p>
                            )}
                        </div>

                        <div className="preview-receipt mt-6">
                            <h4>Your Selections</h4>
                            <ul className="receipt-list mt-2">
                                {currentBasket.baseStyle && (
                                    <li className="flex justify-between"><span>{currentBasket.baseStyle.name}</span> <span>${currentBasket.baseStyle.price}</span></li>
                                )}
                                {currentBasket.ribbonStyle && (
                                    <li className="flex justify-between"><span>{currentBasket.ribbonStyle.name}</span> <span>${currentBasket.ribbonStyle.price}</span></li>
                                )}
                                {currentBasket.flowers.map(f => (
                                    <li key={f.id} className="flex justify-between"><span>{f.name}</span> <span>${f.price}</span></li>
                                ))}
                                {currentBasket.chocolates.map(c => (
                                    <li key={c.id} className="flex justify-between"><span>{c.name}</span> <span>${c.price}</span></li>
                                ))}
                                {currentBasket.toys.map(t => (
                                    <li key={t.id} className="flex justify-between"><span>{t.name}</span> <span>${t.price}</span></li>
                                ))}
                                {currentBasket.card && (
                                    <li className="flex justify-between"><span>{currentBasket.card.name}</span> <span>${currentBasket.card.price}</span></li>
                                )}
                                {currentBasket.stickers.map(s => (
                                    <li key={s.id} className="flex justify-between"><span>{s.name}</span> <span>${s.price}</span></li>
                                ))}
                            </ul>
                            <div className="receipt-total flex justify-between mt-4 py-3 border-t">
                                <strong>Total Estimate</strong>
                                <strong>${calculateTotal().toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;
