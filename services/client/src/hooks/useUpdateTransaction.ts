import { useAppDispatch } from "@/state/hooks";
import { update } from "@/state/slices/transactions";
import { ITransaction, ITransactionUpdate } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function useUpdateTransaction(defaultValues?: ITransaction) {
  const hook = useForm<ITransactionUpdate>({ defaultValues });
  const dispatch = useAppDispatch();
  useEffect(() => {
    hook.reset(defaultValues);
  }, [defaultValues]);
  return {
    ...hook,
    handleSubmit: hook.handleSubmit((data) => {
      dispatch(update(data));
    }),
  };
}
