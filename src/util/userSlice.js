import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeruser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeruser } = userSlicer.actions;

export default userSlicer.reducer;
