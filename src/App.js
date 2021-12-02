import { useEffect } from "react";
import Header from "./Components/Header";
import MarkdownEditor from "./Components/MarkdownEditor";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const textData = useSelector((state) => {
    return state.textData.present;
  });

  useEffect(() => {
    const storeTextData = () => {
      localStorage.setItem("text", textData);
    };
    storeTextData();
  }, [textData, dispatch]);

  return (
    <>
      <Header />
      <MarkdownEditor />
    </>
  );
}

export default App;
