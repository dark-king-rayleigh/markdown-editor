import { createSlice } from "@reduxjs/toolkit";
const configSlice = createSlice({
  name: "config",
  initialState: {
    config: {
      active: "Welcome",
      showSideBar: false,
      toggleSidebar: true,
      toggleReadermode: false,
      toggleNavbar: true,
    },
  },
  reducers: {
    setConfig(state, actions) {
      state.config = actions.payload;
    },
    toggleReaderMode(state) {
      state.config.toggleReadermode = !state.config.toggleReadermode;
      localStorage.setItem("config", JSON.stringify(state.config));
    },
    toggleSideBar(state) {
      state.config.toggleSidebar = !state.config.toggleSidebar;
      localStorage.setItem("config", JSON.stringify(state.config));
    },
    toggleNavBar(state) {
      state.config.toggleNavbar = !state.config.toggleNavbar;
      localStorage.setItem("config", JSON.stringify(state.config));
    },
    setActiveFile(state, action) {
      state.config.active = action.payload;
      localStorage.setItem("config", JSON.stringify(state.config));
    },

    resetActive(state) {
      const files = JSON.parse(localStorage.getItem("files"));
      console.log(files.length);
      const welcomePresence = files.filter((file) => file === "Welcome");
      if (welcomePresence.length > 1) {
        state.config.active = "Welcome";
      } else {
        state.config.active = files[0];
      }

      localStorage.setItem("config", JSON.stringify(state.config));
    },
  },
});

export const configActions = configSlice.actions;
export default configSlice;
