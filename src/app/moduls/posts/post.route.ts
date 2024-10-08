import { Router } from "express";
import { postController } from "./post.controller";
import authGaurd from "../../middleWare/authGaurd";
import { USER_ROLE } from "../User/user.constant";

const router = Router();
router.post("/", authGaurd(USER_ROLE.USER), postController.makePost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostByid);
router.get("/postby-user/:id", postController.getPostByUserId);
router.get("/voteSummery", postController.getMyPostVoteSummery);
router.put("/handle-voting/:postId", authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER), postController.handleVoting);
export const postRouter = router;
