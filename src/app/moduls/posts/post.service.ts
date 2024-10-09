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
// const getVoteSummeryDb = async (id: string) => {
//   const result = Post.aggregate([{ $unwind: "$activity" }]);
//   return result;
// };

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
  console.log(userAlreadyVoted);
  if (!userAlreadyVoted.length) {
    // downvotes
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { activity: { userId: payload.userId, votes: payload.votes } },
      },
      { new: true }
    );
    return { message: "voted successfully" };
  }
  await Post.findOneAndUpdate({ _id: postId, "activity.userId": payload.userId }, { $set: { "activity.$.votes": payload.votes } }, { new: true });
  return { message: "voted successfully" };
};

const addComment = async (postId: string, payload: { userId: string; comment: string }) => {
  const postExist = await Post.findById(postId);
  const userExist = await User.findById(payload.userId);

  if (!postExist || !userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Post or User not found");
  }

  // Check if the user has already commented on the post
  const userAlreadyCommented = await Post.findOne({
    _id: postId,
    "activity.userId": payload.userId,
  });

  if (!userAlreadyCommented) {
    // If the user has not commented, push a new entry to the activity array
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { activity: { userId: payload.userId, comment: [payload.comment] } },
      },
      { new: true }
    );
    return { message: "Comment added successfully" };
  }

  // If the user has already commented, update their comment by appending the new one
  await Post.findOneAndUpdate(
    { _id: postId, "activity.userId": payload.userId },
    {
      $push: { "activity.$.comment": [payload.comment] }, // Overwrite the existing comment with a new one
    },
    { new: true }
  );

  return { message: "Comment updated successfully" };
};

export const postService = {
  makePostDb,
  getAllPost,
  // getVoteSummeryDb,
  getPostByidDb,
  getPostByUserIdDb,
  handleVote,
  addComment,
};
