import React from "react";
import { useState } from "react";
import classes from "./MarkdownEditor.module.css";
import ReactMarkdown from "react-markdown";
import { AiOutlineEye } from "react-icons/ai";
import { BsLayoutSplit, BsPencilFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { navbarActions } from "../Store/navbar-slice";
import { sidebarActions } from "../Store/sidebar-slice";
import { VscSplitVertical } from "react-icons/vsc";
import { readermodeActions } from "../Store/readermode-slice";
import { textDataActions } from "../Store/textdata-slice";

const MarkdownEditor = () => {
  const dispatch = useDispatch();

  const textData = useSelector((state) => state.textData.text);
  const toggleNavbar = useSelector((state) => state.navbar.toggleNavbar);
  const toggleSidebar = useSelector((state) => {
    return state.sidebar.toggleSidebar;
  });
  const toggleReadermode = useSelector(
    (state) => state.readermode.toggleReadermode
  );

  const textChangeHandler = (event) => {
    const newText = event.target.value;
    dispatch(textDataActions.getTextData(newText));
  };

  const toggleNavbarHandler = () => {
    dispatch(navbarActions.toggle());
  };

  const toggleSidebarHandler = () => {
    dispatch(sidebarActions.toggle());
  };

  const toggleReadermodeHandler = () => {
    dispatch(readermodeActions.toggle());
  };

  const outputAreaClasses = `${classes["output-area"]} ${
    !toggleSidebar && classes["output-area-hidden"]
  } ${toggleReadermode && classes["output-area-cover"]}`;

  const inputAreaClasses = `${classes["input-area"]}  ${
    !toggleSidebar && classes["input-area-cover"]
  } ${toggleReadermode && classes["input-area-hidden"]}`;

  const toggleButtonsClasses = `${classes["toggle-buttons"]} ${
    toggleReadermode && classes["toggle-buttons-hide"]
  }`;

  return (
    <section className={`${!toggleNavbar && classes["section-cover"]}`}>
      <div className={classes["area-container"]}>
        <div className={inputAreaClasses}>
          <textarea
            placeholder="Enter Your Text Here"
            value={textData}
            onChange={textChangeHandler}
          ></textarea>
        </div>
        <div className={toggleButtonsClasses}>
          <VscSplitVertical onClick={toggleNavbarHandler} />
          <BsLayoutSplit onClick={toggleSidebarHandler} />
          <AiOutlineEye onClick={toggleReadermodeHandler} />
          <span>
            {toggleReadermode && (
              <BsPencilFill onClick={toggleReadermodeHandler} />
            )}
          </span>
        </div>
        <div className={outputAreaClasses}>
          <ReactMarkdown>{textData}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default MarkdownEditor;
