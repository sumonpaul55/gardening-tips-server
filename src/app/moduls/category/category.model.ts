import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categroySchema = new Schema<TCategory>({
  name: { type: String, required: [true, "Category name is required"], unique: true },
  image: { type: String },
});

export const Category = model<TCategory>("Category", categroySchema);
