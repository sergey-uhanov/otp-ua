export interface session {
  user: UserSession;
  expires: string;
}

interface UserSession {
  name?: string;
  email?: string;
  image?: string;
  role: string;
}
export interface ErrorType {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
