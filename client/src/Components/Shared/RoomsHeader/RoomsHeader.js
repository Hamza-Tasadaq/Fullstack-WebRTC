import React from "react";
import styles from "./RoomsHeader.module.css";

function RoomsHeader({ setShowModal }) {
  return (
    <div className={styles.roomHeader}>
      <div className={styles.roomLeft}>
        <span className={styles.heading}>All Voice Rooms</span>
        <div className={styles.searchBox}>
          <img src="/images/search.png" alt="search icon" />
          <input
            placeholder="Search Here..."
            className={styles.searchInput}
            type="text"
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className={styles.addToRoom}
        >
          <img
            className={styles.addRoomImg}
            src="/images/addToRoom.png"
            alt="add to room"
          />
          Start A Room
        </button>
      </div>
    </div>
  );
}

export default RoomsHeader;
