"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    post: {
        type: String,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    activity: [
        {
            userId: mongoose_1.Schema.Types.ObjectId,
            comment: String,
            votes: Boolean,
        },
    ],
    category: { type: mongoose_1.Schema.Types.ObjectId, required: [true, "Post category is required"], ref: "Category" },
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
