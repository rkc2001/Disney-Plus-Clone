import { createSlice } from '@reduxjs/toolkit';

// When app starts keep everything empty
const initialState = {
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // What to do when user logs in
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },

    setSignOutState: state => {
      state.name = null;
      state.email = null;
      state.photo = null;
    }
  }
});

// Export stuff that we would need
export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

//Get access to user's name, email and photo in any of the files
export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPhoto = state => state.user.photo;

export default userSlice.reducer;