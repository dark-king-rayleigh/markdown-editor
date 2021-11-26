import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbar-slice";
import sidebarSlice from "./sidebar-slice";
import readermodeSlice from "./readermode-slice";
import textDataSlice from "./textdata-slice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
    sidebar: sidebarSlice.reducer,
    readermode: readermodeSlice.reducer,
    textData: textDataSlice.reducer,
  },
});

export default store;
