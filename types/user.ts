export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type AuthProps = {
  email: string;
  password: string;
};
