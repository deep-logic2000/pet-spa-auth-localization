import { Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import News from "../../pages/News/News";
import SignInPage from "../../pages/SignInPage/SignInPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface IRouterRoutes {
  public: IRoute[];
  private: IRoute[];
}

const routes: IRouterRoutes = {
  public: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <Navigate to="/" replace />,
    },
    {
      path: "/news",
      element: <News />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  private: [
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ],
};

export default routes;
