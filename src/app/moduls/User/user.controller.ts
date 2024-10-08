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
const getUserByEmail = catchAsync(async (req, res) => {
  const result = await userService.getUsebyEmailDb(req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrived",
    data: result,
  });
});
const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUsebyIdDb(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Retrived",
    data: result,
  });
});
const followUnfollow = catchAsync(async (req, res) => {
  const reslut = await userService.addFollowerAndFolloing(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: reslut.message,
    data: null,
  });
});
export const userController = { getAlluser, getUserByEmail, getUserById, followUnfollow };
