const express = require("express");
const cors = require("cors");

const router = express.Router();

const corsOrigin = "http://localhost:3000";
router.use(
  cors({
    origin: [corsOrigin],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const { authMiddleware } = require("./middlewares/auth.middlewares");

// PAYMENTS

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let temporaryCartData = null;

const calculateOrderAmount = (cart, quantities) => {
  let total = 0;
  cart.forEach((item, index) => {
    total += item.unit_price * quantities[index];
  });
  return total;
};

// Route pour calculer le montant total de la commande
router.post("/calculate-order-total", async (req, res) => {
  try {
    console.log("Request received for /calculate-order-total");

    const { cart, quantities } = req.body;

    console.log("Received data:", cart, quantities);

    // Stockez temporairement les informations du panier et les quantités
    temporaryCartData = { cart, quantities };

    // Calculate the order amount using the calculateOrderAmount function
    const orderAmount = calculateOrderAmount(cart, quantities);

    res.json({ total: orderAmount });
  } catch (error) {
    console.error("Error calculating order total:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route pour créer un PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  try {
    if (!temporaryCartData) {
      throw new Error("Cart data is missing");
    }

    const { cart, quantities } = temporaryCartData;

    // Calculate the order amount using the calculateOrderAmount function
    const orderAmount = calculateOrderAmount(cart, quantities);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// USERS
router.get("/users/me", authMiddleware, userControllers.getProfile);
router.post("/users", userControllers.add); // créer son compte

// ITEMS

router.post("/product", itemControllers.add); // create
router.get("/product", itemControllers.browse); // read
router.put("/product/:id", itemControllers.edit); // update
router.delete("/product/:id", itemControllers.destroy); // delete

router.get("/menproduct", itemControllers.readMenProducts);
router.get("/womenproduct", itemControllers.readWomenProducts);
router.get("/product/:id", itemControllers.readOne);

// SHOPPING CART

// LOGIN
router.post("/login", userControllers.postLogin);

/* ************************************************************************* */

module.exports = router;
