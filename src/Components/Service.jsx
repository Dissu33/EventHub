// import React from "react"
// import "./Service.css";

// function Services() {
//   const services = [
//     {
//       icon: "🎪",
//       title: "Event Booking",
//       description: "Book tickets for various local events with just a few clicks. Secure, fast, and reliable booking system.",
//       features: ["Instant confirmation", "Secure payment processing", "Mobile-friendly interface", "Email notifications"]
//     },
//     {
//       icon: "📅",
//       title: "Event Management",
//       description: "Comprehensive tools for event organizers to manage their events efficiently.",
//       features: ["Event creation dashboard", "Attendee management", "Real-time analytics", "Customizable event pages"]
//     },
//     {
//       icon: "📱",
//       title: "Mobile Access",
//       description: "Access and book events from anywhere using our dedicated mobile application.",
//       features: ["iOS and Android apps", "Offline access", "Push notifications", "Mobile wallet integration"]
//     },
//     {
//       icon: "💬",
//       title: "Customer Support",
//       description: "24/7 support to help with any booking issues or questions you might have.",
//       features: ["Live chat support", "Phone assistance", "Email support", "Help center resources"]
//     },
//     {
//       icon: "📊",
//       title: "Analytics & Insights",
//       description: "Get detailed insights into event performance and attendee behavior.",
//       features: ["Attendance tracking", "Revenue reports", "Demographic analysis", "Performance metrics"]
//     },
//     {
//       icon: "🛡️",
//       title: "Security & Safety",
//       description: "Ensuring secure transactions and safe event experiences for all users.",
//       features: ["SSL encryption", "Fraud detection", "Secure payment gateways", "Safety guidelines"]
//     }
//   ];

//   const pricingPlans = [
//     {
//       name: "Basic",
//       price: "Free",
//       description: "Perfect for individual event goers",
//       features: [
//         "Book up to 5 events per month",
//         "Basic event discovery",
//         "Email support",
//         "Standard booking features"
//       ],
//       buttonText: "Get Started"
//     },
//     {
//       name: "Pro",
//       price: "$9.99",
//       period: "/month",
//       description: "Ideal for frequent event attendees",
//       features: [
//         "Unlimited event bookings",
//         "Priority event access",
//         "Early bird notifications",
//         "Dedicated support",
//         "Custom recommendations"
//       ],
//       buttonText: "Go Pro",
//       popular: true
//     },
//     {
//       name: "Enterprise",
//       price: "$49.99",
//       period: "/month",
//       description: "For event organizers and businesses",
//       features: [
//         "All Pro features",
//         "Event management tools",
//         "Analytics dashboard",
//         "Multi-user access",
//         "Custom branding",
//         "API access"
//       ],
//       buttonText: "Contact Sales"
//     }
//   ];

//   return (
//     <div className="services-page">
//       {/* Hero Section */}
//       <section className="services-hero">
//         <div className="services-hero-content">
//           <h1>Our Services</h1>
//           <p>Comprehensive solutions for event attendees and organizers alike. Discover how LocalEase can transform your event experience.</p>
//         </div>
//       </section>

//       {/* Main Services Grid */}
//       <section className="main-services">
//         <div className="container">
//           <h2>What We Offer</h2>
//           <p className="section-subtitle">From discovery to execution, we've got you covered</p>

//           <div className="services-grid">
//             {services.map((service, index) => (
//               <div key={index} className="service-card">
//                 <div className="service-icon">{service.icon}</div>
//                 <h3>{service.title}</h3>
//                 <p>{service.description}</p>
//                 <ul className="service-features">
//                   {service.features.map((feature, idx) => (
//                     <li key={idx}>✓ {feature}</li>
//                   ))}
//                 </ul>
//                 <button className="btn-learn-more">Learn More</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="pricing-section">
//         <div className="container">
//           <h2>Simple, Transparent Pricing</h2>
//           <p className="section-subtitle">Choose the plan that works best for you</p>

