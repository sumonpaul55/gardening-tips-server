"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middleWare/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleWare/notFound"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ["http://localhost:3000"] }));
app.use((0, cookie_parser_1.default)());
app.use("/api", router_1.default);
app.get("/", (req, res) => {
    res.status(200).json("Welcome to the gardenig tips server");
});
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
