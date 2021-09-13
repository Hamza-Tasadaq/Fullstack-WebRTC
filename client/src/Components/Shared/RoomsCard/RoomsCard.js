import React from "react";
import { Link } from "react-router-dom";
import styles from "./RoomsCard.module.css";

function RoomsCard({ room }) {
  return (
    <Link to={`/room/${room.id}`}>
      <div className={styles.roomCard}>
        <h3 className={styles.topic}>{room.roomTitle}</h3>
        <div
          className={`${styles.speakers} ${
            room.speakers.length === 1 ? styles.singleSpeaker : ""
          }`}
        >
          <div className={styles.speakersAvatars}>
            {room.speakers.map((speaker) => (
              <img
                key={speaker.id}
                className={styles.speakerAvatar}
                src={speaker.avatar}
                alt="speakers avatar"
              />
            ))}
          </div>
          <div>
            {room.speakers.map((speaker) => (
              <div className={styles.speakersName} key={speaker.id}>
                <span>{speaker.name}</span>
                <img src="/images/chat.png" alt="chat icon" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pepolesCount}>
          <span>{room.totalPeople}</span>
          <img
            className={styles.totalUser}
            src="/images/user.png"
            alt="user icon"
          />
        </div>
      </div>
    </Link>
  );
}

export default RoomsCard;
