import { Router } from "express";
import { paymenController } from "./payment.controller";

const router = Router();
router.post("/confirm-payment", paymenController.createPaymentHistory);

export const paymentRoute = router;
