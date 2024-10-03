"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (tokenPayload, secret, expireIn) => {
    return jsonwebtoken_1.default.sign(tokenPayload, secret, { expiresIn: expireIn });
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new AppError_1.default(401, "You are not authorized");
    }
};
exports.verifyToken = verifyToken;
