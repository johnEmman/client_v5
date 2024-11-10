// src/redux/roomSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  roomId: string | null;
  userId: string | null;
  participants: string[];
  message: string | null;
  error: string | null;
}

const initialState: RoomState = {
  roomId: null,
  userId: null,
  participants: [],
  message: null,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setParticipants: (state, action: PayloadAction<string[]>) => {
      state.participants = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetRoomState: (state) => {
      state.roomId = null;
      state.userId = null;
      state.participants = [];
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  setRoomId,
  setUserId,
  setParticipants,
  setMessage,
  setError,
  resetRoomState,
} = roomSlice.actions;

export default roomSlice.reducer;
