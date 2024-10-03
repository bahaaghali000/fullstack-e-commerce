const Rating = ({ review }) => {
  return (
    <div className="review__tab position-relative  d-flex align-items-center  gap-4  mb-4">
      <img
        className="profile__picture"
        src={`${import.meta.env.VITE_BACKEND_URL}/${review.author.profilePic}`}
        alt={review.author.username}
      />
      <div>
        <h5 className="fs-6 mb-1 text-dark">{review.author.username}</h5>
        <p style={{ color: "coral" }} className="mb-1">
          {review.rating.toFixed(1)} (ratings)
        </p>

        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default Rating;
