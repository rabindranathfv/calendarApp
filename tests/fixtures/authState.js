export const initialStateChecking = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const initialStateAuthenticated = {
  status: "authenticated",
  user: {
    ui: "uid-test",
    name: "userTest",
  },
  errorMessage: undefined,
};

export const initialStateNotAuthenticated = {
  status: "not-authenticated",
  user: {},
  errorMessage: "error login",
};
