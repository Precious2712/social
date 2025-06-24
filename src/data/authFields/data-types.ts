interface aboutMe {
    aboutYourself: string;
    maritalStatus: string;
    religion: string;
    _id: string
}

interface hobbies {
    one: string;
    three: string;
    two: string;
    _id: string
}

interface info {
    age: number;
    country: string;
    gender: string;
    occupation: string;
    _id: string
}

export interface portfolio {
    firstname: string;
    lastname: string;
    username: string;
    id: string;
    about: [aboutMe];
    hobby: [hobbies];
    profileInfo: [info]
}