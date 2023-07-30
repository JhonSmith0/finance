import { TransactionService } from "@/services/transaction";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setEditing, update } from "@/state/slices/transactions";
import { ITransaction, ITransactionUpdate } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function EditTransaction() {
  const categories = useAppSelector((state) => state.categories.categories);
  const currentTransaction = useAppSelector(
    (state) => state.transactions.editing as ITransaction
  );

  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  const { register, handleSubmit, setValue } = useForm<ITransactionUpdate>({
    defaultValues: currentTransaction,
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await TransactionService.update(data);
          dispatch(update(result));
        } catch (error) {
        } finally {
          setDisabled(false);
        }
      })}
    >
      <fieldset disabled={disabled}>
        <label>Data</label>
        <input type="date" {...register("date", { valueAsDate: true })} />
      </fieldset>
      <fieldset disabled={disabled}>
        <label>Descrição</label>
        <input type="text" {...register("description")} />
      </fieldset>
      <fieldset disabled={disabled}>
        <label>Valor</label>
        <input
          type="number"
          step={0.01}
          {...register("value", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset disabled={disabled}>
        <label>Categoria</label>
        <select
          {...register("categoryId", {
            setValueAs(value) {
              const categoryName = categories.find((e) => e.id === value);
              if (categoryName) setValue("category.name", categoryName.name);
              return value;
            },
          })}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset disabled={disabled}>
        <label>Tipo</label>
        <select {...register("type")}>
          <option value={"income"}>Receita</option>
          <option value={"expense"}>Despesa</option>
        </select>
      </fieldset>
      <button type="submit">Salvar</button>
      <button onClick={() => dispatch(setEditing(null))}>Cancelar</button>
    </form>
  );
}
