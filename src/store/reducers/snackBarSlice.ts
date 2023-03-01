import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlertColor } from "@mui/material/Alert";

type ISnackBarState = {
  isSnackBarOpen: boolean;
  severity: AlertColor | undefined;
  message: string;
};

const initialState = {
  isSnackBarOpen: false,
  severity: "error",
  message: "",
} as ISnackBarState;

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    openSuccessSnackBar(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.severity = "success";
      state.isSnackBarOpen = true;
    },
    openErrorSnackBar(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.severity = "error";
      state.isSnackBarOpen = true;
    },
    closeSnackBar(state) {
      state.message = "";
      state.isSnackBarOpen = false;
    },
  },
});

export const { openErrorSnackBar, openSuccessSnackBar, closeSnackBar } =
  snackBarSlice.actions;
