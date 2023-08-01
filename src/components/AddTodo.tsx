import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store";

export function AddTodo() {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  function onCreate(event: FormEvent) {
    event.preventDefault();

    dispatch(
      add({
        newTodo,
      })
    );
  }

  return (
    <form onSubmit={onCreate}>
      <input
        type="text"
        placeholder="Novo to-do"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      />
      <button type="submit">Adicionar to-do</button>
    </form>
  );
}
