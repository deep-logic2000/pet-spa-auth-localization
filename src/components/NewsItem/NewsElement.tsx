import React, { FC } from "react";

import { Inew } from "../../pages/News/News";
import { useAppDispatch } from "../../hooks/typedRedux";
import { useTranslation } from "react-i18next";

import styles from "./NewsElement.module.scss";

import {
  setIsModalOpen,
  setConfigModal,
} from "../../store/reducers/modalSlice";

import { Box, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IProps {
  newsData: Inew;
  index: number;
}

const NewsElement: FC<IProps> = (props) => {
  const { newsData, index } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDelete = (id: number) => {
    const modalConfig = {
      title: t("modal.title"),
      description: t("modal.description"),
      id,
    };
    dispatch(setConfigModal(modalConfig));
    dispatch(setIsModalOpen(true));
  };

  return (
    <div className={styles.oneNewsWrapper}>
      <li style={{ textAlign: "left" }}>
        <Box display="flex" justifyContent="space-between">
          <div>
            <h2 className={styles.oneNewsTitle}>
              {index + 1}. {newsData.title}
            </h2>
            <p className={styles.oneNewsText}>{newsData.body}</p>
            <p className={styles.oneNewsText}>ID: {newsData.id}</p>
          </div>
          <div>
            <div onClick={() => handleDelete(newsData.id)}>
              <IconButton aria-label="Example">
                <DeleteForeverIcon
                  sx={{ color: "rgba(247, 48, 48, 0.911)" }}
                  fontSize="medium"
                />
              </IconButton>
            </div>
          </div>
        </Box>
      </li>
    </div>
  );
};

export default NewsElement;
