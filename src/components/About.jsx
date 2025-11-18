import React from 'react';

const About = () => {
  const features = [
    { icon: 'fas fa-dumbbell', title: 'Modern Equipment' },
    { icon: 'fas fa-user-tie', title: 'Expert Trainers' },
    { icon: 'fas fa-clock', title: '24/7 Access' }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About FitLife</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Why Choose Us?</h3>
            <p>
              At FitLife Gym, we provide world-class facilities and expert
              trainers to help you achieve your fitness goals.
            </p>
            <div className="features">
              {features.map((feature, index) => (
                <div key={index} className="feature">
                  <i className={feature.icon}></i>
                  <h4>{feature.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image">
            <img src="/sub3.jpg" alt="Gym" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;