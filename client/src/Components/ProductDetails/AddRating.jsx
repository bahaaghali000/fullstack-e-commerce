import { useSelector } from "react-redux";
import Rating from "./Rating";
import AddRatingForm from "./AddRatingForm";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const AddRating = ({ ratings, productId }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <div className="product__review">
      <div>
        {ratings.length > 0 &&
          ratings.map((review) => <Rating key={review._id} review={review} />)}
      </div>

      <div className="review__form mt-5">
        {isAuthenticated ? (
          <AddRatingForm productId={productId} />
        ) : (
          <div className="d-flex flex-column align-items-center">
            <h1 className=" fs-4">You Must Login First To Add Rating</h1>
            <Button
              onClick={() => navigate("/login")}
              className="outline__btn d-block"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRating;
