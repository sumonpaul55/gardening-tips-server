"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const authGaurd_1 = __importDefault(require("../../../middleWare/authGaurd"));
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, authGaurd_1.default)(user_constant_1.USER_ROLE.USER), post_controller_1.postController.makePost);
router.get("/", post_controller_1.postController.getPosts);
router.get("/:id", post_controller_1.postController.getPostByid);
router.get("/voteSummery", post_controller_1.postController.getMyPostVoteSummery);
exports.postRouter = router;
