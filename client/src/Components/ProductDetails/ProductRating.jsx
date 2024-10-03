import React from "react";

const ProductRating = ({ averageRating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(averageRating); // Full stars (e.g. 4 from 4.5)
  const hasHalfStar = averageRating % 1 !== 0; // Check if there's a half star
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="product__rating d-flex align-items-center gap-5 mb-3">
      <div>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index}>
            <i className="ri-star-fill"></i>
          </span>
        ))}

        {hasHalfStar && (
          <span>
            <i className="ri-star-half-line"></i>
          </span>
        )}

        {[...Array(emptyStars)].map((_, index) => (
          <span key={index}>
            <i className="ri-star-line"></i>
          </span>
        ))}
      </div>

      <p>
        (
        <span style={{ color: "coral", fontWeight: "500" }}>
          {averageRating.toFixed(1)}
        </span>{" "}
        ratings)
      </p>
    </div>
  );
};

export default ProductRating;
