import { createSlice, current } from "@reduxjs/toolkit";

const startingData = ` **Strong text** *emphasized text* 
## Heading 

- List item 
1. List item 
> Blockquote 
`;
const newInputSlice = createSlice({
  name: "newInput",
  initialState: { files: [] },
  reducers: {
    // for replacing files by files from local storage
    replaceFile(state, actions) {
      if (actions.payload) {
        if (state.files.length === 4) {
          console.log("maxm files stored");
        } else {
          state.files = actions.payload;
        }
      } else {
        state.files.push("Welcome");
        localStorage.setItem("files", JSON.stringify(state.files));
        localStorage.setItem("Welcome", startingData);
      }
    },

    // for creating file and storing inside local storage
    newFile(state, action) {
      let newFile = action.payload;
      if (state.files.length === 5) {
        alert("cannot insert another file");
      } else {
        const file = state.files.filter((file) => {
          return file === action.payload;
        });
        if (file.length === 1) {
          alert("file already exists");
        } else {
          state.files.push(newFile);
          localStorage.setItem("files", JSON.stringify(state.files));
          console.log(current(state.files));
          localStorage.setItem(newFile, "");
        }
      }
    },
    //delete file from array
    deleteFile(state, action) {
      if (state.files.length === 1) {
        alert("cannot delete more files");
      } else {
        state.files = state.files.filter((file) => file !== action.payload);
        localStorage.removeItem(action.payload);
        localStorage.setItem("files", JSON.stringify(state.files));
      }
    },
    //edit File Name
    editFile(state, action) {
      console.log(action.payload);
      console.log(action.payload.fileName);
      console.log(action.payload.activeFile);

      state.files = state.files.filter(
        (file) => file !== action.payload.activeFile
      );
      state.files.push(action.payload.fileName);
      console.log(state.files);
      localStorage.setItem("files", JSON.stringify(state.files));

      const activeValue = localStorage.getItem(action.payload.activeFile);
      localStorage.setItem(action.payload.fileName, activeValue);
      localStorage.removeItem(action.payload.activeFile);
    },
  },
});

export const newInputActions = newInputSlice.actions;
export default newInputSlice;
