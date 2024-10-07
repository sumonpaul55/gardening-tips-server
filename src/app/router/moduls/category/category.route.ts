import { Router } from "express";
import authGaurd from "../../../middleWare/authGaurd";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../../middleWare/validateRequest";
import { categoryValidation } from "./category.validation";
import { categoryController } from "./category.controller";

const router = Router();

router.post("/", authGaurd(USER_ROLE.USER), validateRequest(categoryValidation.categoryValidationSchema), categoryController.createCatergory);
router.get("/", authGaurd(USER_ROLE.USER, USER_ROLE.ADMIN), categoryController.getAllCategory);

export const categoryRouter = router;
