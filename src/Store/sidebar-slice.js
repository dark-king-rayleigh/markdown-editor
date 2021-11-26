import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { toggleSidebar: true },
  reducers: {
    toggle(state) {
      state.toggleSidebar = !state.toggleSidebar;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice;
