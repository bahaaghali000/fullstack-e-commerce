import { z } from "zod";

const SignupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 chars" })
    .max(20, { message: "Username must be at most 20 chars" }),
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

export { SignupSchema };
