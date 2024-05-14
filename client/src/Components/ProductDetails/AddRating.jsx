import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAddRating from "../../hooks/useAddRating";
import { toast } from "react-toastify";
import Rating from "./Rating";

const AddRating = ({ ratings, setRatings, productId }) => {
  const [ratingNumber, setRatingNumber] = useState(null);
  const [reviewMsg, setReviewMsg] = useState("");

  const { token, user } = useSelector((state) => state.auth);

  const { submitRating } = useAddRating();

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    if (!ratingNumber) {
      return toast.warning("Please Select Yout Rating");
    }

    const reviewObject = {
      comment: reviewMsg,
      rating: ratingNumber,
    };

    const data = await submitRating(productId, reviewObject);
    setRatings((prev) => [...prev, data]);
    setRatingNumber(null);
    setReviewMsg("");
  };

  return (
    <div className="product__review">
      <div>
        {ratings.length > 0 &&
          ratings.map((review) => <Rating key={review._id} review={review} />)}
      </div>

      <div className="review__form mt-5">
        {token ? (
          <form onSubmit={handleSubmitRating}>
            <h4 className="text-dark">Leave your experience</h4>
            <div className="form__group  ">
              <input
                type="text"
                placeholder="Enter Your Name"
                readOnly
                value={user.username}
              />
            </div>

            <div className="rating">
              <motion.span
                whileTap={{ scale: 1.2 }}
                onClick={() => setRatingNumber(1)}
              >
                1
                <i
                  className={
                    ratingNumber === 1 ? "ri-star-fill active" : "ri-star-line"
                  }
                ></i>
              </motion.span>
              <motion.span
                whileTap={{ scale: 1.2 }}
                onClick={() => setRatingNumber(2)}
              >
                2
                <i
                  className={
                    ratingNumber === 2 ? "ri-star-fill active" : "ri-star-line"
                  }
                ></i>
              </motion.span>
              <motion.span
                whileTap={{ scale: 1.2 }}
                onClick={() => setRatingNumber(3)}
              >
                3
                <i
                  className={
                    ratingNumber === 3 ? "ri-star-fill active" : "ri-star-line"
                  }
                ></i>
              </motion.span>
              <motion.span
                whileTap={{ scale: 1.2 }}
                onClick={() => setRatingNumber(4)}
              >
                4
                <i
                  className={
                    ratingNumber === 4 ? "ri-star-fill active" : "ri-star-line"
                  }
                ></i>
              </motion.span>
              <motion.span
                whileTap={{ scale: 1.2 }}
                onClick={() => setRatingNumber(5)}
              >
                5
                <i
                  className={
                    ratingNumber === 5 ? "ri-star-fill active" : "ri-star-line"
                  }
                ></i>
              </motion.span>
            </div>

            <div className="form__group">
              <textarea
                rows="4"
                required
                type="text"
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Review Message"
                value={reviewMsg}
              ></textarea>
            </div>

            <motion.button whileTap={{ scale: 1.5 }} className="buy__btn">
              Submit
            </motion.button>
          </form>
        ) : (
          <h1 className="text-center fs-4">
            You Must Login First To Add Rating
          </h1>
        )}
      </div>
    </div>
  );
};

export default AddRating;
