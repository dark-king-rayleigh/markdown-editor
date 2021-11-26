import { createSlice } from "@reduxjs/toolkit";

const readermodeSlice = createSlice({
  name: "readermode",
  initialState: { toggleReadermode: false },
  reducers: {
    toggle(state) {
      state.toggleReadermode = !state.toggleReadermode;
    },
  },
});

export const readermodeActions = readermodeSlice.actions;
export default readermodeSlice;
