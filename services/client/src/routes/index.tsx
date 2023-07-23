import { getMeService } from "@/services/me";
import { store } from "@/state";
import { setUser } from "@/state/slices/user";
import { RouteObject, redirect } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",

    async lazy() {
      return {
        Component: (await import("@/pages/Home")).HomePage,
        async loader() {
          try {
            const user = await getMeService();
            store.dispatch(setUser(user));
            return user;
          } catch (error) {
            return redirect("/login");
          }
        },
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          return {
            Component: (await import("@/pages/Transactions")).TransactionsPage,
          };
        },
      },
      {
        path: "categories",
        async lazy() {
          return {
            Component: (await import("@/pages/Categories")).CategoriesPage,
          };
        },
      },
      {
        path: "chart",
        async lazy() {
          return {
            Component: (await import("@/pages/Chart")).ChartPage,
          };
        },
      },
    ],
  },
  {
    path: "login",
    async lazy() {
      return {
        Component: (await import("@/pages/Login")).LoginPage,
      };
    },
  },
  {
    path: "register",
    async lazy() {
      return {
        Component: (await import("@/pages/Register")).RegisterPage,
      };
    },
  },
];
