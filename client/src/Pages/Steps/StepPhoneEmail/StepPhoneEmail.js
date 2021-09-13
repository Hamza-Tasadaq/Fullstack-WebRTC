import React, { useState } from "react";
import { CardWrapper } from "../../../Components/Shared";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css";

const tabs = {
  phone: Phone,
  email: Email,
};
function StepPhoneEmail({ onNext }) {
  const [tab, setTab] = useState("phone");

  const Tab = tabs[tab];

  return (
    <CardWrapper>
      <div className={styles.wrapper}>
        <div className={styles.buttonWrap}>
          <button
            className={`${styles.tabButton} ${
              tab === "phone" ? styles.active : ""
            }`}
            onClick={() => setTab("phone")}
          >
            <img src="/images/phone_android.png" alt="phone" />
          </button>
          <button
            className={`${styles.tabButton} ${
              tab === "email" ? styles.active : ""
            }`}
            onClick={() => setTab("email")}
          >
            <img src="/images/letter.png" alt="email" />
          </button>
        </div>

        <Tab onNext={onNext} />
      </div>
    </CardWrapper>
  );
}

export default StepPhoneEmail;
