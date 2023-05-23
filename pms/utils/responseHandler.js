const createError = require("http-errors");

class ResponseHandler {
  constructor() {
    this.responseCodes = {
      2000: 200,
      2001: 500,
      2002: 500,
      2003: 500,
      2004: 500,
      2005: 500,
      2006: 500,
      2007: 500,
      2009: 500,
      2011: 400,
      5001: 401,
      5002: 403,
    };
  }

  successResponse(res, statusCode, data) {
    return res.status(statusCode).json({
      responseCode:
        parseInt(
          Object.keys(this.responseCodes).find(
            (key) => this.responseCodes[key] === statusCode
          )
        ) ?? 2000,
      ...data,
    });
  }

  errorResponse(res, statusCode, error = null, stacktrace = null) {
    return res.status(statusCode).json({
      responseCode:
        parseInt(
          Object.keys(this.responseCodes).find(
            (key) => this.responseCodes[key] === statusCode
          )
        ) ?? 2009,
      error: error ?? createError(statusCode).message,
      stacktrace: stacktrace ?? undefined,
    });
  }
}

module.exports = new ResponseHandler();
