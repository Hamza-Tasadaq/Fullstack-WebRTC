import React from "react";
import styles from "./Card.module.css";

function Card({ icon, title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        {icon && (
          <img
            className={styles.logoStyles}
            src={`/images/${icon}.png`}
            alt="logo"
          />
        )}
        {title && <h1 className={styles.headingStyles}>{title}</h1>}
      </div>
      {children}
    </div>
  );
}

export default Card;
