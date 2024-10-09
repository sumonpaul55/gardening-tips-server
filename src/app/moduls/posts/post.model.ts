import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
  title: { type: String, require: true },
  post: {
    type: String,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  activity: [
    {
      userId: Schema.Types.ObjectId,
      comment: [String],
      votes: { type: Boolean, default: false },
      _id: false,
    },
  ],
  category: { type: Schema.Types.ObjectId, required: [true, "Post category is required"], ref: "Category" },
});

export const Post = model<TPost>("Post", postSchema);
