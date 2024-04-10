import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ArticleCard.css";
import { useProductsContext } from "../context/ProductsContext";

export default function ProductCard({ clothes }) {
  const { addItemToCart, addedToCart, cartButtonManagement } =
    useProductsContext();
  const [disableButton, setDisableButton] = useState({});

  const handleClick = (articleId) => {
    addItemToCart(articleId);
    cartButtonManagement(articleId);
    setDisableButton((prevState) => ({
      ...prevState,
      [articleId]: true,
    }));
  };
  return (
    <div className="small-container-card">
      <img alt="product selling" src={clothes.image} className="image" />
      <div className="details">
        <h1 className="titlecard">{clothes.title}</h1>
        <h2 className="price">{clothes.unit_price} €</h2>
        <p className="desc">{clothes.description}</p>
        <div className="buttons">
          <button
            type="submit"
            className="add"
            onClick={() => handleClick(clothes.id)}
            disabled={disableButton[clothes.id]}
          >
            {addedToCart[clothes.id] ? "Ajouté au panier" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  clothes: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    unit_price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
