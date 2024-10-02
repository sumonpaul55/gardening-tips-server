import { Router } from "express";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controler";
import validateRequest from "../../middleWare/validateRequest";

const router = Router();
router.post("/register", validateRequest(authValidation.registerUserValidationSchema), authController.registerUser);
router.post("/login", validateRequest(authValidation.loginValidation), authController.loginUser);

export const authRouter = router;
