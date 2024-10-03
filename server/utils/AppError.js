class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode.toString().startsWith("4") ? "fail" : "error"}`;
  }
}

module.exports = AppError;
