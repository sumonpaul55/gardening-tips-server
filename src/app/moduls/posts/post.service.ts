import { TPost } from "./post.interface";
import { Post } from "./post.model";

const makePostDb = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};
const getAllPost = async () => {
  return await Post.find();
};
export const postService = {
  makePostDb,
  getAllPost,
};
