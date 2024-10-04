import { z } from "zod";

const categoryValidationSchema = z.object({
  name: z.string({ required_error: "Category name required" }),
  image: z.string().optional(),
});

export const categoryValidation = {
  categoryValidationSchema,
};
