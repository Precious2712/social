interface aboutMe {
    profile: string;
    status: string;
    religion: string;
}

interface hobbies {
    one: string;
    three: string;
    two: string;
}

interface info {
    age: number;
    country: string;
    gender: string;
    occupation: string;
}

export interface data {
    userFirstName: string;
    userLastName: string;
    nickName: string;
    about: [aboutMe];
    hobby: [hobbies];
    profile: [info];
    _id: string;
}

export type sender = data[];