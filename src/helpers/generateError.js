const generateError = (msg, httpStatus) => {
  const error = new Error(msg);
  error.statusCode = httpStatus;

  throw error;
};

export default generateError;
