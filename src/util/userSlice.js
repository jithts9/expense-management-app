import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removerUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removerUser } = userSlicer.actions;

export default userSlicer.reducer;
