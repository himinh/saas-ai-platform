import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Must be at least 8 characters"),
});

export const RegisterSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Must be at least 8 characters"),
	confirmPassword: z.string().min(8, "Must be at least 8 characters"),
	fullName: z.string().min(2, "Must be at least 2 characters"),
});
