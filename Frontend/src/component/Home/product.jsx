
import { Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from "react-icons/fa";

const Product = ({ product }) => {
  return (
    <Link
      className="productCard"
      to={`/product/${product._id}`}
    >
      <img
        src={product.images[0].url}
        alt={product.name}
      />

      <p>{product.name}</p>

      <div className="rating">
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
        <FaRegStar />
        <FaRegStar />

        <span>2000 reviews</span>
      </div>

      <span>₹{product.price}</span>
    </Link>
  );
};

export default Product;

