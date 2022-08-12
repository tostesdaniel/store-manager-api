module.exports = (err, _req, res, _next) => {
  console.log('error.js ~ err', err);
  if (err.message) {
    const [error, code] = err.message.split('|');

    return res.status(Number(code)).json(error);
  }

  return res.status(500).json({ message: 'Internal error' });
};
