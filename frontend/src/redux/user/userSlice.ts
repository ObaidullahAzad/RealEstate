import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  currentUser: any;
  error: any;
  loading: boolean;
}

const initialState: CounterState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailue: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailue } = userSlice.actions;
export default userSlice.reducer;
