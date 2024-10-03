const ProductTab = ({ onClick, isActive, children }) => {
  return (
    <span onClick={onClick} className={isActive ? "active" : ""}>
      {children}
    </span>
  );
};

export default ProductTab;
