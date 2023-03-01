import * as React from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/typedRedux";
import { deleteNews } from "../../store/reducers/newsSlice";
import { setIsModalOpen } from "../../store/reducers/modalSlice";
import { useTranslation } from "react-i18next";
import {
  openSuccessSnackBar,
  openErrorSnackBar,
} from "../../store/reducers/snackBarSlice";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal() {
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);
  const { title, description, id } = useAppSelector(
    (state) => state.modal.config
  );

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleConfirm = async () => {
    const resultAction = await dispatch(deleteNews(id));
    if (deleteNews.fulfilled.match(resultAction)) {
      dispatch(
        openSuccessSnackBar(t("snackBar.messages.deleteNewsSuccess", { id }))
      );
    } else {
      if (resultAction.payload) {
        dispatch(
          openErrorSnackBar(t("snackBar.messages.deleteNewsError", { id }))
        );
      } else {
        dispatch(
          openSuccessSnackBar(t("snackBar.messages.deleteNewsError", { id }))
        );
      }
    }

    dispatch(setIsModalOpen(false));
  };

  const handleCancel = () => {
    dispatch(setIsModalOpen(false));
  };

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            variant="contained"
            color="success"
          >
            {t("buttons.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
