import { z } from "zod";

export const registrationFormSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const connectionFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  stops: z.array(
    z.object({ id: z.string().min(1, { message: "Please choose a stop" }) }),
  ),
});
