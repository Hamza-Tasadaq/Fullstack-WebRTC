import React from "react";
import styles from "./TextInput.module.css";

function TextInput({ ...props }) {
  return (
    <div>
      <input
        className={styles.input}
        // style={props.fullwidth === "true" && { width: "100%" }}
        type="text"
        {...props}
      />
    </div>
  );
}

export default TextInput;
