import { z } from "zod";

const AddCategorySchema = z.object({
  categoryName: z
    .string()
    .trim()
    .min(1, { message: "Category Name is required" })
    .max(50, { message: "Category Name must be at most 50 characters " }),
});

export { AddCategorySchema };
