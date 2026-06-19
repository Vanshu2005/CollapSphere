import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],   // should be array, not null
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // ✅ payload, not payLoad
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
