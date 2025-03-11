import { FormEvent, useContext, useState } from "react";
import { TodosContext } from "../store/todos";

function AddToDo() {
  const [newToDo, setNewToDo] = useState<string>("");
  const AddTodo = useContext(TodosContext);
  const { handleAddToDo } = AddTodo!;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToDo(newToDo);
    setNewToDo("");
  };
  return (
    <>  
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          onChange={(e) => setNewToDo(e.target.value)}
          value={newToDo}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddToDo;
