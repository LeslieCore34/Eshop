const express = require("express");
const cors = require("cors");
const env = require("dotenv").config({ path: "../.env" });

const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-payment-intent", async (req, res) => {
  // Il faut envoyer avec le POST le productId pour récupérer le/les prix de la base de données
  const { productId } = req.body;
  try {
    // Code pour récupérer le prix du produit à partir de la base de données en fonction de l'ID du produit
    // Supposons que vous avez récupéré le prix du produit dans la variable productPrice
    const productPrice = 1099; // Exemple de prix du produit (à remplacer par le vrai prix récupéré de la base de données)
    // Création du paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: productPrice, // Utilisation du prix du produit récupéré de la base de données
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Envoi du client secret en réponse
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment intent." });
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

// LOGIN
router.post("/login", userControllers.postLogin);

/* ************************************************************************* */

module.exports = router;
