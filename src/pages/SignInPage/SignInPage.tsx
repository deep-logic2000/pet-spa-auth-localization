import React, { useState, useEffect, useCallback } from "react";

import { useAppDispatch } from "../../hooks/typedRedux";
import { useNavigate } from "react-router-dom";
import { fetchAuth } from "../../store/reducers/userSlice";
import { useTranslation } from "react-i18next";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { setIsAuthenticated } from "../../store/reducers/userSlice";
import {
  openSuccessSnackBar,
  openErrorSnackBar,
} from "../../store/reducers/snackBarSlice";

function Copyright(props: any) {
  const { t } = useTranslation();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {t("form.copyright")}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "admin",
    password: "12345",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDirty = !!errors.username || !!errors.password;

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validateName = useCallback((value: string) => {
    if (/[^A-Za-z]/.test(value)) {
      setErrors((current) => ({ ...current, username: t("validate.onlyLatins") }));
    } else if (value.length > 10) {
      setErrors((current) => ({
        ...current,
        username: t("validate.quantitySymbols"),
      }));
    } else {
      setErrors((current) => ({ ...current, username: "" }));
    }
  }, [t]);

  const handleSubmit = async (e: React.FormEvent<SignInFormElement>) => {
    e.preventDefault();
    const signInData = {
      username: values.username,
      password: values.password,
    };

    await fetchAuth(signInData)
      .then((res) => {
        dispatch(setIsAuthenticated());
        dispatch(openSuccessSnackBar(t("snackBar.messages.loginSuccess")));
        navigate("/profile");
      })
      .catch((err) => {
        dispatch(
          openErrorSnackBar(t("snackBar.messages.loginError"))
        );
      });
  };

  useEffect(() => {
    if (touched.username) {
      validateName(values.username);
    }
  }, [values.username, touched.username, validateName]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        {t("form.title")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label={t("form.username")}
            name="username"
            autoFocus
            value={values.username}
            onChange={({ target }) => {
              handleChange(target.name, target.value);
              if (touched.username) {
                validateName(target.value);
              }
            }}
            onBlur={({ target }) => {
              if (!touched.username) {
                setTouched((current) => ({ ...current, username: true }));
                validateName(target.value);
              }
            }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("form.password")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={({ target }) => {
              handleChange(target.name, target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDirty}
          >
            {t('buttons.login')}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
