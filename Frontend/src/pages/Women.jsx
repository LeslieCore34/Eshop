import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Women() {
  const [womenArticle, setWomenArticle] = useState([]);

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

  useEffect(() => {
    fetchWomenProduct();
  }, []);

  return (
    <div className="containerforproduct">
      {womenArticle.map((clothes) => (
        <ProductCard key={clothes.id} clothes={clothes} className="product" />
      ))}
    </div>
  );
}

export default Women;
