import { Router } from "express";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controler";
import authGaurd from "../../middleWare/authGaurd";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middleWare/validateRequest";

const router = Router();
router.post("/register", authGaurd(USER_ROLE.ADMIN), validateRequest(authValidation.registerUserValidationSchema), authController.registerUser);

export const authRouter = router;
