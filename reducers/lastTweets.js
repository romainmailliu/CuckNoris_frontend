import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  removedIds: [],
};

export const lastTweetsSlice = createSlice({
  name: "lastTweets",
  initialState,
  reducers: {
    addTweets: (state, action) => {
      state.value.push(action.payload.content);
    },
    removeTweets: (state, action) => {
      const tweetId = String(action.payload);
      if (!state.removedIds.includes(tweetId)) {
        state.removedIds.push(tweetId);
      }
    },
  },
});

export const { addTweets, removeTweets } = lastTweetsSlice.actions;
export default lastTweetsSlice.reducer;
