import { z } from "zod";

const EditProductSchema = z.object({
  productName: z.string().trim().min(4, { message: "ProductName is required" }),
  shortDesc: z
    .string()
    .trim()
    .min(8, { message: "shortDesc must be at least 8 chars" })
    .max(250, { message: "shortDesc must be at most 250 chars" }),

  description: z
    .string()
    .trim()
    .min(8, { message: "description must be at least 8 chars" })
    .max(525, { message: "description must be at most 250 chars" }),
  price: z
    .string()
    .refine(
      (val) => {
        const parsed = Number(val);
        return !isNaN(parsed) && parsed > 0;
      },
      { message: "Price must be a positive number" }
    )
    .transform((val) => Number(val)),
  quantity: z
    .string()
    .refine(
      (val) => {
        const parsed = Number(val);
        return !isNaN(parsed) && parsed > 0;
      },
      { message: "Quantity must be a positive number" }
    )
    .transform((val) => Number(val)),
  productImage: z.any(),
  category: z.string().min(1, { message: "category is required" }),
});

export { EditProductSchema };
