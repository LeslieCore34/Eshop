import "../styles/ArticleCard.css";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { allProduct, fetchProductById } = useProductsContext();
  const navigate = useNavigate();

  const onClick = (id) => {
    fetchProductById(id);
    navigate("/product");
  };

  return (
    <div className="containerforproduct">
      {allProduct.map((clothes) => (
        <ProductCard
          key={clothes.id}
          clothes={clothes}
          className="product"
          onClick={() => onClick(clothes.id)} // Passé en props à productCard
        />
      ))}
    </div>
  );
}
