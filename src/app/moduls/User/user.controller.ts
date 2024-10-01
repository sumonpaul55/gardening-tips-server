import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAlluser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user retrived",
    data: result,
  });
});
export const userController = { getAlluser };
