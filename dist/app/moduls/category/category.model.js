"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categroySchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Category name is required"], unique: true },
    image: { type: String },
});
exports.Category = (0, mongoose_1.model)("Category", categroySchema);
