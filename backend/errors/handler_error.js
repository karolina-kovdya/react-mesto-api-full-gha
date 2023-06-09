const handlerError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: `На сервере произошла ошибка': ${err.message}` });
  }

  next();
};

module.exports = handlerError;
