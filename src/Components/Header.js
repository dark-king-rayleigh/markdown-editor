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
import {
  FaUndoAlt,
  FaBold,
  FaItalic,
  FaQuoteRight,
  FaTable,
} from "react-icons/fa";
import classes from "./Header.module.css";
import { VscListOrdered } from "react-icons/vsc";
import { BsCardChecklist, BsCode, BsPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { textDataActions } from "../Store/textdata-slice";

const Header = () => {
  const [showNewInput, setShowNewInput] = useState(false);
  const [isNewInputFocused, setIsNewInputFocused] = useState(true);
  const [showSideBar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();

  const toggleNavbar = useSelector((state) => state.navbar.toggleNavbar);
  const textData = useSelector((state) => state.textData.present);
  const prev = useSelector((state) => state.textData.past);
  console.log(prev);

  const fileDownloadHandler = () => {
    const element = document.createElement("a");
    const file = new Blob([textData], { type: "pdf/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "NewDocument.md";
    document.body.appendChild(element);
    element.click();
  };

  const inputClearHandler = () => {
    dispatch(textDataActions.clearArea());
  };

  const newFileHandler = () => {
    dispatch(textDataActions.newFile());
    setShowSidebar(false);
  };

  const undoTextHandler = () => {
    dispatch(textDataActions.undoText());
    console.log(textData);
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
  const addTableHandler = () => {
    dispatch(textDataActions.addTable());
  };
  const headerClasses = `${classes["main-header"]} ${
    !toggleNavbar && classes["main-header-hidden"]
  }`;
  const headerFooterClasses = `${classes["header-folder"]} ${
    !showSideBar && classes["header-folder__hidden"]
  }`;

  const undoClasses = `${prev === [] && classes["no-undo"]}`;

  return (
    <>
      <div className={headerFooterClasses}>
        <div className={classes["header-folder__icons"]}>
          <div className={classes.icons}>
            <AiFillFileAdd
              onClick={() => {
                setShowNewInput(true);
                setIsNewInputFocused(true);
              }}
            />
            <AiFillFolderAdd />
            <AiFillDelete />
            <BsPencilFill />
          </div>
          <div>
            <AiFillCloseCircle
              onClick={() => {
                setShowSidebar(false);
                setShowNewInput(false);
              }}
            />
          </div>
        </div>
        <div className={classes["header-folder__folders"]}>
          <AiOutlineSend /> <span>Trash</span>
          <br />
          <AiOutlineSend /> <span>Temp</span>
          <br />
          <span
            className={classes["header-folder__folders__welcomefile"]}
            onClick={newFileHandler}
          >
            welcome file
          </span>
          {showNewInput && isNewInputFocused && (
            <input
              type="text"
              className={classes["new-input"]}
              onBlur={() => setIsNewInputFocused(false)}
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
          <FaTable onClick={addTableHandler} />
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
