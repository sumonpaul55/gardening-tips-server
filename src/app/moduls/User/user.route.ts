import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.get("/", userController.getAlluser);
router.get("/:email", userController.getUserByEmail);

export const userRoute = router;
