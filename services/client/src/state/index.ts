import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "./slices/transactions";
import categoriesSlice from "./slices/categories";
import userSlice from "./slices/user";

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    categories: categoriesSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
