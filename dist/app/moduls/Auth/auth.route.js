"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_validation_1 = require("./auth.validation");
const auth_controler_1 = require("./auth.controler");
const validateRequest_1 = __importStar(require("../../middleWare/validateRequest"));
const authGaurd_1 = __importDefault(require("../../middleWare/authGaurd"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post("/register", 
// upload.single("file"),
// (req, res, next) => {
//   req.body = JSON.parse(req.body.data);
//   next();
// },
(0, validateRequest_1.default)(auth_validation_1.authValidation.registerUserValidationSchema), auth_controler_1.authController.registerUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginValidation), auth_controler_1.authController.loginUser);
router.post("/refresh-token", (0, validateRequest_1.validateRequestCookies)(auth_validation_1.authValidation.refreshTokenValidation), auth_controler_1.authController.refreshToken);
// update user
router.put("/update-user/:id", 
// upload.single("file"),
// (req, res, next) => {
//   req.body = JSON.parse(req.body.data);
//   next();
// },
(0, authGaurd_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(auth_validation_1.authValidation.updateUserValidationSchema), auth_controler_1.authController.updateUser);
exports.authRouter = router;
