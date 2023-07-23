import CategoryService from "@/services/category";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { remove, setEditing } from "@/state/slices/categories";

export function CategoryList() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div>
      <h2>Lista de categorias</h2>
      <ul>
        {categories.map((e) => (
          <li key={e.id}>
            <span>{e.name}</span>
            <button onClick={() => dispatch(setEditing(e))}>Edit</button>
            <button
              onClick={async () => {
                await CategoryService.delete(e.id);
                dispatch(remove(e.id));
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
