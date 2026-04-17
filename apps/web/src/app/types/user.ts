export const birthTableName = "profiles";

export interface AuthUser {
  id: string;
  email?: string | null;
}

export type loginPageType =
  | "login"
  | "signup"
  | "signupComplete"
  | "forgotPassword";
