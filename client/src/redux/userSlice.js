import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
