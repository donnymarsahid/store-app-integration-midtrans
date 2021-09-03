import React from 'react';

const NoMatch = () => {
  return (
    <>
      <div class="nomatch d-flex align-items-center flex-column justify-content-center" style={{ height: '100vh' }}>
        <h2 style={{ color: '#bd0707' }} className="fw-bolder">
          Page Not Found | 404
        </h2>
      </div>
    </>
  );
};

export default NoMatch;
