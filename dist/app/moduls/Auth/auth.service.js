"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../User/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const verifyJWT_1 = require("../../utils/verifyJWT");
const config_1 = __importDefault(require("../../config"));
const registerUserDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exist
    // if (file) {
    //   const imageName = `${Math.random() * 5 + Date.now() + payload.name}`;
    //   const path = String(file?.path);
    //   const { secure_url }: any = await sendImageToCloudinary(imageName, path);
    //   payload.profilePhoto = secure_url;
    // }
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user already exist");
    }
    const newUser = yield user_model_1.User.create(payload);
    const tokenPayload = {
        _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
        name: newUser === null || newUser === void 0 ? void 0 : newUser.name,
        email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
        phoneNumber: newUser === null || newUser === void 0 ? void 0 : newUser.phoneNumber,
        role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
    };
    const accessToken = (0, verifyJWT_1.createToken)(tokenPayload, config_1.default.accessTokenSecret, config_1.default.accessTokenExpiresIn);
    const refreshToken = (0, verifyJWT_1.createToken)(tokenPayload, config_1.default.jwtRefreshSecret, config_1.default.refreshTokenExpireIn);
    return {
        accessToken,
        refreshToken,
    };
});
const loginToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found!");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    const tokenPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, verifyJWT_1.createToken)(tokenPayload, config_1.default.accessTokenSecret, config_1.default.accessTokenExpiresIn);
    const refreshToken = (0, verifyJWT_1.createToken)(tokenPayload, config_1.default.jwtRefreshSecret, config_1.default.refreshTokenExpireIn);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenDb = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtRefreshSecret);
    const { email, iat } = decoded;
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found!");
    }
    if (user.passwordChangedAt && user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const tokenPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, verifyJWT_1.createToken)(tokenPayload, config_1.default.accessTokenSecret, config_1.default.accessTokenExpiresIn);
    return accessToken;
});
// update user
const updateUserDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exist
    // if (file) {
    // const imageName = `${Math.random() * 5 + Date.now() + payload.name}`;
    // const path = String(file?.path);
    // const { secure_url }: any = await sendImageToCloudinary(imageName, path);
    //   payload.profilePhoto = secure_url;
    // }
    const isUserExist = yield user_model_1.User.findById(id);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found withh this is");
    }
    // check image new url added
    if (!payload.profilePhoto) {
        payload.profilePhoto = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.profilePhoto;
    }
    const newUser = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true, upsert: true });
    return newUser;
});
exports.authServices = {
    registerUserDb,
    loginToDb,
    refreshTokenDb,
    updateUserDb,
};
