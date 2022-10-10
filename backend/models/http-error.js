class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Adds a "message" property, constructor of the base class
    this.code = errorCode;  // Adds a "code" property
  }
}

module.exports = HttpError;