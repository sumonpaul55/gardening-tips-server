import express from "express";
import { authRouter } from "./moduls/Auth/auth.route";
import { userRoute } from "./moduls/User/user.route";
import { postRouter } from "./moduls/posts/post.route";
import { categoryRouter } from "./moduls/category/category.route";

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
  {
    path: "/category",
    route: categoryRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
