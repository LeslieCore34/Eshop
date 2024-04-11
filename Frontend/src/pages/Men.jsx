import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useProductsContext } from "../context/ProductsContext";

export default function Men() {
  const [menArticle, setMenArticle] = useState([]);
  const { fetchProductById } = useProductsContext();
  const navigate = useNavigate();

  const fetchMenProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/menproduct`
      );
      setMenArticle(response.data);
    } catch (err) {
      console.error("erreur de récup des articles Hommes", err);
    }
  };

  const onClick = (id) => {
    fetchProductById(id);
    navigate("/product");
  };
  useEffect(() => {
    fetchMenProduct();
  }, []);

  return (
    <div className="containerforproduct">
      {menArticle.map((clothes) => (
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
