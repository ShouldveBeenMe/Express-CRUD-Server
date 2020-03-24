"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var person_router_1 = require("./person/person.router");
var AppRouter = express_1.Router();
exports.AppRouter = AppRouter;
AppRouter.use('/person', person_router_1.personRouter);
AppRouter.use('/', function () {
    // console.log('not achieved general');
    throw new Error("The server doesn't support this request");
});
//# sourceMappingURL=router.js.map