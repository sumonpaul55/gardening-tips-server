"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couldinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const _1 = __importDefault(require("."));
cloudinary_1.v2.config({
    cloud_name: _1.default.cloude_Name,
    api_key: _1.default.cloud_Api_key,
    api_secret: _1.default.cloud_Secret,
});
exports.couldinaryUpload = cloudinary_1.v2;
