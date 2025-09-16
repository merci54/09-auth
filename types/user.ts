export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type AuthProps = {
  email: string;
  password: string;
};

export interface CheckSessionRequest {
  success: boolean;
}

export type UpdateMeProps = {
  username: string;
  email?: string;
};
