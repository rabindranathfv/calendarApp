import { createSlice } from "@reduxjs/toolkit";

export const initialStateUi = {
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialStateUi,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;

export default uiSlice;
