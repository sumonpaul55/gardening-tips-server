import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../User/user.model";

const makePostDb = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};
const getAllPost = async () => {
  return await Post.find().populate("userId").populate("category");
};
const getVoteSummeryDb = async (id: string) => {
  const result = Post.aggregate([{ $match: { userId: id } }]);
  return result;
};
// get post by id
const getPostByidDb = async (id: string) => {
  return await Post.findById(id).populate("userId").populate("category");
};
const getPostByUserIdDb = async (id: string) => {
  const result = await Post.find({ userId: id }).populate("userId").populate("category");
  return result;
};
const handleVote = async (postId: string, payload: { userId: string; votes: boolean }) => {
  const postExist = await Post.findById(postId);
  const userExist = await User.findById(payload.userId);
  if (!postExist || !userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post or User not found");
  }
  const userAlreadyVoted = await Post.find({ _id: postId, "activity.userId": payload.userId });
  // console.log(userAlreadyVoted);
  if (!userAlreadyVoted.length) {
    // downvotes
    await Post.findByIdAndUpdate(postId, { "activity.userId": payload.userId, "activity.votes": payload.votes }, { new: true });
    return { message: "Up voted successfully" };
  }

  await Post.findByIdAndUpdate(postId, { "activity.userId": payload.userId, "activity.votes": payload.votes }, { new: true });
  return { message: "Down voted successfully" };
};
export const postService = {
  makePostDb,
  getAllPost,
  getVoteSummeryDb,
  getPostByidDb,
  getPostByUserIdDb,
  handleVote,
};
