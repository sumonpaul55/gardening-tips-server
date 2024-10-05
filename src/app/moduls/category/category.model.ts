import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categroySchema = new Schema<TCategory>({
  category: { type: String, required: [true, "Category name is required"], unique: true },
  image: { type: String, default: null },
});

export const Category = model<TCategory>("Category", categroySchema);
