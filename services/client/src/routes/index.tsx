import { Outlet, RouteObject, redirect } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    async lazy() {
      return {
        Component: (await import("@/pages/Home")).HomePage,
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
