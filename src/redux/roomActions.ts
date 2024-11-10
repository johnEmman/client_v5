// src/redux/roomActions.ts
import { AppDispatch } from "./store";
import axios from "axios";
import { setParticipants, setMessage, setError } from "./roomSlice";

const API_BASE_URL = "https://192.168.1.20:4000/webrtc";

// Async action to create a room
export const createRoom =
  (roomId: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-room`, {
        roomId,
        userId,
      });
      dispatch(setMessage(response.data.message));
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Error creating room")
      );
    }
  };

// Async action to join a room
export const joinRoom =
  (roomId: string, userId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/join-room`, {
        roomId,
        userId,
      });
      dispatch(setMessage(response.data.message));
      // You can fetch participants here as well
      const participantsResponse = await axios.get(
        `${API_BASE_URL}/room-participants/${roomId}`
      );
      dispatch(setParticipants(participantsResponse.data.participants));
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || "Error joining room"));
    }
  };

// Async action to fetch room participants
export const fetchRoomParticipants =
  (roomId: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/room-participants/${roomId}`
      );
      dispatch(setParticipants(response.data.participants));
    } catch (error: any) {
      dispatch(setError("Error fetching participants"));
    }
  };
export { setError };
