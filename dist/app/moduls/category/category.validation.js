"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const categoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Category name required" }),
    image: zod_1.z.string().optional(),
});
exports.categoryValidation = {
    categoryValidationSchema,
};
