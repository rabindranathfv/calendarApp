/** @jest-environment jsdom */
import { renderHook, act, waitFor } from "@testing-library/react";
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
import { initialStateNotAuthenticated } from "./../fixtures/authState";
import calendarApi from "./../../src/api/calendarAPI";

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
  let mockStore;

  beforeEach(() => {
    mockStore = getMockStore({
      authInitState: initialStateChecking,
      calendarInitState: calendarStateWithEvents,
    });
    mockStoreInstance = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
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
      name: "User Test",
      uid: "6346d687b8db34645d8140cc",
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  it("should be call startLogin and execute endpoint /auth and return error because of wrong credentials", async () => {
    localStorage.clear();
    const { result } = mockStoreInstance;
    const { startLogin } = result.current;

    // TODO: you need to have your backend running for get a response of mocket the call api
    await act(
      async () =>
        await startLogin({
          email: 1234, // IT'S NOT A VALID EMAIL
          password: testUserCredentials.password,
        })
    );
    expect(result.current.status).toBe(initialStateNotAuthenticated.status);
    expect(result.current.errorMessage).toBe("wrong credentials");

    await waitFor(async () => expect(result.current.errorMessage).toBeFalsy(), {
      timeout: 5000,
    });
  });

  it("should be call startRegister and execute endpoint /auth/register and create a new user successfully", async () => {
    localStorage.clear();
    const { result } = mockStoreInstance;
    const { startRegister } = result.current;

    const startRegisterSpy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "some-mock-uid",
        name: "test user Mocked",
        token: "some-token-mocked",
      },
    });
    // TODO: you need to have your backend running for get a response of mocket the call api
    const numUserGen = Math.ceil(Math.random() * 1000);
    await act(
      async () =>
        await startRegister({
          name: `New User${numUserGen.toString()}`,
          email: `newuser${numUserGen}@gmail.com`,
          password: testUserCredentials.password,
        })
    );

    expect(result.current.status).toBe(initialStateAuthenticated.status);
    expect(result.current.errorMessage).toBeFalsy();
    expect(result.current.user).toEqual({
      name: expect.any(String),
      uid: expect.any(String),
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
    expect(startRegisterSpy).toBeCalled();

    startRegisterSpy.mockRestore(); // unmocked post
  });

  it("should be call checkAuthToken and execute endpoint /auth/renew and update user token in localStorage successfully", async () => {
    localStorage.clear();
    localStorage.setItem("token", "valid-token");
    mockStore = getMockStore({
      authInitState: initialStateAuthenticated,
      calendarInitState: calendarStateWithEvents,
    });
    mockStoreInstance = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { result } = mockStoreInstance;
    const { checkAuthToken } = result.current;

    const checkAuthTokenSpy = jest.spyOn(calendarApi, "get").mockReturnValue({
      data: {
        ok: true,
        msg: "renovalToken succesfully",
        uid: "valid-uid",
        name: "Test User",
        token: "valid-token",
      },
    });
    await act(async () => await checkAuthToken());

    expect(checkAuthTokenSpy).toHaveBeenCalled();
    expect(result.current.status).toBe("authenticated");
    expect(result.current.user).toEqual({
      name: "Test User",
      uid: "valid-uid",
    });
  });

  it("should be call checkAuthToken with no token in localStorage", async () => {
    localStorage.clear();
    const { result } = mockStoreInstance;
    const { checkAuthToken } = result.current;

    // TODO: you need to have your backend running for get a response of mocket the call api
    await act(async () => await checkAuthToken());

    expect(result.current.status).toBe(initialStateNotAuthenticated.status);
    expect(result.current.user).toEqual(initialStateNotAuthenticated.user);
    expect(result.current.errorMessage).toBeFalsy();
  });

  it("should be call startLogout successfully", async () => {
    mockStore = getMockStore({
      authInitState: initialStateAuthenticated,
      calendarInitState: calendarStateWithEvents,
    });
    mockStoreInstance = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { result } = mockStoreInstance;
    const { startLogout } = result.current;
    await act(async () => await startLogout());

    expect(localStorage.getItem("token")).toBeFalsy();
    expect(result.current.status).toBe(initialStateNotAuthenticated.status);
    expect(result.current.user).toEqual(initialStateNotAuthenticated.user);
    expect(result.current.errorMessage).toBeFalsy();
  });
});
