"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
const handleHttp = (res, error, errorRaw) => {
    console.log(errorRaw.name, error);
    let statusCode = 500;
    if (errorRaw instanceof SyntaxError) {
        statusCode = 400;
    }
    else if (errorRaw.name === "UnauthorizedError") {
        statusCode = 401;
    }
    else if (errorRaw.name === "NotFoundError") {
        statusCode = 404;
    }
    res.status(statusCode);
    res.json({ errors: error });
};
exports.handleHttp = handleHttp;
