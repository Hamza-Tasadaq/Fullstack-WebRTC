import React, { useState } from "react";
import { useHistory } from "react-router";
import { TextInput, Loader } from "../index";
import { CREATE_ROOM } from "../../../HTTP/api_constants";
import { makePostRequest } from "../../../HTTP/api";
import styles from "./AddRoomModal.module.css";

function AddRoomModal({ setShowModal }) {
  const history = useHistory();
  const [roomType, setRoomType] = useState("open");
  const [roomTitle, setRoomTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    setRoomTitle(e.target.value);
  };

  const createRoom = async () => {
    if (!roomTitle) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await makePostRequest(CREATE_ROOM, {
        roomTitle,
        roomType,
      });

      console.log("modal===>", data);
      history.push(`/room/${data.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.modalMask}>
        {loading ? (
          <Loader text="Creating Room..." />
        ) : (
          <div className={styles.modalBody}>
            <img
              onClick={() => {
                setShowModal(false);
              }}
              className={styles.close}
              src={`/images/close.png`}
              alt="close"
            />
            <div className={styles.modalHeader}>
              <h2>Enter the topic to be discussed</h2>

              <TextInput
                fullwidth={"true"}
                placeholder={"Room Name"}
                value={roomTitle}
                onChange={(e) => handleTitleChange(e)}
              />

              <h2>Room Types</h2>
              <div className={styles.roomsType}>
                <div
                  className={`${styles.boxtype} ${
                    roomType === "open" ? styles.selected : ""
                  }`}
                  onClick={() => {
                    setRoomType("open");
                  }}
                >
                  <img
                    className={styles.boximage}
                    src="/images/Globe.png"
                    alt="globe"
                  />
                  <span>Open</span>
                </div>
                <div
                  className={`${styles.boxtype} ${
                    roomType === "social" ? styles.selected : ""
                  }`}
                  onClick={() => {
                    setRoomType("social");
                  }}
                >
                  <img
                    className={styles.boximage}
                    src="/images/Users.png"
                    alt="social"
                  />
                  <span>Social</span>
                </div>
                <div
                  className={`${styles.boxtype} ${
                    roomType === "close" ? styles.selected : ""
                  }`}
                  onClick={() => {
                    setRoomType("close");
                  }}
                >
                  <img
                    className={styles.boximage}
                    src="/images/lock2.png"
                    alt="close"
                  />
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <h2>Start a room, open to everyone</h2>
              <button onClick={createRoom} className={styles.addToRoom}>
                <img
                  className={styles.addRoomImg}
                  src="/images/go.png"
                  alt="lets go"
                />
                Let's Go
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRoomModal;
