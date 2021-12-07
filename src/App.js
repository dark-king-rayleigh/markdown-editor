import { useEffect } from "react";
import Header from "./Components/Header";
import MarkdownEditor from "./Components/MarkdownEditor";
import { useDispatch } from "react-redux";
import { newInputActions } from "./Store/newInput-slice";
import { textDataActions } from "./Store/textdata-slice";
import { configActions } from "./Store/config-slice";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const present = useSelector((state) => {
    return state.config.config.active;
  });

  // get stored files from local storage
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("files"));
    dispatch(newInputActions.replaceFile(storedFiles));
  }, [dispatch]);

  // get stored config from local storage
  useEffect(() => {
    const configState = JSON.parse(localStorage.getItem("config"));
    if (configState) {
      dispatch(configActions.setConfig(configState));
    }
  }, [dispatch]);

  // getting present file
  useEffect(() => {
    dispatch(textDataActions.getPresentFile(present));
  }, [present, dispatch]);

  return (
    <>
      <Header />
      <MarkdownEditor />
    </>
  );
}

export default App;
