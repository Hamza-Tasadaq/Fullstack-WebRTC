import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardWrapper,
  Card,
  Button,
  Paragraph,
  Loader,
} from "../../../Components/Shared";
import { setAvatar } from "../../../Store/Slices/activateSlice";
import { makePostRequest } from "../../../HTTP/api";
import { ACTIVATE } from "../../../HTTP/api_constants";
import { setAuth, setUser } from "../../../Store/Slices/authSlice";
import Styles from "./StepAvatar.module.css";

function StepAvatar({ onNext }) {
  const dispatch = useDispatch();

  const { name, avatar } = useSelector((state) => state.activateReducer);

  const [image, setImage] = useState(avatar);
  const [loading, setLoading] = useState(false);
  const [unMount, setUnMount] = useState(false);

  const changeImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const submit = async () => {
    try {
      setLoading(true);
      const { data } = await makePostRequest(ACTIVATE, { name, avatar });
      console.log(data);
      if (data.auth) {
        if (!unMount) {
          dispatch(setUser(data));
          dispatch(setAuth(data.auth));
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setUnMount(true);
    };
  }, []);
  return (
    <div>
      {loading ? (
        <Loader text="Activation in progress..." />
      ) : (
        <CardWrapper>
          <Card title={`Okay, ${name}!`} icon="monkey">
            <div className={Styles.paraWrapper}>
              <Paragraph text="How’s this photo?" />
            </div>
            <img className={Styles.img} src={image} alt="avatar" />
            <div>
              <input
                onChange={changeImage}
                id="avatarInput"
                type="file"
                className={Styles.avatarInput}
              />
              <label htmlFor="avatarInput" className={Styles.hyperLink}>
                Choose A Different Photo
              </label>
            </div>
            <Button label="Next" onClick={submit} />
          </Card>
        </CardWrapper>
      )}
    </div>
  );
}

export default StepAvatar;
