import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TPayment } from "./payment.interface";
import { Payments } from "./payment.model";

const paymentHistoryDb = async (payload: TPayment) => {
  if (payload.paymentId) {
    return await Payments.create(payload);
  } else throw new AppError(httpStatus.NOT_FOUND, "transction id not found");
};

export const paymentService = {
  paymentHistoryDb,
};
