import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <h1>Transform Your Body</h1>
        <p>Join FitLife Gym and achieve your fitness goals</p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection('about')}
          >
            Get Started
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => scrollToSection('services')}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;