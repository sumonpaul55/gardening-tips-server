import { Router } from "express";
import { userController } from "./user.controller";
import authGaurd from "../../middleWare/authGaurd";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middleWare/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();
router.get("/", userController.getAlluser);
router.get("/:email", authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN), userController.getUserByEmail);
router.get("/id/:id", userController.getUserById);
router.put(
  "/follow-unfollow",
  authGaurd(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(userValidation.followUnfollowValidationSchema),
  userController.followUnfollow
);

export const userRoute = router;
