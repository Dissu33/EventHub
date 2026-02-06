import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import { eventsAPI, bookingsAPI } from '../../utils/api';

function Booking() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tickets: 1,
    specialRequirements: ''
  });

  // Load events from localStorage (backend-free)
  useEffect(() => {
    const loadEvents = () => {
      try {
        setLoading(true);

        // Check if events exist in localStorage
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

          // Save to localStorage
          localStorage.setItem('events', JSON.stringify(events));
        }

        setEvents(events);
        setError(null);
      } catch (error) {
        console.error('Error loading events:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Load user data if logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || ''
      }));
    }
  }, []);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setBookingStep(2);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Simulate API delay
    setTimeout(() => {
      try {
        // Generate booking reference
        const bookingReference = 'EVH-' + Date.now().toString().slice(-8);

        // Calculate total price
        const totalPrice = (selectedEvent.price * parseInt(formData.tickets)) + 2;

        // Create booking object
        const newBooking = {
          id: Date.now(),
          bookingReference: bookingReference,
          event: {
            title: selectedEvent.title,
            date: selectedEvent.date,
            time: selectedEvent.time,
            location: selectedEvent.location
          },
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          tickets: parseInt(formData.tickets),
          specialRequirements: formData.specialRequirements,
          totalPrice: totalPrice,
          bookingDate: new Date().toISOString(),
          status: 'confirmed'
        };

        // Get existing bookings from localStorage
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        setBookingData(newBooking);
        setBookingStep(3);
      } catch (error) {
        setError('Failed to create booking. Please try again.');
        console.error('Booking error:', error);
      } finally {
        setSubmitting(false);
      }
    }, 1000);
  };

  const calculateTotal = () => {
    return selectedEvent ? selectedEvent.price * formData.tickets : 0;
  };

  const resetBooking = () => {
    setSelectedEvent(null);
    setBookingStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      tickets: 1,
      specialRequirements: ''
    });
  };

  return (
    <div className="booking-page">

      <section className="booking-hero">
        <div className="booking-hero-content">
          <h1>Book Your Next Adventure</h1>
          <p>Discover and reserve amazing local events in just a few clicks</p>
        </div>
      </section>


      <div className="booking-container">

        <div className="booking-progress">
          <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Select Event</p>
          </div>
          <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Booking Details</p>
          </div>
          <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Confirmation</p>
          </div>
        </div>

        {bookingStep === 1 && (
          <section className="event-selection">
            <h2>Upcoming Events</h2>
            <p className="section-subtitle">Choose from our curated selection of local events</p>

            {loading && <div className="loading-message">Loading events...</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="events-grid">
              {events.map(event => (
                <div key={event._id || event.id} className="event-card">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <span className="event-price">
                      {event.price === 0 ? 'FREE' : `$${event.price}`}
                    </span>
                  </div>
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <div className="event-meta">
                      <span>📅 {event.date}</span>
                      <span>⏰ {event.time}</span>
                      <span>📍 {event.location}</span>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <div className="event-footer">
                      <span className="tickets-available">
                        {event.availableTickets} tickets left
                      </span>
                      <button
                        className="btn-select"
                        onClick={() => handleEventSelect(event)}
                        disabled={event.availableTickets === 0}
                      >
                        {event.availableTickets === 0 ? 'Sold Out' : 'Select Event'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {bookingStep === 2 && selectedEvent && (
          <section className="booking-form-section">
            <div className="booking-form-container">
              <div className="event-summary">
                <h2>Booking Details</h2>
                <div className="selected-event">
                  <img src={selectedEvent.image} alt={selectedEvent.title} />
                  <div className="event-info">
                    <h3>{selectedEvent.title}</h3>
                    <p>📅 {selectedEvent.date} | ⏰ {selectedEvent.time}</p>
                    <p>📍 {selectedEvent.location}</p>
                    <p className="event-price">Price: ${selectedEvent.price} per ticket</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="tickets">Number of Tickets</label>
                  <select
                    id="tickets"
                    name="tickets"
                    value={formData.tickets}
                    onChange={handleInputChange}
                    required
                  >
                    {[...Array(Math.min(10, selectedEvent.availableTickets))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} ticket{i !== 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequirements">Special Requirements (Optional)</label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className="booking-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-details">
                    <p>Tickets: {formData.tickets} x ${selectedEvent.price}</p>
                    <p>Service Fee: $2.00</p>
                    <p className="total">Total: ${calculateTotal() + 2}</p>
                  </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="form-actions">
                  <button type="button" onClick={() => setBookingStep(1)} className="btn-back" disabled={submitting}>
                    Back to Events
                  </button>
                  <button type="submit" className="btn-confirm" disabled={submitting}>
                    {submitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}


        {bookingStep === 3 && bookingData && (
          <section className="confirmation-section">
            <div className="confirmation-content">
              <div className="confirmation-icon">✅</div>
              <h2>Booking Confirmed!</h2>
              <p className="confirmation-message">
                Thank you for your booking. Your tickets have been reserved successfully.
              </p>

              <div className="booking-details">
                <h3>Booking Details</h3>
                <div className="detail-item">
                  <strong>Event:</strong> {bookingData.event?.title || selectedEvent?.title}
                </div>
                <div className="detail-item">
                  <strong>Date & Time:</strong> {bookingData.event?.date || selectedEvent?.date} at {bookingData.event?.time || selectedEvent?.time}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> {bookingData.event?.location || selectedEvent?.location}
                </div>
                <div className="detail-item">
                  <strong>Tickets:</strong> {bookingData.tickets}
                </div>
                <div className="detail-item">
                  <strong>Total Paid:</strong> ${bookingData.totalPrice}
                </div>
                <div className="detail-item">
                  <strong>Booking Reference:</strong> {bookingData.bookingReference}
                </div>
              </div>

              <div className="confirmation-actions">
                <button onClick={resetBooking} className="btn-book-more">
                  Book Another Event
                </button>
                <button onClick={() => navigate('/')} className="btn-home">
                  Go to Homepage
                </button>
              </div>

              <div className="confirmation-note">
                <p>📧 A confirmation email has been sent to <strong>{bookingData.email}</strong></p>
                <p>📱 You can also view your tickets in the "My Bookings" section</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Booking;