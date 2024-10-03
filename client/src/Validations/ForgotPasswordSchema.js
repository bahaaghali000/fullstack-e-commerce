import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please Enter a vaild Email" }),
});

export { ForgotPasswordSchema };
