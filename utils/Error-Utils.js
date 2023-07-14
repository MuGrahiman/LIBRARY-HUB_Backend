class ErrorResponse extends Error {
    constructor(status, message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
  }

  static badRequest(msg) {
    return new ErrorResponse(400, msg);
  }

  static unAuthorized(msg) {
    return new ErrorResponse(401, msg);
  }

  static noDataFound(data) {
    return new ErrorResponse(404, `${data} Not found.`);
  }

  static forbidden(msg) {
    return new ErrorResponse(403, msg);
  }

  static internalError(msg) {
    console.log(`internalError ${msg}`);
    return new ErrorResponse(500, msg);
  }
}
 
export default ErrorResponse;
