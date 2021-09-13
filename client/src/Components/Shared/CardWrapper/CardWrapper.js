import React from "react";
import styles from "./CardWrapper.module.css";

function CardWrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default CardWrapper;
