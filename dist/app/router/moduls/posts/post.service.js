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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const post_model_1 = require("./post.model");
const makePostDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.create(payload);
    return result;
});
const getAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.Post.find().populate("userId").populate("category");
});
const getVoteSummeryDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = post_model_1.Post.aggregate([{ $match: { userId: id } }]);
    return result;
});
// get post by id
const getPostByidDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.Post.findById(id).populate("userId").populate("category");
});
exports.postService = {
    makePostDb,
    getAllPost,
    getVoteSummeryDb,
    getPostByidDb,
};
