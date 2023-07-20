import { ITransaction, ITransactionUpdate } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITransactionsSlice {
  transactions: ITransaction[];
  editing: ITransaction | null;
}

const slice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    editing: null,
  } as ITransactionsSlice,
  reducers: {
    setEditing(state, { payload }: PayloadAction<ITransaction | null>) {
      state.editing = payload;
    },
    update(state, payload: PayloadAction<ITransactionUpdate>) {
      const index = state.transactions.findIndex(
        (e) => e.id === payload.payload.id
      );
      if (index < 0) return;
      const obj = state.transactions[index];
      state.transactions[index] = { ...obj, ...payload.payload };
    },
    add(state, payload: PayloadAction<ITransaction>) {
      state.transactions.push(payload.payload);
    },
    remove(state, payload: PayloadAction<ITransaction["id"]>) {
      const index = state.transactions.findIndex(
        (e) => e.id === payload.payload
      );
      if (index < 0) return;
      state.transactions.splice(index, 1);
    },
  },
});

export default slice;

export const { add, setEditing, remove, update } = slice.actions;
