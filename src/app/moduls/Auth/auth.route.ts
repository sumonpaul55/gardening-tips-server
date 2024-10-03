import { Router } from "express";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controler";
import validateRequest from "../../middleWare/validateRequest";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();
router.post(
  "/register",
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(authValidation.registerUserValidationSchema),
  authController.registerUser
);
router.post("/login", validateRequest(authValidation.loginValidation), authController.loginUser);

export const authRouter = router;
