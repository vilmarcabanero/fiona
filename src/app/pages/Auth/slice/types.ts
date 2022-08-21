import { User } from 'db/models/User';

/* --- STATE --- */
export interface UserState {
  userDetails: User;
  loginPayload: any;
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  registerPayload: any;
  isAuthLoading: any;
  isEmailValid: any;
  emailError: any;
  isPasswordValid: any;
  passwordError: any;
  allUsers: any;
  userLoading: boolean;
}

export interface JwtDecode {
  iat: number;
  _id: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
  message: string;
  statusCode: number;
  error: string;
}
