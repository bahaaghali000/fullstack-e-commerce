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
    // .min(8, { message: "Bio must be at least 8 characters" })
    .max(250, { message: "Bio must be at most 250 characters" }),
  phoneNumber: z.string(),
  // .min(8, { message: "phoneNumber must be at least 8 characters" }),
  city: z.string(),
  // .min(4, { message: "City must be at least 4 characters" }),
});

export { ProfileSchema };
