import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postService } from "./post.service";

const makePost = catchAsync(async (req, res) => {
  const result = await postService.makePostDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post Created successfully",
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const result = await postService.getAllPost();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrive successfully",
    data: result,
  });
});
export const postController = {
  makePost,
  getPosts,
};
