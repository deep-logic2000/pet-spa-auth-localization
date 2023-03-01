import { configureStore } from "@reduxjs/toolkit";

import { newsReducer } from "./reducers/newsSlice";
import { snackBarSlice } from "./reducers/snackBarSlice";
import { userSlice } from "./reducers/userSlice";
import { modalSlice } from "./reducers/modalSlice";


export const store = configureStore({
    reducer: {
      news: newsReducer.reducer,
      user: userSlice.reducer,
      modal: modalSlice.reducer,
      snackBar: snackBarSlice.reducer,
    },
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch;
