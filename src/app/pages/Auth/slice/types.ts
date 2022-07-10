/* --- STATE --- */
export interface UserState {
  userDetails: any;
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
}
