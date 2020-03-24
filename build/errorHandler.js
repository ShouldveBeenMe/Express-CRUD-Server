"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handlerErrors(err, req, res, next) {
    if (err.status)
        res.status(err.status);
    res.json(err.message);
}
exports.handlerErrors = handlerErrors;
//# sourceMappingURL=errorHandler.js.map