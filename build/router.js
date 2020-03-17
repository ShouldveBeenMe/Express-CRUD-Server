"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AppRouter = express_1.Router();
exports.AppRouter = AppRouter;
AppRouter.use('/', function () { throw new error("The server doesn't support this request"); });
//# sourceMappingURL=router.js.map