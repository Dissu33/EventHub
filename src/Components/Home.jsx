
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { eventsAPI } from "../utils/api";

function Home() {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = () => {
      try {
        // Load events from localStorage
        let events = JSON.parse(localStorage.getItem('events') || '[]');

        // If no events, create sample events
        if (events.length === 0) {
          events = [
            {
              _id: '1',
              title: 'Summer Music Festival',
              description: 'Join us for an amazing outdoor music festival featuring top local artists and bands.',
              date: '2026-07-15',
              time: '6:00 PM',
              location: 'Central Park, Delhi',
              price: 25,
              availableTickets: 150,
              image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80'
            },
            {
              _id: '2',
              title: 'Food & Wine Tasting',
              description: 'Experience the finest cuisines and wines from around the world in this exclusive tasting event.',
              date: '2026-07-20',
              time: '7:00 PM',
              location: 'Grand Hotel, Mumbai',
              price: 45,
              availableTickets: 80,
              image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'
            },
            {
              _id: '3',
              title: 'Tech Conference 2026',
              description: 'Connect with industry leaders and explore the latest innovations in technology.',
              date: '2026-08-05',
              time: '9:00 AM',
              location: 'Convention Center, Bangalore',
              price: 0,
              availableTickets: 500,
              image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
            },
            {
              _id: '4',
              title: 'Art Exhibition',
              description: 'Discover contemporary art from emerging and established artists in our gallery.',
              date: '2026-07-25',
              time: '11:00 AM',
              location: 'Art Gallery, Kolkata',
              price: 15,
              availableTickets: 200,
              image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80'
            },
            {
              _id: '5',
              title: 'Yoga & Wellness Retreat',
              description: 'Rejuvenate your mind and body with expert-led yoga sessions and wellness workshops.',
              date: '2026-08-10',
              time: '6:00 AM',
              location: 'Wellness Center, Goa',
              price: 35,
              availableTickets: 50,
              image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80'
            },
            {
              _id: '6',
              title: 'Comedy Night Live',
              description: 'Laugh out loud with the best stand-up comedians performing live on stage.',
              date: '2026-07-30',
              time: '8:00 PM',
              location: 'Comedy Club, Pune',
              price: 20,
              availableTickets: 120,
              image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80'
            }
          ];

          localStorage.setItem('events', JSON.stringify(events));
        }

        // Get first 3 events as featured
        setFeaturedEvents(events.slice(0, 3));
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="home-container">

      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Book Local Events with Ease</h1>
          <p>Discover and reserve the best local events, parties, and gatherings in your area</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/booking')}>Find Events</button>
            <button className="btn-secondary" onClick={() => navigate('/contact')}>Contact Us</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="People celebrating at an event" />
        </div>
      </section>


      <section className="featured-events">
        <h2>Featured Events</h2>
        {loading ? (
          <div className="loading-events">Loading events...</div>
        ) : featuredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events available at the moment. Check back soon!</p>
            <button className="btn-primary" onClick={() => navigate('/booking')}>Browse All Events</button>
          </div>
        ) : (
          <div className="events-grid">
            {featuredEvents.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-image">
                  <img
                    src={event.image || 'https://via.placeholder.com/400'}
                    alt={event.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                  <span className="event-date">{event.date}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-location">📍 {event.location}</p>
                  <p className="event-description">{event.description}</p>
                  <div className="event-footer">
                    <span className="event-price">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </span>
                    <button
                      className="btn-book"
                      onClick={() => navigate('/booking')}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      <section id="about" className="how-it-works">
        <h2>How EventHub Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Discover Events</h3>
            <p>Browse through various local events happening in your area</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Book Tickets</h3>
            <p>Reserve your spot with our easy booking system</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Enjoy the Event</h3>
            <p>Attend and have a great time at your chosen event</p>
          </div>
        </div>
      </section>


      {/* <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎪</div>
            <h3>Event Booking</h3>
            <p>Book tickets for various local events with just a few clicks</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📅</div>
            <h3>Event Management</h3>
            <p>Tools for event organizers to manage their events efficiently</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📱</div>
            <h3>Mobile Access</h3>
            <p>Access and book events from anywhere using our mobile app</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💬</div>
            <h3>Customer Support</h3>
            <p>24/7 support to help with any booking issues or questions</p>
          </div>
        </div>
      </section> */}


      <section className="testimonials">
        <h2>What People Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"EventHub made finding and booking local events so simple! I've discovered amazing events in my city that I wouldn't have known about otherwise."</p>
            <div className="testimonial-author">
              <strong>Deepak Chauhan</strong>
              <span>Regular User</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"As an event organizer, EventHub has streamlined my booking process and helped me reach a wider audience. Highly recommended!"</p>
            <div className="testimonial-author">
              <strong>Bharat Singh</strong>
              <span>Event Organizer</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"The interface is intuitive, and booking tickets takes just seconds. I use EventHub for all my event planning now."</p>
            <div className="testimonial-author">
              <strong>Sagar</strong>
              <span>Frequent Booker</span>
            </div>
          </div>
        </div>
      </section>


      <section id="booking" className="cta-section">
        <h2>Ready to Find Your Next Event?</h2>
        <p>Join thousands of users who are discovering and booking local events with ease</p>
        <button className="btn-primary" onClick={() => navigate('/booking')}>Get Started</button>
      </section>


      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EventHub</h3>
            <p>Making local event booking simple and convenient for everyone.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#booking">Booking</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@eventhub.com</p>
            <p>Phone: 9622328027</p>
            <p>Address: Event Street, Delhi</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EventHub. All rights reserved.</p>
          <p className="developer-credit">Built with ❤️ by <strong>Deepak Chauhan</strong></p>
        </div>
      </footer>
    </div>
  );
}

export default Home;