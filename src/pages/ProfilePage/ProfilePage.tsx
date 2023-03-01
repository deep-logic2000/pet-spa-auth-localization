import * as React from "react";

import { Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

import avatar from "../../assets/images/profile-img.png";

import styles from "./ProfilePage.module.scss";

const Profile = () => {
  const name = "John Doe";
  const email = "email@gmail.com";

  const { t } = useTranslation();

  return (
    <div className={styles.profilePageWrapper}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" gap={5} mt={5}>
          <img src={avatar} alt="avatar" />
          <div>
            <h3 className={styles.nameLine}>{t('user.name')}: {name}</h3>
            <p className={styles.emailLine}>{t('user.email')}: {email}</p>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
