import { configureStore } from "@reduxjs/toolkit";
import balanceSlice from "./slices/balance";
import categoriesSlice from "./slices/categories";
import transactionsSlice from "./slices/transactions";
import userSlice from "./slices/user";

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    categories: categoriesSlice.reducer,
    user: userSlice.reducer,
    balance: balanceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
