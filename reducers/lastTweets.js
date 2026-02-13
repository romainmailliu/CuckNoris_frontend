import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const lastTweetsSlice = createSlice({
  name: "lastTweets",
  initialState,
  reducers: {
    addTweets: (state, action) => {
      state.value.push(action.payload.content);
    },
    removeTweets: (state, action) => {
      state.value = state.value.filter(
        (tweet) => tweet.id !== action.payload.id,
      );
    },
  },
});

export const { addTweets, removeTweets } = lastTweetsSlice.actions;
export default lastTweetsSlice.reducer;
