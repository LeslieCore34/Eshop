const jwt = require("jsonwebtoken");
const tables = require("../tables");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET);
}

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.users.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res) => {
  res.send(req.user);
};

const postLogin = (req, res) => {
  tables.users.login(req.body).then((user) => {
    if (user) {
      const token = generateAccessToken({
        email: user.email,
        name: user.name,
        id: user.id,
      });
      res.send({ token });
    } else {
      res.status(401).send({ error: "Identifiant incorrect!!!" });
    }
  });
};

module.exports = {
  add,
  postLogin,
  getProfile,
};
