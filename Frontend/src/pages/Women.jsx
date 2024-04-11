import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useProductsContext } from "../context/ProductsContext";

function Women() {
  const [womenArticle, setWomenArticle] = useState([]);
  const { fetchProductById } = useProductsContext();
  const navigate = useNavigate();

  const fetchWomenProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/womenproduct`
      );
      setWomenArticle(response.data);
    } catch (err) {
      console.error("erreur de récup des articles Femmes", err);
    }
  };

  const onClick = (id) => {
    fetchProductById(id);
    navigate("/product");
  };

  useEffect(() => {
    fetchWomenProduct();
  }, []);

  return (
    <div className="containerforproduct">
      {womenArticle.map((clothes) => (
        <ProductCard
          key={clothes.id}
          clothes={clothes}
          className="product"
          onClick={() => onClick(clothes.id)}
        />
      ))}
    </div>
  );
}

export default Women;
