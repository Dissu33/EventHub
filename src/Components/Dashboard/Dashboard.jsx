import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingsAPI.getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.firstName}!</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🎫</div>
          <div className="stat-info">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{bookings.filter(b => b.status === 'confirmed').length}</h3>
            <p>Confirmed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toFixed(2)}</h3>
            <p>Total Spent</p>
          </div>
        </div>
      </div>

      <div className="bookings-section">
        <div className="section-header">
          <h2>My Bookings</h2>
          <button className="btn-primary" onClick={() => navigate('/booking')}>
            Book New Event
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No Bookings Yet</h3>
            <p>Start exploring events and make your first booking!</p>
            <button className="btn-primary" onClick={() => navigate('/booking')}>
              Browse Events
            </button>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-status">
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-reference">
                    Ref: {booking.bookingReference}
                  </div>
                </div>

                {booking.event && (
                  <div className="booking-event">
                    <div className="event-image">
                      <img 
                        src={booking.event.image || 'https://via.placeholder.com/300'} 
                        alt={booking.event.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300';
                        }}
                      />
                    </div>
                    <div className="event-details">
                      <h3>{booking.event.title}</h3>
                      <p className="event-date">📅 {booking.event.date}</p>
                      <p className="event-time">⏰ {booking.event.time}</p>
                      <p className="event-location">📍 {booking.event.location}</p>
                    </div>
                  </div>
                )}

                <div className="booking-info">
                  <div className="info-row">
                    <span className="info-label">Tickets:</span>
                    <span className="info-value">{booking.tickets}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Total Price:</span>
                    <span className="info-value">${booking.totalPrice}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Booked On:</span>
                    <span className="info-value">{formatDate(booking.createdAt)}</span>
                  </div>
                  {booking.specialRequirements && (
                    <div className="info-row">
                      <span className="info-label">Special Requirements:</span>
                      <span className="info-value">{booking.specialRequirements}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


