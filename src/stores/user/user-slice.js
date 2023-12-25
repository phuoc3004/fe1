import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { editProfile, getProfile, login, register } from "../../api/users";

export const userLogin = createAsyncThunk("userLogin", async (authRequest) => {
  const response = await login(authRequest);
  return response;
});

export const userRegister = createAsyncThunk(
  "userRegister",
  async (authRequest) => {
    const response = await register(authRequest);
    return response;
  }
);

export const userProfile = createAsyncThunk("userProfile", async (token) => {
  const response = await getProfile(token);
  return response;
});

export const userEditProfile = createAsyncThunk(
  "userEditProfile",
  async (param) => {
    const response = await editProfile(param);
    return response;
  }
);

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = userProfile(action.payload.token);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userEditProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userEditProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userEditProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const userAction = {
  ...userSlice.actions,
  userLogin,
  userRegister,
  userProfile,
  userEditProfile,
};
