import { useAppDispatch } from "@/state/hooks";
import { remove, setEditing } from "@/state/slices/transactions";
import { ITransaction } from "@/types";

interface Props {
  transactions: ITransaction[];
}

export function TransactionList(props: Props) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Lista transacoes</h2>
      <div>
        <ul>
          {props.transactions.map((e) => (
            <li key={e.id}>
              <div>
                <input type="date" disabled value={e.date.slice(0, 10)} />
                <span>{e.description}|</span>
                <span>{e.type}|</span>
                <span>{e.value}|</span>
                <span>{e.category.name}|</span>
                <button onClick={() => dispatch(setEditing(e))}>Edit</button>
                <button onClick={() => dispatch(remove(e.id))}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
