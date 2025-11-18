import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      monthly: '₹999',
      yearly: '₹9,590',
      features: ['Gym access', '2 trainer sessions/month', 'Mobile app'],
      featured: false
    },
    {
      name: 'Pro',
      monthly: '₹1,999',
      yearly: '₹19,190',
      features: [
        'Unlimited trainer access',
        'Nutrition plan',
        'Priority classes'
      ],
      featured: true
    },
    {
      name: 'Elite',
      monthly: '₹2,999',
      yearly: '₹28,790',
      features: ['Private coaching', 'Wellness spa', 'Exclusive events'],
      featured: false
    }
  ];

  const handlePlanClick = (planName) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    // User NOT logged in → send to login page
    alert("Please login to continue!");
    navigate("/login");
    return;
  }

  // User logged in → allow purchase
  alert(`You selected the ${planName} plan!`);
};


  return (
    <section id="plans" className="plans-section">
      <div className="container">
        <h2>Membership Plans</h2>

        <div className="billing-toggle">
          <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>
            Monthly
          </span>
          <label className="switch">
            <input
              type="checkbox"
              id="billingSwitch"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <span className="slider"></span>
          </label>
          <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
            Yearly <small>(save 20%)</small>
          </span>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.featured && <div className="badge">Popular</div>}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                {isYearly ? plan.yearly : plan.monthly}
                <span>{isYearly ? ' /yr' : ' /mo'}</span>
              </div>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check"></i> {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${
                  plan.featured ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => handlePlanClick(plan.name)}
              >
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;