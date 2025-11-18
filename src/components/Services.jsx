import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-dumbbell',
      title: 'Weight Training',
      desc: 'Build strength and muscle'
    },
    {
      icon: 'fas fa-heart',
      title: 'Cardio Workouts',
      desc: 'Improve cardiovascular health'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Yoga Classes',
      desc: 'Find balance and flexibility'
    },
    {
      icon: 'fas fa-running',
      title: 'Personal Training',
      desc: 'One-on-one sessions'
    }
  ];

  const handleServiceClick = (serviceName) => {
    alert(`You selected ${serviceName}!`);
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              onClick={() => handleServiceClick(service.title)}
              style={{ cursor: 'pointer' }}
            >
              <i className={service.icon}></i>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;