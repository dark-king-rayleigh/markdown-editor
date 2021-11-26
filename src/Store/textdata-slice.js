import { createSlice } from "@reduxjs/toolkit";

const textDataSlice = createSlice({
  name: "textData",
  initialState: { text: "" },
  reducers: {
    getTextData(state, action) {
      state.text = action.payload;
    },
  },
});

export const textDataActions = textDataSlice.actions;
export default textDataSlice;
