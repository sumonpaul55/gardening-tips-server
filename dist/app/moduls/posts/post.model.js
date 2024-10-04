"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, require: true },
    post: {
        type: String,
    },
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
