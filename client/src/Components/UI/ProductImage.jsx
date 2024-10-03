const ProductImage = ({ src, alt }) => {
  return (
    <div className="product__image ">
      <img src={src} alt={alt} />
    </div>
  );
};

export default ProductImage;
