import { Router } from "express";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controler";
import validateRequest from "../../middleWare/validateRequest";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleWare/bodyParser";

const router = Router();
router.post(
  "/register",
  multerUpload.fields([{ name: "userImage" }]),
  parseBody,
  validateRequest(authValidation.registerUserValidationSchema),
  authController.registerUser
);
router.post("/login", validateRequest(authValidation.loginValidation), authController.loginUser);

export const authRouter = router;
