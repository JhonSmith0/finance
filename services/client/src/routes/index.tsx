import CategoryService from "@/services/category";
import { getMeService } from "@/services/me";
import { TransactionService } from "@/services/transaction";
import { store } from "@/state";
import { setCategories } from "@/state/slices/categories";
import { setTransactions } from "@/state/slices/transactions";
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
            async loader() {
              const transactions = await TransactionService.getAll();
              store.dispatch(setTransactions(transactions));
              return transactions;
            },
          };
        },
      },
      {
        path: "categories",
        async lazy() {
          return {
            Component: (await import("@/pages/Categories")).CategoriesPage,
            async loader() {
              const data = await CategoryService.getAll();
              store.dispatch(setCategories(data));
              return data;
            },
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
