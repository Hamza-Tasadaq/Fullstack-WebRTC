import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardWrapper,
  Card,
  Button,
  TextInput,
  Paragraph,
} from "../../../Components/Shared";
import { setName } from "../../../Store/Slices/activateSlice";

function StepName({ onNext }) {
  const name = useSelector((state) => state.activateReducer.name);

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(name);

  const submit = () => {
    dispatch(setName({ name: fullName }));
    onNext();
  };
  return (
    <div>
      <CardWrapper>
        <Card title="What’s your full name?" icon="happyFace">
          <TextInput
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            placeholder="Your Name"
          />
          <div>
            <Paragraph text="People use real names at webRTC :) " />
          </div>
          <Button label="Next" onClick={submit} />
        </Card>
      </CardWrapper>
    </div>
  );
}

export default StepName;
