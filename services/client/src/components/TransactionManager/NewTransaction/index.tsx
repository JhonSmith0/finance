import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { ITransactionCreate, newTransactionSchema } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export function NewTransaction() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<ITransactionCreate>({
    resolver: yupResolver(newTransactionSchema),
  });
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <fieldset>
        <label>Data</label>
        <input type="date" {...register("date", { valueAsDate: true })} />
      </fieldset>
      <fieldset>
        <label>Descrição</label>
        <input type="text" {...register("description")} />
      </fieldset>
      <fieldset>
        <label>Valor</label>
        <input
          type="number"
          step={0.01}
          {...register("value", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label>Categoria</label>
        <select {...register("category")}>
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
          <option value={"expense"}>Despesa</option>
        </select>
      </fieldset>
      <button type="submit">Adicionar</button>
    </form>
  );
}
