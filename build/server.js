"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var mongoose = __importStar(require("mongoose"));
var router_1 = require("./router");
var portToListen = process.env.PORT || 5000;
var app = express_1.default();
var connection = mongoose.Connection;
var dbURL = "mongodb://localhost/groupsDB";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router_1.AppRouter);
app.listen();
app.use(bodyParser.json());
app.post('/', function (request, response) {
    response.send(request.body);
});
app.listen(portToListen, function () { return console.log("Listening on port " + portToListen); });
//# sourceMappingURL=server.js.map