import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUserDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Register successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginToDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfull",
    data: result,
  });
});
export const authController = {
  registerUser,
  loginUser,
};
