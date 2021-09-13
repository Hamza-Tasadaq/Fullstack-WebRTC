import React, { useState, useEffect } from "react";
import {
  RoomsHeader,
  RoomsCard,
  AddRoomModal,
  Loader,
} from "../../Components/Shared";
import { GET_ROOMS } from "../../HTTP/api_constants";
import { makeGetRequest } from "../../HTTP/api";
import styles from "./Rooms.module.css";

// const rooms = [
//   {
//     id: 1,
//     roomTitle: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/happyFace.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     roomTitle: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/happyFace.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/happyFace.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     roomTitle: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/happyFace.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/happyFace.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     roomTitle: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/happyFace.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/happyFace.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

function Rooms() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const { data } = await makeGetRequest(GET_ROOMS);
        setRooms(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getRooms();
  }, []);

  return (
    <div>
      <div className={styles.roomContainer}>
        <RoomsHeader setShowModal={setShowModal} />

        {loading ? (
          <Loader text="Loading, Getting Rooms..." />
        ) : (
          <div className={styles.roomsList}>
            {rooms.map((room) => (
              <RoomsCard key={room.id} room={room} />
            ))}
          </div>
        )}
        {showModal && <AddRoomModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
}

export default Rooms;
