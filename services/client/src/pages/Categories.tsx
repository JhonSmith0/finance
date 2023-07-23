import { NewCategory } from "@/components/CategoryManager";
import { CategoryList } from "@/components/CategoryManager/CategoryList";
import { EditCategory } from "@/components/CategoryManager/EditCategory";
import CategoryService from "@/services/category";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setCategories } from "@/state/slices/categories";
import { useEffect } from "react";

export function CategoriesPage() {
  const state = useAppSelector((state) => state.categories.editing);
  const dispatch = useAppDispatch();

  useEffect(() => {
    CategoryService.getAll().then((data) => {
      dispatch(setCategories(data));
    });
  }, []);

  return (
    <div>
      <h3>Categories</h3>
      {state ? <EditCategory /> : <NewCategory />}
      <CategoryList />
    </div>
  );
}
