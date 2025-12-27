import { z } from 'zod';

export const personalData = z.object({
    firstname: z.string(),

    lastname: z.string(),

    profileInfo: z.array(z.object({
        gender: z.string(),
        country: z.string(),
        occupation: z.string(),
        age: z.number()
    })),

    about: z.array(z.object({
        aboutYourself: z.string(),
        religion: z.string(),
        maritalStatus: z.string()
    })),

    hobby: z.array(z.object({
        one: z.string(),
        two: z.string(),
        three: z.string(),
    }))
});

export type userBioInfo = z.infer<typeof personalData>