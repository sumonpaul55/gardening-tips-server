import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createPaymentHistory = catchAsync(async (req, res) => {
  const result = await paymentService.paymentHistoryDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment Created successfully",
    data: result,
  });
});

export const paymenController = {
  createPaymentHistory,
};
