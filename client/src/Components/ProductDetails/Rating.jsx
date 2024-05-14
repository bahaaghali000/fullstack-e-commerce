const Rating = ({ review }) => {
  return (
    <div
      className="review__tab position-relative  d-flex align-items-center  gap-4  mb-4"
      key={review._id}
    >
      <img
        className="profile__picture"
        src={review.author.profilePic}
        alt={review.author.username}
      />
      <div>
        <h5 className="fs-6 mb-1 text-dark">{review.author.username}</h5>
        <p style={{ color: "coral" }} className="mb-1">
          {review.rating} (rating)
        </p>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default Rating;
