import { useUpdateTransaction } from "@/hooks/useUpdateTransaction";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setEditing } from "@/state/slices/transactions";
import { ITransaction } from "@/types";

export function EditTransaction() {
  const categories = useAppSelector((state) => state.categories.categories);
  const currentTransaction = useAppSelector(
    (state) => state.transactions.editing as ITransaction
  );
  const { register, handleSubmit, setValue } =
    useUpdateTransaction(currentTransaction);
  const dispatch = useAppDispatch();

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Data</label>
        <input type="date" {...register("date")} />
      </fieldset>
      <fieldset>
        <label>Descrição</label>
        <input type="text" {...register("description")} />
      </fieldset>
      <fieldset>
        <label>Valor</label>
        <input type="number" step={0.01} {...register("value")} />
      </fieldset>
      <fieldset>
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
      <fieldset>
        <label>Tipo</label>
        <select {...register("type")}>
          <option value={"income"}>Receita</option>
          <option value={"expenses"}>Despesa</option>
        </select>
      </fieldset>
      <button type="submit">Salvar</button>
      <button onClick={() => dispatch(setEditing(null))}>Cancelar</button>
    </form>
  );
}
