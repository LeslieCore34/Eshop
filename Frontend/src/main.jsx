import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Account from "./pages/Account";
import Women from "./pages/Women";
import Men from "./pages/Men";
import ShoppingCart from "./pages/ShoppingCart";
import ApiService from "./services/api.services";
import { ProductsContextProvider } from "./context/ProductsContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UsersContextProvider } from "./context/UsersContext";
import Home from "./pages/Home";
import accountLoader from "./loaders/account.loader";
import SingleProductCard from "./pages/SingleProductCard";
import StripeWrapper from "./components/StripeWrapper";

const apiService = new ApiService();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProductsContextProvider apiService={apiService}>
        <UsersContextProvider apiService={apiService}>
          <App />
        </UsersContextProvider>
      </ProductsContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/payment",
        element: <StripeWrapper />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/product",
        element: <SingleProductCard />,
      },
      {
        path: "/account",
        loader: () => accountLoader(apiService),
        element: <Account />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
