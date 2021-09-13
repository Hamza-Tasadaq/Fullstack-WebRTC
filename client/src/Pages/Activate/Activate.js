import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

function Activate() {
  const [step, setStep] = useState(1);

  const Step = steps[step];

  const onNext = () => {
    setStep((prevState) => prevState + 1);
  };
  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
}

export default Activate;
