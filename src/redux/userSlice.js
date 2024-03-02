import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const initialState = {
  isAuth: false,
  isLoad: false,
  error: null,
  userData: {
    userId: null,
    userName: null,
    userEmail: null,
    token: null,
  },
};

const handleAuth = async (authFunc, email, password) => {
  const auth = getAuth();
  const userCredential = await authFunc(auth, email, password);
  const user = userCredential.user;
  const token = user?.stsTokenManager?.accessToken;

  if (user && token) {
    return {
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      token,
    };
  } else {
    throw new Error("Authentication failed");
  }
};

export const login = createAsyncThunk("user/login", async ({ email, password }) => {
  return handleAuth(signInWithEmailAndPassword, email, password);
});

export const signin = createAsyncThunk("user/signin", async ({ email, password }) => {
  return handleAuth(createUserWithEmailAndPassword, email, password);
});

export const updateUserData = createAction("user/updateUserData", (userData) => ({
  payload: userData,
}));

export const logout = createAction("user/logout", () => ({
  userId: null,
  userName: null,
  userEmail: null,
  token: null,
   
}));

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoad = true;
      })
      .addCase(signin.pending, (state) => {
        state.error = null;
        state.isLoad = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userData = action.payload;
        state.error = null;
        state.isLoad = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userData = action.payload;
        state.error = null;
        state.isLoad = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.payload.error;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.payload.error;
      })
      .addCase(logout, (state) => {
        state.isAuth = false; // Kullanıcı oturumunu sonlandır
        state.userData = initialState.userData; // Kullanıcı verilerini sıfırla
      });
  },
});

export const { userData  } = userSlice.actions;
export default userSlice.reducer;
