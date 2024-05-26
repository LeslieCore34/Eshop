exports.api = (req, res) => {
  res.json({
    status: true,
    code: 200,
    message: "SUCCESS",
    api: "== customer service ==",
  });
};

exports.log = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
