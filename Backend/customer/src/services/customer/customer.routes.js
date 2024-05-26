var express = require("express");
var router = express.Router();

const customerController = require("./customer.controller");
const wishlistController = require("../wishlist/wishlist.controller");

/**
 * @swagger
 * /api/customer:
 *   get:
 *     summary: Get all customer
 *     description: Get a list of all customer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: Ok
 *               message: Success
 *               data:
 *                 - customerId: 1
 *                   customerName: Customer 1
 *                   customerEmail: customer1@localhost.localdomain
 *                   customerPhone: 0810000001
 *                   customerAddress: Indonesia
 *
 */
router.get("/", customerController.getCustomer);

/**
 * @swagger
 * /api/customer/{id}:
 *   get:
 *     summary: Get customer by ID
 *     description: Get a list customer by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: Ok
 *               message: Success
 *               data:
 *                 - customerId: 1
 *                   customerName: Customer 1
 *                   customerEmail: customer1@localhost.localdomain
 *                   customerPhone: 0810000001
 *                   customerAddress: Indonesia
 *
 */
router.get("/:customerId", customerController.getCustomerId);

router.get("/:customerId/wishlist", wishlistController.getCustomerWishlist);

router.put("/:customerId", customerController.putCustomer);

/**
 * @swagger
 * /api/customer/{id}:
 *   delete:
 *     summary: Delete customer by ID
 *     description: Delete a customer by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: Ok
 *               message: Success
 *               data:
 *                 -
 *
 */
router.delete("/:customerId", customerController.deleteCustomer);

//export this router to use in our index.js
module.exports = router;
