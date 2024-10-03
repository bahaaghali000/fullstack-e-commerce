import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../styles/not-found.css";

const NotFound = () => {
  const navigate = useNavigate();

  return createPortal(
    <div className="not-found">
      <h5>404</h5>
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <div className="not-found-actions gap-3 ">
        <Link to="/" className="buy__btn">
          Go back home
        </Link>
        <button
          className="buy__btn outline__btn"
          onClick={() => navigate(-1, { replace: true })}
        >
          Go Back
        </button>
      </div>
    </div>,
    document.body
  );
};

export default NotFound;
