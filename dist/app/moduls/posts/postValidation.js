"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdateValidationSchema = exports.postValidationSchema = void 0;
const zod_1 = require("zod");
exports.postValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"), // Ensure the title is a non-empty string
    post: zod_1.z.any(), // Since post is of type `any`, we can use `z.any()` or refine it based on specific needs
    userId: zod_1.z.string({ required_error: "User id required" }), // Ensure the userId is a non-empty string
    activity: zod_1.z
        .array(zod_1.z.object({
        userId: zod_1.z.string().min(1, "User ID is required for activity").optional(), // Each activity should have a userId
        votes: zod_1.z.boolean().optional(), // Validate that votes should be boolean (true/false)
        comment: zod_1.z.array(zod_1.z.string().min(1, "Comment is required")).optional(),
    }))
        .optional(), // Optional field for activity array
    category: zod_1.z.string({ required_error: "Post category is required" }),
    premium: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.postUpdateValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(), // Ensure the title is a non-empty string
    post: zod_1.z.any().optional(), // Since post is of type `any`, we can use `z.any()` or refine it based on specific needs
    userId: zod_1.z.string({ required_error: "User id required" }).optional(), // Ensure the userId is a non-empty string
    // Optional field for activity array
    category: zod_1.z.string({ required_error: "Post category is required" }).optional(),
    premium: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
