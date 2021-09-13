import React, { useState } from "react";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOTP from "../Steps/StepOTP/StepOTP";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
};

function Authenticate() {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };
  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
}

export default Authenticate;
