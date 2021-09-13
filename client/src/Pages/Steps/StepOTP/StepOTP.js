import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardWrapper,
  Card,
  Button,
  TextInput,
} from "../../../Components/Shared";
import { setAuth, setUser } from "../../../Store/Slices/authSlice";
import { VERIFY_OTP } from "../../../HTTP/api_constants";
import { makePostRequest } from "../../../HTTP/api";
import styles from "./StepOTP.module.css";

function StepOTP() {
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  const { hash, phone } = useSelector((state) => state.authReducer.otp);

  const submit = async () => {
    if (!otp) {
      return alert("not find");
    }
    try {
      const { data } = await makePostRequest(VERIFY_OTP, {
        otp,
        hash,
        phone,
      });

      console.log("res", data);

      dispatch(setUser(data));
      dispatch(setAuth(true));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CardWrapper>
      <Card title="Enter the code we just texted you" icon="lock">
        <TextInput
          value={otp}
          onChange={(e) => {
            setOTP(e.target.value);
          }}
          placeholder="OTP"
        />
        <p className={styles.para}>Didn’t receive? Tap to resend</p>
        <Button label="Next" onClick={submit} />
      </Card>
    </CardWrapper>
  );
}

export default StepOTP;
