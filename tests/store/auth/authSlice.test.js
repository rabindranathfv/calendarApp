import authSlice, {
  initialStateAuth,
  onChecking,
  onClearError,
  onLogin,
  onLogout,
} from "../../../src/store/auth/auth";
import {
  initialStateAuthenticated,
  initialStateNotAuthenticated,
  initialStateChecking,
} from "./../../fixtures/authState";
import { testUserCredentials } from "./../../fixtures/testUser";

describe("Unit test for authSlice", () => {
  let state;

  beforeEach(() => {
    state = authSlice.getInitialState();
  });

  it("should be return initialState for auth slice", () => {
    expect(authSlice.getInitialState()).toEqual(initialStateAuth);
  });

  it("should be update state after trigger onLogin", () => {
    state = authSlice.reducer(state, onChecking());
    expect(state).toEqual(initialStateChecking);
  });

  it("should be update state after trigger onLogin", () => {
    state = authSlice.reducer(state, onLogin(testUserCredentials));
    expect(state.status).toEqual(initialStateAuthenticated.status);
    expect(state.user).toEqual(testUserCredentials);
    expect(state.errorMessage).toBeFalsy();
  });

  it("should be update state after trigger onLogout", () => {
    state = authSlice.reducer(state, onLogout("error login"));
    expect(state).toEqual(initialStateNotAuthenticated);
  });

  it("should be update state after trigger onClearError", () => {
    state = authSlice.reducer(initialStateNotAuthenticated, onClearError());
    expect(state.errorMessage).toBeFalsy();
  });
});
