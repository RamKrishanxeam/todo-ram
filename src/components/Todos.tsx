import { useContext } from "react";
import { TodosContext } from "../store/todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
  const [searchParams] = useSearchParams();

  const TodosList = useContext(TodosContext);
  const { todos, toggleTodoComplete, handlerDelete } = TodosList!;
  let filterData = todos;
  let todos̥Data = searchParams.get("todos");
  if (todos̥Data === "active") {
    filterData = filterData.filter((task) => !task.completed);
  }

  if (todos̥Data === "completed") {
    filterData = filterData.filter((task) => task.completed);
  }

  return (
    <div>
      <ul className="main-task">
        {filterData.map((todo, index) => {
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
