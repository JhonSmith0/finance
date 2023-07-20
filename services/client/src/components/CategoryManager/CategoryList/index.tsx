import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { remove, setEditing } from "@/state/slices/categories";
import { useSelector } from "react-redux";

export function CategoryList() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  console.log({categories})
  return (
    <div>
      <h2>Lista de categorias</h2>
      <ul>
        {categories.map((e) => (
          <li key={e.id}>
            <span>{e.name}</span>
            <button onClick={() => dispatch(setEditing(e))}>Edit</button>
            <button onClick={() => dispatch(remove(e.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
