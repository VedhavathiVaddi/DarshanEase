// TODO
const sendResponse = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, statusCode, message = 'Error') => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { sendResponse, sendError };