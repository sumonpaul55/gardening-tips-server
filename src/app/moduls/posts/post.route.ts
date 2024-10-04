import { Router } from "express";
import { postController } from "./post.controller";
import authGaurd from "../../middleWare/authGaurd";
import { USER_ROLE } from "../User/user.constant";

const router = Router();
router.post("/", authGaurd(USER_ROLE.USER), postController.makePost);
router.get("/", postController.getPosts);
export const postRouter = router;
