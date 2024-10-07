"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authGaurd_1 = __importDefault(require("../../middleWare/authGaurd"));
const user_constant_1 = require("./user.constant");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.userController.getAlluser);
router.get("/:email", (0, authGaurd_1.default)(user_constant_1.USER_ROLE.USER), user_controller_1.userController.getUserByEmail);
router.get("/id/:id", user_controller_1.userController.getUserById);
exports.userRoute = router;
