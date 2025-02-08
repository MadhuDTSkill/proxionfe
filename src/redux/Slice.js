import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestMessage: null,
  recentChats: [],
};

export const Slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    // Latest response management
    addNewMessage: (state, action) => {
      const newMessage = action.payload;
      state.latestMessage = newMessage;
    },
    addNewMessageChunk: (state, action) => {
      const newMessageChunk = action.payload;
      if (state.latestMessage && newMessageChunk) {
        state.latestMessage.response += newMessageChunk || "";
      }
    },
    // Recent chats management
    addNewRecentChat: (state, action) => {
      const newChat = action.payload;

      // Check for duplicates
      if (
        !state.recentChats.some((model) => model?.id === newChat?.id) &&
        newChat
      ) {
        if (state.recentChats.length >= 5) {
          state.recentChats.pop();
        }
        state.recentChats.unshift(newChat);
      }
    },
  },
});

export const { addNewRecentChat, addNewMessage, addNewMessageChunk } =
  Slice.actions;

export default Slice.reducer;
