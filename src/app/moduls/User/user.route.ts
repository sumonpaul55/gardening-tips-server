import { Router } from "express";
import { userController } from "./user.controller";
import authGaurd from "../../middleWare/authGaurd";
import { USER_ROLE } from "./user.constant";

const router = Router();
router.get("/", userController.getAlluser);
router.get("/:email", authGaurd(USER_ROLE.USER), userController.getUserByEmail);

export const userRoute = router;
