// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, deleteUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
