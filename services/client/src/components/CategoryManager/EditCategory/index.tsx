import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { add, setEditing, update } from "@/state/slices/categories";
import { ICategory, ICategoryCreateUpdateForm } from "@/types";
import { useForm } from "react-hook-form";

export function EditCategory() {
  const dispatch = useAppDispatch();

  const currentCategory = useAppSelector(
    (state) => state.categories.editing as ICategory
  );
  const form = useForm<ICategoryCreateUpdateForm>({
    defaultValues: currentCategory,
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        dispatch(update({ ...data, id: currentCategory.id }));
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
