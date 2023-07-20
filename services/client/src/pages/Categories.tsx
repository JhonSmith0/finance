import { NewCategory } from "@/components/CategoryManager";
import { CategoryList } from "@/components/CategoryManager/CategoryList";
import { EditCategory } from "@/components/CategoryManager/EditCategory";
import { useAppSelector } from "@/state/hooks";

export function CategoriesPage() {
  const state = useAppSelector((state) => state.categories.editing);
  return (
    <div>
      <h3>Categories</h3>
      {state ? <EditCategory /> : <NewCategory />}
      <CategoryList />
    </div>
  );
}
