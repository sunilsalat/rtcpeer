import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoomExists = createAsyncThunk(
  "RTC/getRoomExists",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/room-exists/${roomId}`
      );

      if (res.status !== 200) {
        throw new Error(res.error);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRoom = createAsyncThunk(
  "RTC/createRoom",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await fetch("");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const BaseSlice = createSlice({
  name: "RTC",
  initialState: {
    identity: "",
    isHost: false,
    onlyAudio: false,
    isAwaiting: false,
    error: "",
    roomExists: false,
    isFull: false,
    roomId: null,
  },
  reducers: {
    setIdentity: (state, action) => {
      state.identity = action.payload;
    },
    setHost: (state, action) => {
      state.isHost = action.payload;
    },
    isWithAudioOnly: (state, action) => {
      state.onlyAudio = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
  extraReducers: {
    [getRoomExists.pending]: (state, action) => {
      console.log("Promise pending");
      state.isAwaiting = true;
    },
    [getRoomExists.fulfilled]: (state, action) => {
      console.log("Promise fulfilled");
      state.isAwaiting = false;
      state.roomExists = action.payload.roomExists;
      state.isFull = action.payload.full;
      console.log(action.payload.roomExists);
      state.error = "";

      // set some response
    },
    [getRoomExists.rejected]: (state, error) => {
      console.log("Promise rejected");
      state.error = error.payload;
      state.isAwaiting = false;
    },
  },
});

export const { setIdentity, setHost, isWithAudioOnly, setRoomId} = BaseSlice.actions;

export default BaseSlice.reducer;
