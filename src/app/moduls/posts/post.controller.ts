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

const postVoteSummery = catchAsync(async (req, res) => {
  const result = await postService.getVoteSummeryDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Upvotes and dowVotes retrive",
    data: result,
  });
});

// get post by id
const getPostByid = catchAsync(async (req, res) => {
  const result = await postService.getPostByidDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrive successfully",
    data: result,
  });
});
// get post by userId
const getPostByUserId = catchAsync(async (req, res) => {
  const result = await postService.getPostByUserIdDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrive successfully",
    data: result,
  });
});
const handleVoting = catchAsync(async (req, res) => {
  const result = await postService.handleVote(req.params.postId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.message,
    data: null,
  });
});
const addComments = catchAsync(async (req, res) => {
  const result = await postService.addComment(req.params.postId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result?.message,
    data: null,
  });
});
export const postController = {
  makePost,
  getPosts,
  postVoteSummery,
  getPostByid,
  getPostByUserId,
  handleVoting,
  addComments,
};
