import React from 'react';

const ProductCard = ({ title, description, price }) => (
  <div className="col">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text fw-bold">₩{price}</p>
      </div>
    </div>
  </div>
);

export default ProductCard;
