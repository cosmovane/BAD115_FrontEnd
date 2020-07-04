import React from 'react';

const NotFound = ({ location }) => {
  return (
  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist. <code>{location.pathname}</code></p>
  </div>
  )
};

export default NotFound;