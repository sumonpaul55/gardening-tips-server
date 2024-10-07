import { z } from "zod";

export const postValidationSchema = z.object({
  title: z.string().min(1, "Title is required"), // Ensure the title is a non-empty string
  post: z.any(), // Since post is of type `any`, we can use `z.any()` or refine it based on specific needs
  userId: z.string({ required_error: "User id required" }), // Ensure the userId is a non-empty string
  activity: z
    .array(
      z.object({
        userId: z.string().min(1, "User ID is required for activity"), // Each activity should have a userId
        comment: z.string().min(1, "Comment is required"), // Ensure each comment is non-empty
        votes: z.boolean(), // Validate that votes should be boolean (true/false)
      })
    )
    .optional(), // Optional field for activity array
  category: z.string({ required_error: "Post category is required" }),
});

export type TPost = z.infer<typeof postValidationSchema>; // This infers the type from the schema
