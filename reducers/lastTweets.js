import { createSlice } from "@reduxjs/toolkit";
import LastTweet from "../components/LastTweets";

const initialState = {
  value: [],
};

export const lastTweetsSlice = createSlice({
  name: "lastTweets",
  initialState,
  reducers: {
    addTweets: (state, action) => {
      state.value.push(action.payload);
    },
    removeTweets: (state, action) => {
      state.value = state.value.filter(
        (lastTweet) => LastTweet.content !== action.payload.content,
      );
    },
  },
});

export const { addTweets, removeTweets } = lastTweetsSlice.actions;
export default lastTweetsSlice.reducer;
