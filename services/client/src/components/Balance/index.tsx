import { TransactionService } from "@/services/transaction";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setBalance } from "@/state/slices/balance";
import { useEffect } from "react";

export function Balance() {
  const [transactions, balance] = useAppSelector((state) => [
    state.transactions.transactions,
    state.balance,
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    TransactionService.balance()
      .then((data) => {
        dispatch(setBalance(data));
      })
      .catch(console.error);
  }, [transactions]);

  if (balance.balance.value === null) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Balance: R$ {balance.balance.value}</h2>
      <h2>Receita: R$ {balance.income.value}</h2>
      <h2>Despesa: R$ {balance.expense.value}</h2>
    </div>
  );
}
