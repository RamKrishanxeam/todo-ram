import { useContext } from "react";
import { TodosContext } from "../store/todos";

const Todos = () => {
  const TodosList = useContext(TodosContext);
  const { todos, toggleTodoComplete, handlerDelete } = TodosList!;
  let filterData = todos;

  return (
    <div>
      <ul className="main-task">
        {filterData.map((todo, index) => {
          console.log(todo.id, "todo.id");

          return (
            <li key={index}>
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleTodoComplete(todo.id)}
                readOnly
              />
              <label htmlFor={`todo-${todo.id}`}> {todo.task} </label>

              {todo.completed && (
                <button type="button" onClick={() => handlerDelete(todo.id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
