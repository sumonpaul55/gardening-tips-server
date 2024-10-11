import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const payemntModelSchema = new Schema<TPayment>({
  paymentId: { type: String, required: true },
  paymentTime: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  isDeleted: { type: Boolean, default: false },
});

export const Payments = model("Payments", payemntModelSchema);
