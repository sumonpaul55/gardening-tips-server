"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_validation_1 = require("./auth.validation");
const auth_controler_1 = require("./auth.controler");
const validateRequest_1 = __importDefault(require("../../middleWare/validateRequest"));
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.authValidation.registerUserValidationSchema), auth_controler_1.authController.registerUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginValidation), auth_controler_1.authController.loginUser);
exports.authRouter = router;
