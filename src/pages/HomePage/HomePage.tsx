import React from "react";

import { useTranslation } from "react-i18next";
import { Box, Typography, Container } from "@mui/material";

import welcomeImg from "../../assets/images/welcome.png";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 3, color: "#363636" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ maxWidth: "48%" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "20px",
                sm: "32px",
                md: "42px",
                lg: "52px",
              },
            }}
          >
            {t("homepage.welcomeTitle")}
          </Typography>
          <Typography variant="h3" fontWeight={300} sx={{
              fontSize: {
                xs: "18px",
                sm: "28px",
                md: "38px",
                lg: "48px",
              },
            }}>
            {t("homepage.welcomeSubtitle")}
          </Typography>
          <Typography variant="h5" mt={3} sx={{
              fontSize: {
                xs: "14px",
                sm: "16px",
                md: "20px",
              },
            }}>
            {t("homepage.welcomeText")}
          </Typography>
        </Box>
        <div className={styles.heroImage__wrapper}>
          <img src={welcomeImg} alt="welcome" />
        </div>
      </Box>
    </Container>
  );
};

export default HomePage;
