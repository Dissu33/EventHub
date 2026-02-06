import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/Signup';
import Home from './Components/Home';
import Booking from './Components/Booking/Booking';
import ContactPage from './Components/Contact/Contact';
import Service from './Components/Service';
import ServiceDetail from './Components/Services/ServiceDetail'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          {/* Public Routes */}
          
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<Service />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          
          {/* Auth Routes - Redirect if already authenticated */}
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/signup" 
            element={<Signup />} 
          />
          
          {/* Protected Routes - Redirect to login if not authenticated */}
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;