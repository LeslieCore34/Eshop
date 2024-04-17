import { useProductsContext } from "../context/ProductsContext";
import "../styles/SingleProductCard.css";

export default function SingleProductCard() {
  const { oneProduct } = useProductsContext();

  return (
    <>
      <div className="single-product-container">
        {oneProduct.length > 0 && (
          <>
            <p key={oneProduct.id} className="single-title">
              {oneProduct[0].title}
            </p>
            <img
              src={oneProduct[0].image}
              alt="product image"
              className="single-image"
            />
            <p className="single-price">{oneProduct[0].unit_price} €</p>
            <p className="description">{oneProduct[0].description}</p>
          </>
        )}
      </div>
    </>
  );
}
