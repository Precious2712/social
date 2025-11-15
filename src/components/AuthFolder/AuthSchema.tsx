import { z } from "zod";

export const signUpFormSchema = z.object({
    username: z.string(),

    password: z.string()
})

export const loginFormSchema = z.object({
    username: z.string(),
    password: z.string()
})

export type userSignup = z.infer<typeof signUpFormSchema>

export type userLogin = z.infer<typeof loginFormSchema>