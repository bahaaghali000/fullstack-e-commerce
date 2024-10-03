const Button = ({ children, type = "button", className = "", onClick }) => {
  return (
    <button type={type} className={`buy__btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
