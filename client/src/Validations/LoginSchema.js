import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please Enter a vaild Email" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 chars" }),
});

export { LoginSchema };
