import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ArticleCard.css";
import { useProductsContext } from "../context/ProductsContext";

export default function ProductCard({ clothes, onClick }) {
  const { addItemToCart, addedToCart, cartButtonManagement } =
    useProductsContext();
  const [disableButton, setDisableButton] = useState({});

  const handleClickCard = () => {
    if (onClick) {
      onClick(clothes.id);
    }
  };

  const handleClick = (articleId) => {
    addItemToCart(articleId);
    cartButtonManagement(articleId);
    setDisableButton((prevState) => ({
      ...prevState,
      [articleId]: true,
    }));
  };

  const unitPrice = parseFloat(clothes.unit_price);

  return (
    <div className="small-container-card" onClick={() => handleClickCard()}>
      <img alt="product selling" src={clothes.image} className="image-card" />
      <div className="details">
        <h1 className="titlecard">{clothes.title}</h1>
        <h2 className="price">{unitPrice} €</h2>
        <div className="desc-container">
          <p className="desc">{clothes.description}</p>
        </div>
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
    unit_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
