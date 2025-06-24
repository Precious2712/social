import { z } from "zod";

export const signUpFormSchema = z.object({
    username: z.string().
        min(6, 'minimum is six').
        max(9, 'maximum is nine'),

    password: z.string().
        min(7, 'minimum is eight').
        max(8, 'maximum is exight')
})

export const loginFormSchema = z.object({
    username: z.string(),
    password: z.string()
})

export type userSignup = z.infer<typeof signUpFormSchema>

export type userLogin = z.infer<typeof loginFormSchema>