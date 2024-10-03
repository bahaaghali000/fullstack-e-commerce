import { z } from "zod";

const RestPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" }),
    repassword: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords must match",
    path: ["repassword"],
  });

export { RestPasswordSchema };
