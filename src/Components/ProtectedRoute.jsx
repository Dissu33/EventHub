import React from 'react';

const ProtectedRoute = ({ children }) => {
  // Authentication bypassed - all users can access protected routes
  return children;
};

export default ProtectedRoute;


