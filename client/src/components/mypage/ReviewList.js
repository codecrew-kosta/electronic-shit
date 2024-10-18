import React from 'react';

const ReviewList = ({ reviews }) => (
  <div className="list-group">
    {reviews.map((review, index) => (
      <a href={review.productId} key={index} className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{review.product}</h5>
        </div>
        <p className="mb-1">{review.content}</p>
      </a>
    ))}
  </div>
);

export default ReviewList;
