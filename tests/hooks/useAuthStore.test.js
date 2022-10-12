/** @jest-environment jsdom */
import { renderHook, act } from "@testing-library/react";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../src/store/auth/auth";
import calendarSlice from "../../src/store/calendar/calendarSlice";
import { calendarStateWithEvents } from "../fixtures/calendarState";
import { useAuthStore } from "./../../src/hooks/useAuthStore";
import {
  initialStateAuthenticated,
  initialStateChecking,
} from "./../fixtures/authState";
import { testUserCredentials } from "./../fixtures/testUser";

const getMockStore = ({ authInitState, calendarInitState }) => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    reducer: {
      calendar: calendarSlice.reducer,
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...authInitState },
      calendar: { ...calendarInitState },
    },
  });
};

describe("Unit Test for useAuthStore hook", () => {
  let mockStoreInstance;

  beforeEach(() => {
    const mockStore = getMockStore({
      authInitState: initialStateChecking,
      calendarInitState: calendarStateWithEvents,
    });
    mockStoreInstance = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
  });

  it("should be return default values with another solution", () => {
    const { result } = mockStoreInstance;

    expect(result.current).toEqual({
      status: initialStateChecking.status,
      user: initialStateChecking.user,
      errorMessage: initialStateChecking.errorMessage,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  it("should be call startLogin and execute endpoint /auth and save user data in localStorage successfully", async () => {
    localStorage.clear();
    const { result } = mockStoreInstance;
    const { startLogin } = result.current;

    // TODO: you need to have your backend running for get a response of mocket the call api
    await act(
      async () =>
        await startLogin({
          email: testUserCredentials.email,
          password: testUserCredentials.password,
        })
    );

    expect(result.current.status).toBe(initialStateAuthenticated.status);
    expect(result.current.errorMessage).toBeFalsy();
    expect(result.current.user).toEqual({
      name: initialStateAuthenticated.user.name,
      uid: initialStateAuthenticated.user.uid,
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  it("should be call startLogin and execute endpoint /auth and save user data in localStorage", async () => {
    localStorage.clear();
    const { result } = mockStoreInstance;
    const { startLogin } = result.current;

    // TODO: you need to have your backend running for get a response of mocket the call api
    await act(
      async () =>
        await startLogin({
          email: testUserCredentials.email,
          password: testUserCredentials.password,
        })
    );

    expect(result.current.status).toBe(initialStateAuthenticated.status);
    expect(result.current.errorMessage).toBeFalsy();
    expect(result.current.user).toEqual({
      name: initialStateAuthenticated.user.name,
      uid: initialStateAuthenticated.user.uid,
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });
});
