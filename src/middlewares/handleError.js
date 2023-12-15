// Creamos el middleware de manejo de errores.
const handleError = (error, req, res, next) => {
  res.status(error.httpStatus || 500).send({ error: error.message });
};

export default handleError;
