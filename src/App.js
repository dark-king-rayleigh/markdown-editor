import { useEffect } from "react";
import Header from "./Components/Header";
import MarkdownEditor from "./Components/MarkdownEditor";
import { useSelector, useDispatch } from "react-redux";

import { textDataActions } from "./Store/textdata-slice";

function App() {
  const dispatch = useDispatch();

  const textData = useSelector((state) => {
    return state.textData.present;
  });

  useEffect(() => {
    const storeTextData = () => {
      const sendingData = localStorage.setItem("text", textData);
    };
    storeTextData();
  }, [textData, dispatch]);

  useEffect(() => {
    const fetchData = () => {
      let fetchedData = localStorage.getItem("text");
      console.log(fetchedData);
      if (fetchedData !== null) {
        dispatch(textDataActions.replaceText(fetchedData));
      } else {
        console.log("data fetch failed");
      }
    };
    fetchData();
  }, [textData]);

  return (
    <>
      <Header />
      <MarkdownEditor />
    </>
  );
}

export default App;
