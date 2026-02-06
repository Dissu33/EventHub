import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const serviceDetails = {
    "event-booking": {
      icon: "🎪",
      title: "Event Booking",
      description: "Our comprehensive event booking system makes finding and reserving tickets to local events effortless.",
      fullDescription: "EventHub provides a seamless booking experience that connects event-goers with the best local events in their area. Our platform offers real-time availability, instant confirmations, and secure payment processing.",
      features: [
        "Instant confirmation and e-tickets",
        "Secure payment processing with multiple options",
        "Mobile-optimized booking interface",
        "Automated email and SMS notifications",
        "Calendar integration",
        "Waitlist management"
      ],
      benefits: [
        "Save time with quick and easy booking",
        "Never miss out on popular events",
        "Secure transactions guaranteed",
        "Get reminders and updates automatically"
      ],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    "event-management": {
      icon: "📅",
      title: "Event Management",
      description: "Powerful tools for event organizers to create, manage, and promote events efficiently.",
      fullDescription: "Our event management suite gives organizers complete control over their events. From creation to execution, we provide all the tools needed to run successful events.",
      features: [
        "Easy event creation wizard",
        "Real-time attendee tracking",
        "Customizable event pages",
        "Ticket type and pricing management",
        "QR code check-in system",
        "Comprehensive analytics dashboard"
      ],
      benefits: [
        "Streamline event operations",
        "Reach wider audiences",
        "Track event performance in real-time",
        "Reduce administrative workload"
      ],
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    "mobile-access": {
      icon: "📱",
      title: "Mobile Access",
      description: "Access events and manage bookings on the go with our dedicated mobile applications.",
      fullDescription: "Stay connected with your events wherever you are. Our mobile apps provide full functionality in a user-friendly interface designed for on-the-go access.",
      features: [
        "Native iOS and Android applications",
        "Offline access to tickets and event details",
        "Push notifications for event updates",
        "Mobile wallet integration",
        "Location-based event recommendations",
        "One-tap booking"
      ],
      benefits: [
        "Book events anytime, anywhere",
        "Receive instant notifications",
        "Access tickets without internet",
        "Get personalized recommendations"
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    "customer-support": {
      icon: "💬",
      title: "Customer Support",
      description: "24/7 comprehensive support to ensure smooth event experiences for all users.",
      fullDescription: "Our dedicated support team is available around the clock to assist with any questions or issues. We pride ourselves on providing exceptional customer service.",
      features: [
        "24/7 live chat support",
        "Phone and email assistance",
        "Comprehensive help center",
        "Video tutorials and guides",
        "Dedicated account managers for enterprise",
        "Multi-language support"
      ],
      benefits: [
        "Get help whenever you need it",
        "Quick resolution of issues",
        "Learn from comprehensive resources",
        "Personalized assistance for businesses"
      ],
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    "analytics-insights": {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Gain valuable insights into event performance and attendee behavior.",
      fullDescription: "Make data-driven decisions with our comprehensive analytics platform. Track key metrics and understand your audience better.",
      features: [
        "Real-time attendance tracking",
        "Revenue and sales reports",
        "Audience demographic analysis",
        "Event performance metrics",
        "Custom report generation",
        "Exportable data in multiple formats"
      ],
      benefits: [
        "Understand what makes events successful",
        "Optimize pricing and marketing strategies",
        "Identify trends and opportunities",
        "Make informed business decisions"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    "security-safety": {
      icon: "🛡️",
      title: "Security & Safety",
      description: "Enterprise-grade security measures to protect users and ensure safe event experiences.",
      fullDescription: "We take security seriously. Our platform implements the highest standards of security to protect user data and ensure safe transactions.",
      features: [
        "Bank-level SSL encryption",
        "Advanced fraud detection systems",
        "Secure payment gateway integration",
        "Regular security audits",
        "Data backup and recovery",
        "Compliance with privacy regulations"
      ],
      benefits: [
        "Peace of mind with secure transactions",
        "Protection against fraud and scams",
        "Confidentiality of personal information",
        "Reliable and trustworthy platform"
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  };

  const service = serviceDetails[serviceId];

  // if (!service) {
  //   return (
  //     <div className="service-not-found">
  //       <h1>Service Not Found</h1>
  //       <p>The service you're looking for doesn't exist.</p>
  //       <button onClick={() => navigate("/services")}>Back to Services</button>
  //     </div>
  //   );
  // }

  return (
    <div className="service-detail-page">
      <button className="back-button" onClick={() => navigate("/services")}>
        ← Back to Services
      </button>

      <section className="service-detail-hero">
        <div className="service-detail-content">
          <div className="service-header">
            <div className="service-icon-large">{service.icon}</div>
            <h1>{service.title}</h1>
          </div>
          <p className="service-subtitle">{service.description}</p>
          <p className="service-full-description">{service.fullDescription}</p>
        </div>
        <div className="service-hero-image">
          <img src={service.image} alt={service.title} />
        </div>
      </section>

      {/* <section className="service-features-detailed">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            {service.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* 
      <section className="service-benefits">
        <div className="container">
          <h2>Benefits</h2>
          <div className="benefits-grid">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <h3>Benefit {index + 1}</h3>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="service-cta">
        <div className="container">
          <h2>Ready to Get Started with {service.title}?</h2>
          <p>Experience the difference with our comprehensive {service.title.toLowerCase()} solutions.</p>
          <div className="cta-buttons">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary">Contact Sales</button>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default ServiceDetail;