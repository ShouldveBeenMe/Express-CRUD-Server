"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable radix */
var express_1 = __importDefault(require("express"));
// For POST-Support
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post('/api/sayHello', function (request, response) {
    var a = request.body.a;
    var b = request.body.b;
    var c = parseInt(a) + parseInt(b);
    response.send("Result : " + c);
    console.log("Result : " + c);
});
app.listen(3000);
//# sourceMappingURL=expressTry.js.map