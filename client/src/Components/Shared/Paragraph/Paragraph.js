import React from "react";
import Styles from "./Paragraph.module.css";

function Paragraph({ text }) {
  return <p className={Styles.para}>{text}</p>;
}

export default Paragraph;
