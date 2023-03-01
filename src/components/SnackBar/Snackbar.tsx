import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/typedRedux";

import { closeSnackBar } from "../../store/reducers/snackBarSlice";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent() {
  const { isSnackBarOpen, severity, message } = useAppSelector(
    (state) => state.snackBar
  );
  const dispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackBar());
  };

  useEffect(() => {
    if (isSnackBarOpen) {
      setTimeout(() => {
        dispatch(closeSnackBar());
      }, 3000);
    }
  }, [isSnackBarOpen, dispatch]);

  return (
    <div>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ top: "70px" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
