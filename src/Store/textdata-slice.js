import { createSlice } from "@reduxjs/toolkit";

const textDataSlice = createSlice({
  name: "textData",
  initialState: { past: [], present: "", future: [] },
  reducers: {
    getTextData(state, action) {
      state.past = [...state.past, state.present];
      state.present = action.payload;
      state.future = [state.present];
    },
    undoText(state) {
      if (state.past.length - 1 < 0) {
        console.log("no more undfined");
        return;
      } else {
        console.log(state.present.length);
        state.present = state.past[state.past.length - 1];
        state.past = state.past.slice(0, state.past.length - 1);
        state.future = [state.present, ...state.future];
        console.log(state.past);
        // console.log(state.future);
      }
    },
    RedoText(state) {
      if (state.future.length - 1 <= 0) {
        console.log("undefined is here");
      } else {
        console.log(...state.future);
        state.present = state.future[1];
        console.log("we are here");
        console.log(state.present);
        state.past = [...state.past, state.present];
        state.future = state.future.slice(1);
        console.log(...state.future);
        console.log(state.past);
      }
    },
    boldText(state) {
      state.present = state.present.concat("**Strong text**" + "\n");
      console.log(state.present);
      console.log(state.future.length);
    },
    italicText(state) {
      state.present = state.present + "*emphasized text*" + "\n ";
      console.log(state.present);
      console.log(state.future.length);
    },
    headingText(state) {
      state.present = state.present + "## Heading" + "\n";
    },
    strikeThroughText(state) {
      state.present = state.present + "~~strikethrough text~~" + "\n";
      console.log(state.present);
    },
    unorderedList(state) {
      state.present = state.present + "- List item" + "\n";
      console.log(state.present);
    },
  },
});

export const textDataActions = textDataSlice.actions;
export default textDataSlice;
