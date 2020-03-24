"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var OperationError = /** @class */ (function (_super) {
    __extends(OperationError, _super);
    function OperationError(message, status, name) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.status = status;
        _this.name = name;
        return _this;
    }
    return OperationError;
}(Error));
exports.OperationError = OperationError;
var InvalidInputError = /** @class */ (function (_super) {
    __extends(InvalidInputError, _super);
    function InvalidInputError(message) {
        if (message === void 0) { message = "Input is invalid"; }
        return _super.call(this, message, 400, 'InvalidInputError') || this;
    }
    return InvalidInputError;
}(OperationError));
exports.InvalidInputError = InvalidInputError;
var InvalidRequest = /** @class */ (function (_super) {
    __extends(InvalidRequest, _super);
    function InvalidRequest(message) {
        if (message === void 0) { message = "The request isn't supported"; }
        return _super.call(this, message, 400, 'InvalidRequest') || this;
    }
    return InvalidRequest;
}(OperationError));
exports.InvalidRequest = InvalidRequest;
var DataBaseError = /** @class */ (function (_super) {
    __extends(DataBaseError, _super);
    function DataBaseError(message) {
        if (message === void 0) { message = "Database couldn't finish"; }
        return _super.call(this, message, 400, 'DataBaseError') || this;
    }
    return DataBaseError;
}(OperationError));
exports.DataBaseError = DataBaseError;
var DuplicateFieldError = /** @class */ (function (_super) {
    __extends(DuplicateFieldError, _super);
    function DuplicateFieldError(message) {
        if (message === void 0) { message = "Mongo Error"; }
        return _super.call(this, message, 400, 'DuplicateFieldError') || this;
    }
    return DuplicateFieldError;
}(OperationError));
exports.DuplicateFieldError = DuplicateFieldError;
//# sourceMappingURL=errors.js.map