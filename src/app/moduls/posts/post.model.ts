import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
  title: { type: String, require: true },
  post: {
    type: String,
  },
});

export const Post = model<TPost>("Post", postSchema);
