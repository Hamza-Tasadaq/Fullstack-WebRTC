import React from "react";
import styles from "./Button.module.css";

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{label}</span>
      <img
        className={styles.arrow}
        src="/images/arrow_forward.png"
        alt="arrow_forward"
      />
    </button>
  );
}

export default Button;
