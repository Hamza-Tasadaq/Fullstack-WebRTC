import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "../../../Store/Slices/authSlice";
import { makePostRequest } from "../../../HTTP/api";
import { LOGOUT } from "../../../HTTP/api_constants";
import styles from "./Navigation.module.css";

function Navigation() {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.authReducer);

  const brandStyles = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "22px",
    display: "flex",
    fontWeight: "bold",
    alignItems: "center",
    width: "150px",
  };
  const imageStyles = {
    height: "28px",
  };
  const brandText = {
    marginLeft: "20px",
  };

  const logout = async () => {
    try {
      const { data } = await makePostRequest(LOGOUT, {});
      dispatch(setUser(data));
      dispatch(setAuth(false));
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   console.log("1");
  //   const a = async () => {
  //     const { data } = await makePostRequest(LOGOUT, {});
  //     console.log(data);
  //   };
  //   a();
  // }, []);
  return (
    <div className={`${styles.navbar}`}>
      <Link to="/" style={brandStyles}>
        <img style={imageStyles} src="/images/logo.png" alt="logo" />
        <span style={brandText}>WebRTC</span>
      </Link>
      <div>
        {isAuth && (
          <div className={styles.navRight}>
            <h4>{user.name}</h4>
            {user.avatar && (
              <Link to="/">
                <img
                  className={styles.avatarImage}
                  src={user.avatar}
                  alt="userAvatar"
                />
              </Link>
            )}
            <button className={styles.logout} onClick={logout}>
              log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
