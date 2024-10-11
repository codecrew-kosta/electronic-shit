// components/ProductCard.js
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {product.sale && <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>}
        <img className="card-img-top" src={product.image} alt={product.name} />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.name}</h5>
            {product.reviews && (
              <div className="d-flex justify-content-center small text-warning mb-2">
                {[...Array(product.reviews)].map((_, i) => (
                  <div key={i} className="bi-star-fill"></div>
                ))}
              </div>
            )}
            {product.salePrice ? (
              <>
                <span className="text-muted text-decoration-line-through">{product.originalPrice}</span> {product.salePrice}
              </>
            ) : (
              product.originalPrice
            )}
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
