import { useEffect, useState } from "react";
import "../styles/ShoppingCart.css";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const [newCart, setNewCart] = useState([]);
  const [articleQuantity, setArticleQuantity] = useState([]);
  const [orderTotal, setOrderTotal] = useState(null); // State pour stocker le total de la commande
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setNewCart(storedCart);
      setArticleQuantity(storedCart.map(() => 1));
    }
  }, []);

  // Fonction pour gérer le changement de quantité
  const handleChangeQuantity = (e, index) => {
    const newQuantity = [...articleQuantity];
    newQuantity[index] = parseInt(e.target.value, 10);
    setArticleQuantity(newQuantity);
  };

  // Fonction pour calculer le total
  const calculateTotal = (cart, quantities) => {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.unit_price * quantities[index];
    });
    return total;
  };

  const handleClick = () => {
    // Envoyer les détails du panier au serveur pour calculer le total de la commande
    fetch("http://localhost:3310/api/calculate-order-total", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: newCart,
        quantities: articleQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderTotal(data.total); // Mettre à jour le state avec le total renvoyé par le serveur
        navigate("/payment");
      })
      .catch((error) => {
        console.error("Error calculating order total:", error);
      });
  };

  return (
    <>
      <div className="cart-container">
        <h2>Panier</h2>
        {newCart.map((item, index) => (
          <div key={item.id}>
            <h1 className="cart-title">{item.title}</h1>
            <p>{item.image}</p>
            <p className="cart-price">Unit price : {item.unit_price}</p>
            <label htmlFor="cart-quantity">Quantité</label>
            <select
              name="quantityone"
              id="quantityid"
              value={articleQuantity[index]}
              onChange={(e) => handleChangeQuantity(e, index)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        ))}
      </div>

      <div className="cart-total">Total</div>
      {orderTotal !== null ? (
        <p className="cart-total-price">{orderTotal} €</p>
      ) : (
        <p className="cart-total-price">
          {calculateTotal(newCart, articleQuantity)} €
        </p>
      )}
      <button onClick={handleClick}>Passer la commande</button>
    </>
  );
}
