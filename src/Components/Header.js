import React from "react";
import {
  AiFillFolder,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
  AiOutlineLink,
  AiOutlineFileImage,
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
import { BsCardChecklist, BsCode } from "react-icons/bs";
import { useSelector } from "react-redux";

const Header = () => {
  const toggleNavbar = useSelector((state) => state.navbar.toggleNavbar);
  const textData = useSelector((state) => state.textData.text);

  const fileDownloadHandler = () => {
    const element = document.createElement("a");
    const file = new Blob([textData], { type: "pdf/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "NewDocument.md";
    document.body.appendChild(element);
    element.click();
  };

  const headerClasses = `${classes["main-header"]} ${
    !toggleNavbar && classes["main-header-hidden"]
  }`;

  return (
    <div className={headerClasses}>
      <div className={classes["main-header__left-container"]}>
        <AiFillFolder />
        <FaUndoAlt />
        <AiOutlineRedo />
        <FaBold />
        <FaItalic />
        <span>T</span>
        <AiOutlineStrikethrough />
        <AiOutlineUnorderedList />
        <VscListOrdered />
        <BsCardChecklist />
        <FaQuoteRight />
        <BsCode />
        <FaTable />
        <AiOutlineLink />
        <AiOutlineFileImage />
      </div>
      <div className={classes["main-header__right-container"]}>
        <button onClick={fileDownloadHandler}>download</button>
      </div>
    </div>
  );
};

export default Header;
