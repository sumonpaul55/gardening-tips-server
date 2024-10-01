import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.get("/", userController.getAlluser);

export const userRoute = router;
