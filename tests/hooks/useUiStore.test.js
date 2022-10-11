/** @jest-environment jsdom */
import { renderHook } from "@testing-library/react";
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
  test("should be return default values", () => {
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.isDateModalOpen).toBeFalsy();
    expect(typeof result.current.openDateModal).toBe("function");
    expect(typeof result.current.closeDateModal).toBe("function");
  });

  test("should be return default values with another solution", () => {
    const mockStore = getMockStore(initialStateUi);
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });
});
