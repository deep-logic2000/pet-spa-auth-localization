import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/typedRedux";
import { useTranslation } from "react-i18next";

import {
  Button,
  Box,
  Container,
  Link,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavMenu from "../NavTabs/NavMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import { logOut } from "../../store/reducers/userSlice";

import "./Header.scss";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="headerWrapper">
      <Container maxWidth="lg" fixed>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton
              size="large"
              aria-label="appBar menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" underline="none">
              <Box display="flex" alignItems="center">
                <Logo key="logo1" />
                <Typography
                  ml={2}
                  className="titleWrapper"
                  sx={{
                    fontSize: "24px",
                    display: { xs: "none", sm: "none", md: "block" },
                  }}
                >
                  Agency
                </Typography>
              </Box>
            </Link>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu} className="menuItem">
              <a href="/">
                <Typography textAlign="center">{t("navmenu.home")}</Typography>
              </a>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} className="menuItem">
              <a href="/news">
                <Typography textAlign="center">{t("navmenu.news")}</Typography>
              </a>
            </MenuItem>
            {isAuthenticated && (
              <MenuItem onClick={handleCloseNavMenu} className="menuItem">
                <a href="/profile">
                  <Typography textAlign="center" className="menuItem">
                    {t("navmenu.profile")}
                  </Typography>
                </a>
              </MenuItem>
            )}
          </Menu>

          <Box>
            <NavMenu />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button variant="contained" onClick={handleLogout}>
                {t("buttons.logout")}
              </Button>
            ) : (
              <Button href="/signin" variant="contained">
                {t("buttons.login")}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Header;
