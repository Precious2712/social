import { z } from 'zod';

export const personalData = z.object({
    firstname: z.string()
        .min(8, 'minimum length is 8')
        .max(12, 'maximum length is 12'),

    lastname: z.string()
        .min(8, 'minimum length is 8')
        .max(12, 'maximum length is 12'),

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