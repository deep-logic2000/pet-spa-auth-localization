import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../hooks/typedRedux";
import routes from "../utils/constants/routes";

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Routes>
      {routes.public.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      {isAuthenticated &&
        routes.private.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
    </Routes>
  );
};

export default AppRoutes;
