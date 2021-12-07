import { createSlice } from "@reduxjs/toolkit";

const textDataSlice = createSlice({
  name: "textData",
  initialState: {
    past: [],
    present: "",
    future: [],
    presentFile: "",
  },
  reducers: {
    getPresentFile(state, action) {
      if (action.payload) {
        state.presentFile = action.payload;
        const fileData = localStorage.getItem(state.presentFile);
        state.present = fileData;
      } else {
      }
    },

    clearArea(state) {
      state.present = "";
      localStorage.setItem(state.presentFile, state.present);
    },

    getTextData(state, action) {
      state.past = [...state.past, state.present];
      state.present = action.payload;
      localStorage.setItem(state.presentFile, state.present);
      state.future = [state.present];
    },
    undoText(state) {
      if (state.past.length - 1 < 0) {
        console.log("no more undfined");
      } else {
        state.present = state.past[state.past.length - 1];
        state.past = state.past.slice(0, state.past.length - 1);
        state.future = [state.present, ...state.future];
        localStorage.setItem(state.presentFile, state.present);
      }
    },
    RedoText(state) {
      if (state.future.length - 1 <= 0) {
        console.log("undefined is here");
      } else {
        state.present = state.future[1];
        state.past = [...state.past, state.present];
        state.future = state.future.slice(1);
        localStorage.setItem(state.presentFile, state.present);
      }
    },
    boldText(state) {
      state.present = `${state.present} **Strong text**`;
      console.log(state.present);
      console.log(state.future.length);
      localStorage.setItem(state.presentFile, state.present);
    },
    italicText(state) {
      state.present = `${state.present} *emphasized text*`;
      console.log(state.present);
      console.log(state.future.length);
      localStorage.setItem(state.presentFile, state.present);
    },
    headingText(state) {
      state.present = `${state.present} ${"\n"}  ## Heading ${"\n"}`;
      localStorage.setItem(state.presentFile, state.present);
    },
    strikeThroughText(state) {
      state.present = `${state.present} "~~strikethrough text~~"`;
      localStorage.setItem(state.presentFile, state.present);
    },
    unorderedList(state) {
      state.present = `${state.present} ${"\n"} - List item`;
      localStorage.setItem(state.presentFile, state.present);
    },

    orderedList(state) {
      state.present = `${state.present} \n  ${1}. List item`;
      localStorage.setItem(state.presentFile, state.present);
    },

    addBlockQuote(state) {
      state.present = `${state.present} ${"\n"}  > Blockquote ${"\n"} `;
      localStorage.setItem(state.presentFile, state.present);
    },

    addListItem(state) {
      state.present = `${state.present} ${"\n"} - [ ] List item ${"\n"} `;
      localStorage.setItem(state.presentFile, state.present);
    },
  },
});

export const textDataActions = textDataSlice.actions;
export default textDataSlice;
