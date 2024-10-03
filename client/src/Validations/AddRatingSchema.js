import { z } from "zod";

const AddRatingSchema = z.object({
  rating: z
    .number({ required_error: "Rating is required" })
    .positive()
    .int()
    .gt(0, { message: "Rating must be a positive integer" })
    .lte(5, { message: "Rating must be at most 5 Stars" }),
  comment: z
    .string()
    .min(5, { message: "Comment must be at least 5 chars" })
    .max(250, { message: "Comment must be at most 250 chars" }),
});

export { AddRatingSchema };
