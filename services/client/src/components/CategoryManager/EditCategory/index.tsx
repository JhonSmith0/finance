import CategoryService from "@/services/category";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setEditing, update } from "@/state/slices/categories";
import { ICategory, ICategoryUpdate } from "@/types";
import { useForm } from "react-hook-form";

export function EditCategory() {
  const dispatch = useAppDispatch();

  const currentCategory = useAppSelector(
    (state) => state.categories.editing as ICategory
  );
  const form = useForm<ICategoryUpdate>({
    defaultValues: currentCategory,
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        const updated = await CategoryService.update(currentCategory.id, data);
        dispatch(update(updated));
      })}
    >
      <fieldset>
        <label>Nome</label>
        <input type="text" {...form.register("name")} />
      </fieldset>
      <button type="submit">Salvar</button>
      <button onClick={() => dispatch(setEditing(null))}>Cancelar</button>
    </form>
  );
}
