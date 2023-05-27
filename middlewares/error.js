class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  return res.status(404).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
