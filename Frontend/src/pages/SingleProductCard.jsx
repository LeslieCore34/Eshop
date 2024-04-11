import { useProductsContext } from "../context/ProductsContext";
import "../styles/SingleProductCard.css";

export default function SingleProductCard() {
  const { oneProduct } = useProductsContext();

  console.log("SinglePAGE oneproduct", oneProduct);

  return (
    <>
      <div className="single-product-container">
        {oneProduct.length > 0 && (
          <>
            <p key={oneProduct.id}>{oneProduct[0].title}</p>
            <img src={oneProduct.image} alt="product image" />
            <p className="price">{oneProduct[0].unit_price} €</p>
            <p className="desc">{oneProduct[0].description}</p>
          </>
        )}
      </div>
      <div>test</div>
    </>
  );
}
