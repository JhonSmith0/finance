import { useAppDispatch } from "@/state/hooks";
import { add } from "@/state/slices/transactions";
import { ITransactionCreate } from "@/types";
import { useForm } from "react-hook-form";

export function useNewTransaction(defaultValues?: Partial<ITransactionCreate>) {
  const form = useForm<ITransactionCreate>({
    defaultValues,
  });

  const dispatch = useAppDispatch();

  return {
    ...form,
    handleSubmit: form.handleSubmit((data) => {
      dispatch(add({
        ...data,
        id: Math.random() * Math.random() + "",
      }));
    }),
  };
}
