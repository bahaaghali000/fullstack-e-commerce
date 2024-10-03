import { z } from "zod";

const ProfileSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please Enter a vaild Email" }),
  bio: z
    .string()
    .trim()
    .max(250, { message: "Bio must be at most 250 characters" }),
  phoneNumber: z.string(),
  city: z.string(),
});

export { ProfileSchema };
