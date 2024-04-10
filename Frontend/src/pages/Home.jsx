import "../styles/ArticleCard.css";
import { useProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { allProduct } = useProductsContext();

  return (
    <div className="containerforproduct">
      {allProduct.map((clothes) => (
        <ProductCard key={clothes.id} clothes={clothes} className="product" />
      ))}
    </div>
  );
}
