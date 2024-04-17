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
