import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: { toggleNavbar: true },
  reducers: {
    toggle(state) {
      state.toggleNavbar = !state.toggleNavbar;
    },
  },
});

export const navbarActions = navbarSlice.actions;
export default navbarSlice;
