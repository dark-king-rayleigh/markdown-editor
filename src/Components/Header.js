import React, { useState } from "react";
import {
  AiFillFileAdd,
  AiFillFolderAdd,
  AiFillDelete,
  AiFillCloseCircle,
  AiOutlineSend,
  AiFillFolder,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { FaUndoAlt, FaBold, FaItalic, FaQuoteRight } from "react-icons/fa";
import classes from "./Header.module.css";
import { VscListOrdered } from "react-icons/vsc";
import { BsCardChecklist, BsCode, BsPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { textDataActions } from "../Store/textdata-slice";
import { newInputActions } from "../Store/newInput-slice";
import { configActions } from "../Store/config-slice";

const Header = () => {
  const activeFile = useSelector((state) => state.config.config.active);
  const [showNewInput, setShowNewInput] = useState(false);
  const [isNewInputFocused, setIsNewInputFocused] = useState(true);
  const [showSideBar, setShowSidebar] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const toggleNavbar = useSelector((state) => state.config.config.toggleNavbar);
  const textData = useSelector((state) => state.textData.present);
  const prev = useSelector((state) => state.textData.past);
  const files = useSelector((state) => state.newInput.files);

  // adding new file on blur
  const newInputBlurHandler = () => {
    setIsNewInputFocused(false);
    if (fileName) {
      dispatch(newInputActions.newFile(fileName));
      setFileName("");
    }
  };

  // editing file name
  const editinBlurHandler = () => {
    setIsEditing(false);
    if (fileName !== activeFile) {
      dispatch(newInputActions.editFile({ fileName, activeFile }));
      dispatch(configActions.resetActive());
    } else {
      console.log("same file name");
    }
    setFileName("");
  };

  const fileDownloadHandler = () => {
    const element = document.createElement("a");
    const file = new Blob([textData], { type: "pdf/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "NewDocument.md";
    document.body.appendChild(element);
    element.click();
  };

  const setActiveFileHandler = (file) => {
    dispatch(configActions.setActiveFile(file));
  };

  const inputClearHandler = () => {
    dispatch(textDataActions.clearArea());
  };

  const undoTextHandler = () => {
    dispatch(textDataActions.undoText());
  };
  const redoTextHandler = () => {
    dispatch(textDataActions.RedoText());
  };

  const boldTextHandler = () => {
    dispatch(textDataActions.boldText());
  };
  const italicTextHandler = () => {
    dispatch(textDataActions.italicText());
  };
  const headingTextHandler = () => {
    dispatch(textDataActions.headingText());
  };
  const strikeThroughTextHandler = () => {
    dispatch(textDataActions.strikeThroughText());
  };
  const unorderedListHandler = () => {
    dispatch(textDataActions.unorderedList());
  };
  const orderedListHandler = () => {
    dispatch(textDataActions.orderedList());
  };
  const listItemHandler = () => {
    dispatch(textDataActions.addListItem());
  };
  const blockQuoteHandler = () => {
    dispatch(textDataActions.addBlockQuote());
  };
  const deleteFileHandler = () => {
    dispatch(newInputActions.deleteFile(activeFile));
    dispatch(configActions.resetActive());
  };

  //while clicking in edit button
  const editFileNameHandler = () => {
    setIsNewInputFocused(false);
    setIsEditing(true);
    setFileName(activeFile);
  };

  const headerClasses = `${classes["main-header"]} ${
    !toggleNavbar && classes["main-header-hidden"]
  }`;
  const headerFooterClasses = `${classes["header-folder"]} ${
    !showSideBar && classes["header-folder__hidden"]
  }`;

  const undoClasses = `${prev === [] && classes["no-undo"]}`;

  //while clicking files in sidebar
  const fileClickHandler = (file) => {
    setActiveFileHandler(file);
  };

  return (
    <>
      <div className={headerFooterClasses}>
        <div className={classes["header-folder__icons"]}>
          <div className={classes.icons}>
            <AiFillFileAdd
              onClick={() => {
                setShowNewInput(true);
                setIsNewInputFocused(true);
                setIsEditing(false);
                setFileName("");
              }}
            />
            {/* <AiFillFolderAdd /> */}
            <AiFillDelete onClick={deleteFileHandler} />
            <BsPencilFill onClick={editFileNameHandler} />
          </div>
          <div>
            <AiFillCloseCircle
              onClick={() => {
                setShowSidebar();
                setShowNewInput();
              }}
            />
          </div>
        </div>
        <div className={classes["header-folder__folders"]}>
          <AiOutlineSend /> <span>Trash</span>
          <br />
          <AiOutlineSend /> <span>Temp</span>
          <br />
          {files.map((file, index) => {
            return (
              <div
                key={index}
                className={`${classes["header-folder__files"]} ${
                  activeFile === file && classes["header-folder__files__active"]
                }`}
                onClick={() => fileClickHandler(file)}
              >
                {file}
              </div>
            );
          })}
          {showNewInput && isNewInputFocused && (
            <input
              type="text"
              value={fileName}
              className={classes["new-input"]}
              onBlur={newInputBlurHandler}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
              autoFocus
            />
          )}
          {isEditing && (
            <input
              type="text"
              value={fileName}
              className={classes["new-input"]}
              onBlur={editinBlurHandler}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
              autoFocus
            />
          )}
        </div>
      </div>
      <div className={headerClasses}>
        <div className={classes["main-header__left-container"]}>
          <AiFillFolder
            onClick={() => {
              setShowSidebar(true);
            }}
          />
          <FaUndoAlt onClick={undoTextHandler} className={undoClasses} />
          <AiOutlineRedo onClick={redoTextHandler} />
          <FaBold onClick={boldTextHandler} />
          <FaItalic onClick={italicTextHandler} />
          <span onClick={headingTextHandler}>T</span>
          <AiOutlineStrikethrough onClick={strikeThroughTextHandler} />
          <AiOutlineUnorderedList onClick={unorderedListHandler} />
          <VscListOrdered onClick={orderedListHandler} />
          <BsCardChecklist onClick={listItemHandler} />
          <FaQuoteRight onClick={blockQuoteHandler} />
          <BsCode />
        </div>
        <div className={classes["main-header__right-container"]}>
          <button className={classes.clear} onClick={inputClearHandler}>
            Clear
          </button>
          <button onClick={fileDownloadHandler}>download</button>
        </div>
      </div>
    </>
  );
};
export default Header;
