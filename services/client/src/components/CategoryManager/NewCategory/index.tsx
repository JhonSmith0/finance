import CategoryService from "@/services/category";
import { useAppDispatch } from "@/state/hooks";
import { add } from "@/state/slices/categories";
import { ICategoryCreate } from "@/types";
import { useForm } from "react-hook-form";

export function NewCategory() {
  const form = useForm<ICategoryCreate>();
  const dispatch = useAppDispatch();

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        const category = await CategoryService.create(data);
        dispatch(add(category));
      })}
    >
      <fieldset>
        <label>Nome</label>
        <input type="text" {...form.register("name")} />
      </fieldset>
      <button type="submit">Adicionar</button>
    </form>
  );
}
