import { EditTransaction } from "@/components/TransactionManager/EditTransaction";
import { NewTransaction } from "@/components/TransactionManager/NewTransaction";
import { TransactionList } from "@/components/TransactionManager/TransactionList";
import { useAppSelector } from "@/state/hooks";

export function TransactionsPage() {
  const { transactions, editing } = useAppSelector(
    (state) => state.transactions
  );

  return (
    <div>
      {editing ? <EditTransaction /> : <NewTransaction />}
      <TransactionList transactions={transactions} />
    </div>
  );
}
