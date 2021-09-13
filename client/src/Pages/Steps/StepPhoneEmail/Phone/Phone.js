import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  TextInput,
  Paragraph,
} from "../../../../Components/Shared";
import { SEND_OTP } from "../../../../HTTP/api_constants";
import { makePostRequest } from "../../../../HTTP/api";
import { setOTP } from "../../../../Store/Slices/authSlice";

function Phone({ onNext }) {
  const [phone, setphone] = useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    if (!phone) {
      return alert("empty");
    }
    try {
      const { data } = await makePostRequest(SEND_OTP, { phone });
      console.log(data);
      dispatch(setOTP({ phone: data.phone, hash: data.hash }));
      onNext();
      setphone("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      setphone(null);
    };
  }, []);

  return (
    <Card title="Enter your phone number" icon="phone">
      <TextInput
        value={phone}
        onChange={(e) => {
          setphone(e.target.value);
        }}
        placeholder="Phone Number"
      />
      <Button label="Next" onClick={submit} />
      {/* <p className={styles.para}>
        By entering your number, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p> */}
      <Paragraph text="By entering your Number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!" />
    </Card>
  );
}

export default Phone;
