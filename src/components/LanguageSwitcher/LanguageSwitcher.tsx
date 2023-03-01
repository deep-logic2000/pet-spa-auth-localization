import React, { useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { setLanguage } from "../../store/reducers/userSlice";

const LanguageSwitcher = () => {
  const langInStore = useAppSelector((state) => state.user.language);

  const language = localStorage.getItem("i18nextLng") || langInStore || "en";
  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")) {
      dispatch(setLanguage(localStorage.getItem("i18nextLng") || "en"));
    }
  }, [dispatch]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={language}
      exclusive
      onChange={handleChange}
      aria-label="language switcher"
      sx={{ height: 37, margin: "0 10px" }}
    >
      <ToggleButton value="uk" aria-label="uk language">
        UK
      </ToggleButton>
      <ToggleButton value="en" aria-label="en language">
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
