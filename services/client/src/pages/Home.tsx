import { TransactionList } from "@/components/TransactionList";
import TransactionManager from "@/components/TransactionManager";
import { NavLink, Outlet } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Transações</NavLink>
            <NavLink to={"/categories"}>Categorias</NavLink>
            <NavLink to={"/chart"}>Grafico</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
