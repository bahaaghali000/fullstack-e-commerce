import Spinner from "react-bootstrap/Spinner";

const LoadingPage = () => {
  return (
    <div className="loading__page">
      <Spinner animation="grow" />
    </div>
  );
};

export default LoadingPage;