//           <div className="pricing-grid">
//             {pricingPlans.map((plan, index) => (
//               <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
//                 {plan.popular && <div className="popular-badge">Most Popular</div>}
//                 <div className="pricing-header">
//                   <h3>{plan.name}</h3>
//                   <div className="price">
//                     <span className="amount">{plan.price}</span>
//                     {plan.period && <span className="period">{plan.period}</span>}
//                   </div>
//                   <p>{plan.description}</p>
//                 </div>
//                 <ul className="plan-features">
//                   {plan.features.map((feature, idx) => (
//                     <li key={idx}>✓ {feature}</li>
//                   ))}
//                 </ul>
//                 <button className={`btn-pricing ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
//                   {plan.buttonText}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Comparison */}
//       <section className="features-comparison">
//         <div className="container">
//           <h2>Compare Features</h2>
//           <div className="comparison-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Feature</th>
//                   <th>Basic</th>
//                   <th>Pro</th>
//                   <th>Enterprise</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Event Booking</td>
//                   <td>✓</td>
//                   <td>✓</td>
//                   <td>✓</td>
//                 </tr>
//                 <tr>
//                   <td>Priority Access</td>
//                   <td>✗</td>
//                   <td>✓</td>
//                   <td>✓</td>
//                 </tr>
//                 <tr>
//                   <td>Analytics Dashboard</td>
//                   <td>✗</td>
//                   <td>Basic</td>
//                   <td>Advanced</td>
//                 </tr>
//                 <tr>
//                   <td>Custom Branding</td>
//                   <td>✗</td>
//                   <td>✗</td>
//                   <td>✓</td>
//                 </tr>
//                 <tr>
//                   <td>API Access</td>
//                   <td>✗</td>
//                   <td>✗</td>
//                   <td>✓</td>
//                 </tr>
//                 <tr>
//                   <td>Dedicated Support</td>
//                   <td>✗</td>
//                   <td>✓</td>
//                   <td>✓</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="services-cta">
//         <div className="container">
//           <h2>Ready to Get Started?</h2>
//           <p>Join thousands of event organizers and attendees who trust LocalEase</p>
//           <div className="cta-buttons">
//             <button className="btn-primary">Start Free Trial</button>
//             <button className="btn-secondary">Schedule a Demo</button>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq-section">
//         <div className="container">
//           <h2>Frequently Asked Questions</h2>
//           <div className="faq-grid">
//             <div className="faq-item">
//               <h3>How do I book an event?</h3>
//               <p>Simply browse our event listings, select your preferred event, and complete the booking process in just a few clicks.</p>
//             </div>
//             <div className="faq-item">
//               <h3>Can I cancel my booking?</h3>
//               <p>Yes, most bookings can be cancelled up to 24 hours before the event. Check the specific event's cancellation policy.</p>
//             </div>
//             <div className="faq-item">
//               <h3>Do you offer refunds?</h3>
//               <p>Refunds are provided according to the event organizer's policy. We facilitate the refund process for eligible cancellations.</p>
//             </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Services;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      id: "event-booking",
      icon: "🎪",
      title: "Event Booking",
      description: "Book tickets for various local events with just a few clicks. Secure, fast, and reliable booking system.",
      features: ["Instant confirmation", "Secure payment processing", "Mobile-friendly interface", "Email notifications"]
    },
    {
      id: "event-management",
      icon: "📅",
      title: "Event Management",
      description: "Comprehensive tools for event organizers to manage their events efficiently.",
      features: ["Event creation dashboard", "Attendee management", "Real-time analytics", "Customizable event pages"]
    },
    {
      id: "mobile-access",
      icon: "📱",
      title: "Mobile Access",
      description: "Access and book events from anywhere using our dedicated mobile application.",
      features: ["iOS and Android apps", "Offline access", "Push notifications", "Mobile wallet integration"]
    },
    {
      id: "customer-support",
      icon: "💬",
      title: "Customer Support",
      description: "24/7 support to help with any booking issues or questions you might have.",
      features: ["Live chat support", "Phone assistance", "Email support", "Help center resources"]
    },
    {
      id: "analytics-insights",
      icon: "📊",
      title: "Analytics & Insights",
      description: "Get detailed insights into event performance and attendee behavior.",
      features: ["Attendance tracking", "Revenue reports", "Demographic analysis", "Performance metrics"]
    },
    {
      id: "security-safety",
      icon: "🛡️",
      title: "Security & Safety",
      description: "Ensuring secure transactions and safe event experiences for all users.",
      features: ["SSL encryption", "Fraud detection", "Secure payment gateways", "Safety guidelines"]
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for individual event goers",
      features: [
        "Book up to 5 events per month",
        "Basic event discovery",
        "Email support",
        "Standard booking features"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Ideal for frequent event attendees",
      features: [
        "Unlimited event bookings",
        "Priority event access",
        "Early bird notifications",
        "Dedicated support",
        "Custom recommendations"
      ],
      buttonText: "Go Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "/month",
      description: "For event organizers and businesses",
      features: [
        "All Pro features",
        "Event management tools",
        "Analytics dashboard",
        "Multi-user access",
        "Custom branding",
        "API access"
      ],
      buttonText: "Contact Sales"
    }
  ];

  const handleLearnMore = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="services-page">

      <section className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive solutions for event attendees and organizers alike. Discover how EventHub can transform your event experience.</p>
        </div>
      </section>


      <section className="main-services">
        <div className="container">
          <h2>What We Offer</h2>
          <p className="section-subtitle">From discovery to execution, we've got you covered</p>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button
                  className="btn-learn-more"
                  onClick={() => handleLearnMore(service.id)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="pricing-section">
        <div className="container">
          <h2>Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the plan that works best for you</p>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="price">
                    <span className="amount">{plan.price}</span>
                    {plan.period && <span className="period">{plan.period}</span>}
                  </div>
                  <p>{plan.description}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={`btn-pricing ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="features-comparison">
        <div className="container">
          <h2>Compare Features</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th>Pro</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Event Booking</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Priority Access</td>
                  <td>✗</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Analytics Dashboard</td>
                  <td>✗</td>
                  <td>Basic</td>
                  <td>Advanced</td>
                </tr>
                <tr>
                  <td>Custom Branding</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>API Access</td>
                  <td>✗</td>
                  <td>✗</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Dedicated Support</td>
                  <td>✗</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      <section className="services-cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of event organizers and attendees who trust EventHub</p>
          <div className="cta-buttons">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary">Schedule a Demo</button>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I book an event?</h3>
              <p>Simply browse our event listings, select your preferred event, and complete the booking process in just a few clicks.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel my booking?</h3>
              <p>Yes, most bookings can be cancelled up to 24 hours before the event. Check the specific event's cancellation policy.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer refunds?</h3>
              <p>Refunds are provided according to the event organizer's policy. We facilitate the refund process for eligible cancellations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;