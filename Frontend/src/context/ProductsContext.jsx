import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import ApiService from "../services/api.services";

const ProductsContext = createContext();

function ProductsContextProvider({ children, apiService }) {
  const [user, setUser] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = (productId) => {
    const existingItem = allProduct.find((item) => item.id === productId);
    if (existingItem) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, existingItem];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  const cartButtonManagement = (productId) => {
    const currentClickedItem = allProduct.find((item) => item.id === productId);
    if (currentClickedItem) {
      setAddedToCart((prevState) => ({
        ...prevState, // ici on recréer un objet du state car il est automatiquement passé en argument
        [productId]: true, // ici dans l'objet on ajoute une clés qui est l'id du produit : true
      }));
    }
  };

  const fetchAllProduct = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product`
      );
      setAllProduct(response.data);
    } catch (err) {
      console.error("erreur de récup", err);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
      );
      setOneProduct(response.data);
    } catch (err) {
      console.error("erreur de récupuration de l'article", err);
    }
  };

  useEffect(() => {
    fetchAllProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = useMemo(
    () => ({
      allProduct,
      user,
      setUser,
      addItemToCart,
      cart,
      setCart,
      addedToCart,
      cartButtonManagement,
      fetchProductById,
      oneProduct,
    }),
    [addedToCart, allProduct, cart, user]
  );

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
}

ProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiService: PropTypes.instanceOf(ApiService).isRequired,
};

export { ProductsContext, ProductsContextProvider };
// eslint-disable-next-line react-refresh/only-export-components
export const useProductsContext = () => useContext(ProductsContext);
