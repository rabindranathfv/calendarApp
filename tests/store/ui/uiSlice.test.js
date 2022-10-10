import uiSlice, {
  onCloseDateModal,
  onOpenDateModal,
} from "../../../src/store/ui/uiSlice";
import { initialStateUi } from "./../../../src/store/ui/uiSlice";

describe("Unit test for uiSlice", () => {
  it("should be return initialState for ui", () => {
    expect(uiSlice.getInitialState()).toEqual(initialStateUi);
  });

  it("should update isDateModalOpen", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
