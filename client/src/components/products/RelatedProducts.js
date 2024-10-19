// components/RelatedProducts.js
import React from 'react';
import ProductCard from '../home/ProductCard';

function RelatedProducts() {
  const relatedProducts = [
    { name: "Fancy Product", originalPrice: "$40.00 - $80.00", image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { name: "Special Item", originalPrice: "$20.00", salePrice: "$18.00", reviews: 5, sale: true, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { name: "Sale Item", originalPrice: "$50.00", salePrice: "$25.00", sale: true, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 mt-5">
        <h2 className="fw-bolder mb-4">Related products</h2>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {relatedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;
