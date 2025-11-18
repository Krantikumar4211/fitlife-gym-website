import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const quotes = [
    {
      text: 'The only way to define your life is to live it.',
      author: 'Richard Branson'
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: 'Sam Levenson'
    },
    {
      text: 'Success is not final, failure is not fatal.',
      author: 'Winston Churchill'
    }
  ];

  // =============================
  //   LOAD LOGGED-IN USER HERE
  // =============================
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser?.username) {
      setUserName(currentUser.username);
    } else {
      navigate('/login'); // redirect if not logged in
    }
  }, [navigate]);

  // =============================
  // AUTO SLIDER
  // =============================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  // =============================
  // LOGOUT HANDLER
  // =============================
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="container">
          <div className="welcome-section">
            <h1>
              Welcome, <span id="userName">{userName}</span>!
            </h1>
            <p>Your fitness journey starts here</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="quote-slider">
        <div className="container">
          <div className="quote-container">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`quote ${index === currentSlide ? 'active' : ''}`}
              >
                <i className="fas fa-quote-left"></i>
                <p>"{quote.text}"</p>
                <p
                  style={{
                    fontStyle: 'normal',
                    fontSize: '1rem',
                    marginTop: '1rem'
                  }}
                >
                  - {quote.author}
                </p>
              </div>
            ))}

            <div className="quote-dots">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '60px 0',
          textAlign: 'center',
          background: '#f8f9fa'
        }}
      >
        <div className="container">
          <h2>Your Dashboard</h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#666',
              marginTop: '1rem'
            }}
          >
            Start your fitness transformation today with FitLife Gym
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
