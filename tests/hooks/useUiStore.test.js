/** @jest-environment jsdom */
import { renderHook, act } from "@testing-library/react";
import { useUiStore } from "./../../src/hooks/useUiStore";
import { store } from "./../../src/store/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../../src/store/ui/uiSlice";
import { initialStateUi } from "./../../src/store/ui/uiSlice";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Unit Test for useUiStore hook", () => {
  let mockStoreInstance;
  beforeEach(() => {
    const mockStore = getMockStore(initialStateUi);
    mockStoreInstance = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
  });

  it("should be return default values", () => {
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.isDateModalOpen).toBeFalsy();
    expect(typeof result.current.openDateModal).toBe("function");
    expect(typeof result.current.closeDateModal).toBe("function");
  });

  it("should be return default values with another solution", () => {
    const { result } = mockStoreInstance;

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  it("should be trigger isDateModalOpen and change to true", () => {
    const { result } = mockStoreInstance;

    const { openDateModal } = result.current;
    act(() => openDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  it("should be trigger closeDateModal and change to false", () => {
    const { result } = mockStoreInstance;

    const { openDateModal, closeDateModal } = result.current;
    act(() => openDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();

    act(() => closeDateModal());
    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
