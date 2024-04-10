import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Men() {
  const [menArticle, setMenArticle] = useState([]);

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

  useEffect(() => {
    fetchMenProduct();
  }, []);

  return (
    <div className="containerforproduct">
      {menArticle.map((clothes) => (
        <ProductCard key={clothes.id} clothes={clothes} className="product" />
      ))}
    </div>
  );
}
