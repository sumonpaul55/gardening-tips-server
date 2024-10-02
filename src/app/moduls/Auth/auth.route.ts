import { Router } from "express";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controler";
import validateRequest from "../../middleWare/validateRequest";

const router = Router();
router.post("/register", validateRequest(authValidation.registerUserValidationSchema), authController.registerUser);

export const authRouter = router;
