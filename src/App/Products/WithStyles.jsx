import React from 'react';

function WithStyles({ description, headline, image }) {
  return (
    <div className="carousel-item">
      <img src={image} alt={headline} />
      <div className="carousel-caption">
        <h3>{headline}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default WithStyles;
