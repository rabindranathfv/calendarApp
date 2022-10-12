import { testUserCredentials } from "./testUser";

export const initialStateChecking = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const initialStateAuthenticated = {
  status: "authenticated",
  user: {
    ...testUserCredentials,
  },
  errorMessage: undefined,
};

export const initialStateNotAuthenticated = {
  status: "not-authenticated",
  user: {},
  errorMessage: "error login",
};
