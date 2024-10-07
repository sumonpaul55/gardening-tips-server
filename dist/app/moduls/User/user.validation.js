"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaUpdate = exports.userSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, "Name is required"),
    role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
    email: zod_1.z.string().email("Invalid email address"),
    follower: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    following: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    upVotesItem: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    downVotesItem: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: zod_1.z.string().optional(),
    profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
});
exports.userSchemaUpdate = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, "Name is required").optional(),
    role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
    email: zod_1.z.string().email("Invalid email address").optional(),
    follower: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    following: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    upVotesItem: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    downVotesItem: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId)).optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
    phoneNumber: zod_1.z.string().optional(),
    profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
});
