import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
  title: { type: String, require: true },
  post: {
    type: String,
  },
  userId: { type: Schema.Types.ObjectId },
  activity: [
    {
      userId: Schema.Types.ObjectId,
      comment: String,
      votes: Boolean,
    },
  ],
  category: { type: Schema.Types.ObjectId, required: [true, "Post category is required"] },
});

export const Post = model<TPost>("Post", postSchema);
