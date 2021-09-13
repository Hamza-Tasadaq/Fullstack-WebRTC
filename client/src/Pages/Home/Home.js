import React from "react";
import { useHistory } from "react-router-dom";
import { CardWrapper, Card, Button } from "../../Components/Shared";
import styles from "./Home.module.css";

function Home() {
  const history = useHistory();

  const startRegistration = () => {
    history.push("/authenticate");
  };

  return (
    <CardWrapper>
      <Card title="Welcome to WebRTC!" icon="logo">
        <p className={styles.descStyles}>
          {/* We’re working hard to get WebRTC ready for everyone! While we wrap up
          the finishing youches, we’re adding people gradually to make sure
          nothing breaks :)  */}
          WebRTC (Web Real-Time Communication) is a technology that enables Web
          applications and sites to capture and optionally stream audio and/or
          video media.
        </p>
        <Button onClick={startRegistration} label="Let's Go" />
        {/* <div className={styles.signinWrapper}>
          <span>Have an invite text?</span>
          <Link style={signInLinkStyles} to="/login">
            Sign in
          </Link>
        </div> */}
      </Card>
    </CardWrapper>
  );
}

export default Home;
