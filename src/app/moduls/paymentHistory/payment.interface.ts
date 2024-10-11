import { z } from "zod";
import mongoose from "mongoose";
import { paymentValidation } from "./paymentValidation";

export type TPayment = {
  user: mongoose.Types.ObjectId;
  paymentId: string;
  paymentTime: number;
  isDeleted?: boolean;
};

export type TBookingInfer = z.infer<typeof paymentValidation.paymentValidationschema>;
