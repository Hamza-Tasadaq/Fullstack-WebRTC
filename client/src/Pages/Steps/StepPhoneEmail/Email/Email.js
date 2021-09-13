import React, { useState } from "react";
import {
  Card,
  Button,
  TextInput,
  Paragraph,
} from "../../../../Components/Shared";

function Email({ onNext }) {
  const [email, setEmail] = useState();
  return (
    <Card title="Enter your email id" icon="email">
      <TextInput
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <Button label="Next" onClick={onNext} />
      <Paragraph text="By entering your Email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!" />
    </Card>
  );
}

export default Email;
