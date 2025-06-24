
type ProfileInfo = {
  gender: string;
  country: string;
  occupation: string;
  age: number;
  _id: string;
};

type AboutInfo = {
  aboutYourself: string;
  religion: string;
  maritalStatus: string;
  _id: string;
};

type HobbyInfo = {
  one: string;
  two: string;
  three: string;
  _id: string;
};

export type User = {
  _id: string;
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profileInfo: ProfileInfo[];
  about: AboutInfo[];
  hobby: HobbyInfo[];
  createdAt: string;
  updatedAt: string;
};