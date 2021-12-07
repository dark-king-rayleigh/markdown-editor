import { configureStore } from "@reduxjs/toolkit";

import textDataSlice from "./textdata-slice";
import newInputSlice from "./newInput-slice";
import configSlice from "./config-slice";

const store = configureStore({
  reducer: {
    textData: textDataSlice.reducer,
    newInput: newInputSlice.reducer,
    config: configSlice.reducer,
  },
});

export default store;
