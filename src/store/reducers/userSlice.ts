import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import SignInFormElement from "../../pages/SignInPage/SignInPage";
import { userValidData } from "../../utils/constants/userData";
import { setItemToLS, getItemFromLS, removeItemFromLS } from "../../utils/localStorage";

type IUserState = {
  isAuthenticated: boolean;
  language: string;
};

const initialState = {
  isAuthenticated: false,
  language: "en",
} as IUserState;

interface IUserData {
  username: string;
  password: string;
}

export const fetchAuth = (userLoginData: IUserData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        userLoginData.username === userValidData.username &&
        userLoginData.password === userValidData.password
      ) {
        resolve(true);
      } else {
        reject();
      }
    }, 1000);
  });
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
      setItemToLS("isAuthenticated", "true");
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      removeItemFromLS("isAuthenticated");
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setIsAuthenticated, logOut, setLanguage } = userSlice.actions;

