import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestMessage: null,
  waitingMessage: null,
  chatsRefresh: false,
  isNotesBusy: false,
};

export const Slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    // Latest response management
    addLatestMessage: (state, action) => {
      const newMessage = action.payload;
      state.latestMessage = newMessage;
    },
    // Waiting message management
    addWaitingMessage: (state, action) => {
      const newMessage = action.payload;
      state.waitingMessage = newMessage;
    },
    refreshChats: (state) => {
      state.chatsRefresh = !state.chatsRefresh;
    },
    setNotesBusy: (state, action) => {
      state.isNotesBusy = action.payload;
    },
  },
});

export const { addLatestMessage, addWaitingMessage, refreshChats, setNotesBusy } = Slice.actions;

export default Slice.reducer;
