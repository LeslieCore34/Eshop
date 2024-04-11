const tables = require("../tables");

const browse = async (_, res, next) => {
  try {
    const items = await tables.product.readAll();

    res.json(items);
  } catch (err) {
    next(err);
  }
};

// const read = async (req, res, next) => {
//   try {
//     const item = await tables.item.read(req.params.id);

//     if (item == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(item);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const readOne = async (req, res, next) => {
  try {
    const item = await tables.product.readOneArticle(req.params.id);

    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const item = req.body;
  const { id } = req.params;
  try {
    const affectedRows = await tables.product.update(id, item);
    if (affectedRows === 0) {
      res.status(404).json({ error: "product not found" });
    } else {
      res.status(200).json({ affectedRows });
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const item = req.body;

  try {
    const insertId = await tables.product.create(item);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const affectedRows = await tables.product.delete(id);

    if (affectedRows > 0) {
      res.sendStatus(204).json("item deleted");
    } else {
      res.sendStatus(404).json("product not found");
    }
  } catch (err) {
    next(err);
  }
};

const readMenProducts = async (_, res, next) => {
  try {
    const item = await tables.product.readMen();
    if (item == null) {
      res.sendStatus(404).send("no product found");
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

const readWomenProducts = async (_, res, next) => {
  try {
    const item = await tables.product.readWomen();
    if (item == null) {
      res.sendStatus(404).send("no product found");
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  edit,
  add,
  destroy,
  readMenProducts,
  readWomenProducts,
  readOne,
};
