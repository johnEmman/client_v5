// // src/components/CreateRoom.tsx
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createRoom } from "../redux/roomActions"; // Ensure correct import
// import { setRoomId, setUserId, setError } from "../redux/roomSlice"; // Correct import
// import { RootState } from "../redux/store";

// const CreateRoom: React.FC = () => {
//   const dispatch = useDispatch();
//   const { userId, roomId, error, message } = useSelector(
//     (state: RootState) => state.room
//   );
//   const [newUserId, setNewUserId] = useState<string>("");

//   const handleCreateRoom = () => {
//     if (!newUserId) {
//       dispatch(setError("User ID is required"));
//       return;
//     }

//     const randomRoomId = "room-" + Math.random().toString(36).substr(2, 9);
//     dispatch(setRoomId(randomRoomId));
//     dispatch(setUserId(newUserId));

//     dispatch(createRoom(randomRoomId, newUserId)); // This will now work properly
//   };

//   return (
//     <div className="create-room">
//       <h2>Create Room</h2>
//       <div>
//         <label htmlFor="userId">User ID:</label>
//         <input
//           type="text"
//           id="userId"
//           value={newUserId}
//           onChange={(e) => setNewUserId(e.target.value)}
//           placeholder="Enter your User ID"
//         />
//       </div>
//       <button onClick={handleCreateRoom}>Create Room</button>
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {roomId && <div>Room ID: {roomId}</div>}
//     </div>
//   );
// };

// export default CreateRoom;
