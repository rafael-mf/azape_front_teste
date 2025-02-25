// src/components/Card/Card.js
import React from 'react';

const Card = ({ title, value }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default Card;