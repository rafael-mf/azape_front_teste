import React from 'react';
import './Card.css'

const darkenColor = (hex, percent = 20) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.max(0, r - (r * percent) / 100);
  g = Math.max(0, g - (g * percent) / 100);
  b = Math.max(0, b - (b * percent) / 100);

  return `rgb(${r}, ${g}, ${b})`;
};

const Card = ({ title, value, icon, color }) => (
  <div className="card">
    <div className='icone-card' style={{ backgroundColor: color, color: darkenColor(color) }}>
      <span className='material-icons material-symbols-outlined'>{icon}</span>
    </div>
    <div className='item-card'>
      <span>{title}</span>
    </div>
    <div className='item-card'>
      <span style={{fontWeight:"700"}}>{value}</span>
    </div>
  </div>
);

export default Card;