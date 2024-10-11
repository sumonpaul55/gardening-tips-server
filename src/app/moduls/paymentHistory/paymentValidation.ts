import { z } from "zod";

const paymentValidationschema = z.object({
  body: z.object({
    user: z.string({ required_error: "User id required" }),
    paymentId: z.string(),
    paymentTime: z.number(),
  }),
});

const updatePaymentValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(), // Optional ObjectId for user
    paymentId: z.string().optional(), // Optional string for payment ID
    paymentTime: z.string().optional(), // Optional string for payment time
  }),
});

export const paymentValidation = {
  paymentValidationschema,
  updatePaymentValidationSchema,
};
