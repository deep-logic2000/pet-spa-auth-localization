import * as React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/typedRedux";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";

import "./NavMenu.scss";

const NavTabs = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%", display: { xs: 'none', sm: "block" } }} >
      <nav>
        <ul className="nav-menu__list">
          <li>
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? "activeLink" : "link")}
            >
              {t("navmenu.home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) => (isActive ? "activeLink" : "link")}
            >
              {t("navmenu.news")}
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "activeLink" : "link")}
              >
                {t("navmenu.profile")}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </Box>
  );
};

export default NavTabs;
