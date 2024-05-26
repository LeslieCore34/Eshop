const connection = require("../../config/database");

exports.getCustomer = (req, res) => {
  let query =
    "SELECT customer_id AS customerId, customer_name AS customerName, customer_email AS customerEmail, customer_phone AS customerPhone, customer_address as customerAddress FROM customer";
  try {
    connection.query(query, (error, results, fields) => {
      if (!error) {
        res.json({
          code: 200,
          status: "Success",
          data: results,
        });
      } else {
        console.error(error);
        res.status(500).json({
          code: 500,
          status: "Error",
          message: "Internal Server Error",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.getCustomerId = (req, res) => {
  let query =
    "SELECT customer_id AS customerId, customer_name AS customerName, customer_email AS customerEmail, customer_phone AS customerPhone, customer_address as customerAddress FROM customer WHERE customer_id = '" +
    req.params.customerId +
    "'";
  try {
    connection.query(query, (error, results, fields) => {
      if (!error) {
        res.json({
          code: 200,
          status: "Success",
          data: results,
        });
      } else {
        console.error(error);
        res.status(500).json({
          code: 500,
          status: "Error",
          message: "Internal Server Error",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.putCustomer = (req, res) => {
  let query =
    "UPDATE customer SET customer_name='" +
    req.body.customerName +
    "', customer_email='" +
    req.body.customerEmail +
    "', customer_phone='" +
    req.body.customerPhone +
    "', customer_address='" +
    req.body.customerAddress +
    "' WHERE customer_id='" +
    req.params.customerId +
    "'";
  try {
    connection.query(query, (error, results, fields) => {
      if (!error) {
        res.json({
          code: 200,
          status: "Success",
          message: "Data Berhasil Di Update",
        });
      } else {
        console.error(error);
        res.status(500).json({
          code: 500,
          status: "Error",
          message: "Internal Server Error",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteCustomer = (req, res) => {
  let query =
    "DELETE FROM customer WHERE customer_id='" + req.params.customerId + "'";
  try {
    connection.query(query, (error, results, fields) => {
      if (!error) {
        res.json({
          code: 200,
          status: "Success",
          message: "Data Berhasil Di Hapus",
        });
      } else {
        console.error(error);
        res.status(500).json({
          code: 500,
          status: "Error",
          message: "Internal Server Error",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
