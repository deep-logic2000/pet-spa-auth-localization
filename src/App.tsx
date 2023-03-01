import React, { useEffect } from "react";
import Snackbar from "./components/SnackBar/Snackbar";
import "./App.css";
import Modal from "./components/Modal/Modal";

import Header from "./components/Header/Header";
import AppRoutes from "./pages/AppRoutes";

import { getItemFromLS } from "./utils/localStorage";
import { setIsAuthenticated } from "./store/reducers/userSlice";
import { useAppDispatch } from "./hooks/typedRedux";

function App() {
  const dispatch = useAppDispatch();
  const checkIsAuth = async () => {
    try {
      const isAuth = getItemFromLS("isAuthenticated");
      if (isAuth === "true") {
        dispatch(setIsAuthenticated());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <div className="App">
      <Header />
      <Snackbar />
      <AppRoutes />
      <Modal />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
