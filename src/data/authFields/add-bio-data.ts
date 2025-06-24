export interface FieldConfig {
    name: string;
    type: string;
    placeHolder: string;
    label: string;
    required: boolean;
}

interface personalData {
    firstname: FieldConfig;
    lastname: FieldConfig;
    profileInfo: FieldConfig[];
    about: FieldConfig[];
    hobby: FieldConfig[];
}

export const bioProfile: personalData = {
    firstname: {
        name: "firstname",
        type: "text",
        placeHolder: "Enter your first name",
        label: "First Name",
        required: true,
    },
    lastname: {
        name: "lastname",
        type: "text",
        placeHolder: "Enter your last name",
        label: "Last Name",
        required: true,
    },
    profileInfo: [
        {
            name: "gender",
            type: "text",
            placeHolder: "Select your gender",
            label: "Gender",
            required: true,
        },
        {
            name: "country",
            type: "text",
            placeHolder: "Enter your country",
            label: "Country",
            required: true,
        },
        {
            name: "occupation",
            type: "text",
            placeHolder: "Enter your occupation",
            label: "Occupation",
            required: true,
        },
        {
            name: "age",
            type: "number",
            placeHolder: "Enter your age",
            label: "Age",
            required: true,
        },
    ],
    about: [
        {
            name: "aboutYourself",
            type: "textarea",
            placeHolder: "Tell us about yourself",
            label: "About Yourself",
            required: true,
        },
        {
            name: "religion",
            type: "text",
            placeHolder: "Enter your religion",
            label: "Religion",
            required: true,
        },
        {
            name: "maritalStatus",
            type: "text",
            placeHolder: "Select marital status",
            label: "Marital Status",
            required: true,
        },
    ],
    hobby: [
        {
            name: "one",
            type: "text",
            placeHolder: "Enter a hobby",
            label: "Hobby 1",
            required: true,
        },
        {
            name: "two",
            type: "text",
            placeHolder: "Enter a hobby",
            label: "Hobby 2",
            required: true,
        },
        {
            name: "three",
            type: "text",
            placeHolder: "Enter a hobby",
            label: "Hobby 3",
            required: true,
        }
    ]
};