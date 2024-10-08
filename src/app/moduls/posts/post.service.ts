import { TPost } from "./post.interface";
import { Post } from "./post.model";

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
export const postService = {
  makePostDb,
  getAllPost,
  getVoteSummeryDb,
  getPostByidDb,
};
