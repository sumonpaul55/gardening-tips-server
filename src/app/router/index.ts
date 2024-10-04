import express from "express";
import { authRouter } from "../moduls/Auth/auth.route";
import { userRoute } from "../moduls/User/user.route";
import { postRouter } from "../moduls/posts/post.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/post",
    route: postRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
